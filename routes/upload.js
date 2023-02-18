const express = require('express')
const router = express.Router()
const multer = require('multer')
const { readdirSync } = require('fs')

const uploadFolder = 'public/upload/'

// 通过 filename 属性定制
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder) // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, file.originalname)
  },
})

// 得到multer对象  传入storage对象
const upload = multer({ storage })

// 挂载中间件
router.post('/', upload.single('file'), (req, res) => {
  // 需要返回图片的访问地址    域名+文件名
  const filename = req.file.filename
  res.json({ filename })
})

router.get('/files', (req, res) => {
  const uploadList = readdirSync('./public/upload') || []
  res.send({
    fileList: uploadList,
  })
})

module.exports = router
