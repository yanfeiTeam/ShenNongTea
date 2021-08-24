const express = require('express')

const app = express()

// 网络请求头 
app.all('*', function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*'); // 跨域问题
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
})

app.use(express.json())
app.use(express.static('static'));

// 路由配置
require('./routes/router')(app)

// 启动项配置
app.listen(3000,() => {
    console.log('http://localhost:3000');
})