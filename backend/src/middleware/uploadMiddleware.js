const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Storage configuration with security gates
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'shemsu/products',
    allowed_formats: ['jpg', 'png', 'webp'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },
});

module.exports = {
  uploadMultiple: upload.array('images', 5), // Max 5 images per product
  uploadSingle: upload.single('image'),
};
