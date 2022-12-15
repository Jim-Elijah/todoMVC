const fs = require("fs");

module.exports = (app) => {
    // 同步读取当前目录下的文件
    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js') return;
        const router = require(`./${file}`);
        app.use(router.routes()).use(router.allowedMethods());
    });
}