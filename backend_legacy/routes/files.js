const express = require('express');
const { auth } = require('../middleware/auth');
const fileController = require('../controllers/fileController');

const router = express.Router();

// Upload file
router.post('/upload', auth, fileController.upload.single('file'), fileController.uploadFile);

// Get file
router.get('/:filename', fileController.getFile);

// Download file
router.get('/:filename/download', auth, fileController.downloadFile);

// Delete file
router.delete('/:filename', auth, fileController.deleteFile);

module.exports = router;
