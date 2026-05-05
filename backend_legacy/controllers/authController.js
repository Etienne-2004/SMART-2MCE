const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Institution = require('../models/Institution');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Email transporter configuration
const createEmailTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTPs temporarily (in production, use Redis)
const otpStore = new Map();

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      email,
      password,
      first_name,
      last_name,
      phone,
      role,
      province_id,
      district_id,
      sector_id,
      cell_id,
      village_id,
      institution_name,
      institution_type,
      registration_number,
      address,
      description,
      skills,
      experience_years,
      certification,
      company_name,
      supplier_type
    } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      phone,
      role
    });

    let profileData = null;

    if (role === 'institution') {
      profileData = await Institution.create({
        user_id: user.id,
        institution_name,
        institution_type,
        registration_number,
        province_id,
        district_id,
        sector_id,
        cell_id,
        village_id,
        address,
        description
      });
    }

    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        profile: profileData
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    let profileData = null;

    if (user.role === 'institution') {
      profileData = await Institution.findByUserId(user.id);
    }

    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        profile: profileData
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

const getProfile = async (req, res) => {
  try {
    let profileData = null;

    if (req.user.role === 'institution') {
      profileData = await Institution.findByUserId(req.user.id);
    }

    res.json({
      user: {
        id: req.user.id,
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        phone: req.user.phone,
        role: req.user.role,
        status: req.user.status,
        profile: profileData
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, phone } = req.body;

    const updatedUser = await User.updateProfile(req.user.id, {
      first_name,
      last_name,
      phone
    });

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        phone: updatedUser.phone,
        role: updatedUser.role
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;

    // Get user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await User.updatePassword(userId, hashedNewPassword);

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error changing password' });
  }
};

// Send OTP for registration
const sendRegistrationOTP = async (req, res) => {
  try {
    const { email, first_name, last_name, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP temporarily
    otpStore.set(email, {
      otp,
      expiresAt,
      userData: { email, first_name, last_name, phone, role }
    });

    // Send email
    const transporter = createEmailTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'SMART-2MCE - Verify Your Email',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 60px; height: 60px; background: #1976d2; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" fill="#1976d2"/>
                <rect x="40" y="20" width="20" height="60" fill="#ffffff" rx="2"/>
                <rect x="20" y="40" width="60" height="20" fill="#ffffff" rx="2"/>
                <circle cx="50" cy="50" r="8" fill="#ffffff"/>
              </svg>
            </div>
            <h1 style="color: #1976d2; margin: 0;">SMART-2MCE</h1>
            <p style="color: #666; margin: 5px 0;">Rwanda Maintenance Ecosystem</p>
          </div>
          
          <div style="background: #f5f5f5; padding: 30px; border-radius: 10px; text-align: center;">
            <h2 style="color: #333; margin-top: 0;">Email Verification</h2>
            <p style="color: #666; font-size: 16px;">Thank you for registering with SMART-2MCE. Use the OTP below to verify your email address:</p>
            
            <div style="background: #1976d2; color: white; font-size: 32px; font-weight: bold; padding: 20px; border-radius: 8px; letter-spacing: 5px; margin: 20px 0;">
              ${otp}
            </div>
            
            <p style="color: #666; font-size: 14px;">This OTP will expire in 10 minutes.</p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              <strong>Security Notice:</strong> Never share this OTP with anyone. Our team will never ask for your OTP.
            </p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; color: #999; font-size: 12px;">
            <p>© 2026 SMART-2MCE. All rights reserved.</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ 
      message: 'OTP sent successfully to your email',
      email: email
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// Verify OTP and complete registration
const verifyOTPAndRegister = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check OTP
    const storedData = otpStore.get(email);
    if (!storedData) {
      return res.status(400).json({ message: 'OTP not found or expired' });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (new Date() > storedData.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: 'OTP expired' });
    }

    // Create user
    const { first_name, last_name, phone, role } = storedData.userData;
    const hashedPassword = await bcrypt.hash('Password@2026', 12); // Default password

    const user = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      phone,
      role,
      is_verified: true
    });

    // Clear OTP
    otpStore.delete(email);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        is_verified: user.is_verified
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Resend OTP
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const storedData = otpStore.get(email);
    if (!storedData) {
      return res.status(400).json({ message: 'No registration in progress' });
    }

    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Update stored OTP
    otpStore.set(email, {
      ...storedData,
      otp,
      expiresAt
    });

    // Send email
    const transporter = createEmailTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'SMART-2MCE - New OTP Code',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 60px; height: 60px; background: #1976d2; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" fill="#1976d2"/>
                <rect x="40" y="20" width="20" height="60" fill="#ffffff" rx="2"/>
                <rect x="20" y="40" width="60" height="20" fill="#ffffff" rx="2"/>
                <circle cx="50" cy="50" r="8" fill="#ffffff"/>
              </svg>
            </div>
            <h1 style="color: #1976d2; margin: 0;">SMART-2MCE</h1>
            <p style="color: #666; margin: 5px 0;">Rwanda Maintenance Ecosystem</p>
          </div>
          
          <div style="background: #f5f5f5; padding: 30px; border-radius: 10px; text-align: center;">
            <h2 style="color: #333; margin-top: 0;">New OTP Code</h2>
            <p style="color: #666; font-size: 16px;">Here is your new OTP code for email verification:</p>
            
            <div style="background: #1976d2; color: white; font-size: 32px; font-weight: bold; padding: 20px; border-radius: 8px; letter-spacing: 5px; margin: 20px 0;">
              ${otp}
            </div>
            
            <p style="color: #666; font-size: 14px;">This OTP will expire in 10 minutes.</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; color: #999; font-size: 12px;">
            <p>© 2026 SMART-2MCE. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'New OTP sent successfully' });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ message: 'Failed to resend OTP' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  sendRegistrationOTP,
  verifyOTPAndRegister,
  resendOTP
};
