# SMART-2MCE Pure Frontend Ecosystem

This is a high-performance, pure frontend implementation of the SMART-2MCE maintenance ecosystem. It has been converted from a backend-dependent app to a standalone, smooth ecosystem as requested.

## Features
- **Pure Frontend**: All data is managed locally via `MockData.js`. No backend server required.
- **Modern Tech Stack**: Built with Vite, React, React Router, and Framer Motion.
- **Premium Aesthetics**: Professional design matching the provided screenshots, including:
    - Glassmorphism effects.
    - Multi-step registration flow.
    - Role-based dashboards (Institution, Technician).
    - Device Registry with status tracking.
    - Real-time-looking negotiation thread.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Navigate the Ecosystem**:
   - `/`: Landing Page
   - `/register`: Organization Registration (Step 3/5)
   - `/dashboard`: Institution Overview
   - `/tech-dashboard`: Technician Overview
   - `/marketplace`: Job Marketplace
   - `/devices`: Device Registry
   - `/requests`: Create Service Request
   - `/negotiation`: Task Negotiation Chat

## Design Tokens
- **Institutions**: Blue (#0061c1)
- **Technicians**: Green (#2e7d32)
- **Suppliers**: Orange (#f5a623)
- **Theme**: Dark Navy (#0f172a) / Professional White (#f8fafc)
