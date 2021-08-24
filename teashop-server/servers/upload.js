const fs = require('fs')
const path = require('path')
const moment = require('moment');

let addData = (req, res) => {
    fs.readFile(req.file.path, (err, data) => {
        // 如果读取失败
        if (err) {
            res.json({
				code: 500,
				data: null,
				msg: '上传失败'
			})
        }
        // 如果读取成功
        // 声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
        let time = 
            moment().utc().format('YYYYMMDDhhmmss') +
            parseInt(Math.random() * 999) + 
            parseInt(Math.random() * 2222);
        // 拓展名
        let extname = req.file.mimetype.split('/')[1];
        // 拼接成图片名
        let keepname = time + '.' + extname;
        // 三个参数
        // 1.图片的绝对路径
        // 2.写入的内容
        // 3.回调函数
        let url = path.join(__dirname, '../static/images/' + keepname);
        fs.writeFile(url, data, err => {
            if (err) {
                res.json({
                    code: 500,
                    data: null,
                    msg: '写入失败'
                })
            }
            res.json({
                code: 200,
                data: {
                    url: keepname
                },
                msg: '上传成功'
            })
        })
    })
}

module.exports = { addData }