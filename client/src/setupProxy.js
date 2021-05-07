const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            //'http://192.168.0.92:5000',
            changeOrigin: true,
        })
    );
};