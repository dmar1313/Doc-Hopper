module.exports = function validateFileUpload (req, res, next) {
  if (!req.file) {
    return res.status(400).send('No file uploaded')
  }

  const fileType = req.file.mimetype
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  if (!allowedTypes.includes(fileType)) {
    return res.status(400).send('Invalid file type')
  }

  const fileSize = req.file.size
  const maxFileSize = 5 * 1024 * 1024 // 5MB
  if (fileSize > maxFileSize) {
    return res.status(400).send('File size too large')
  }

  next()
}
