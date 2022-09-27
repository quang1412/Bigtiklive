const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const apiRequest = createProxyMiddleware('/api', {
    target: 'http://localhost:2096',
    changeOrigin: true, 
  });

  const socketProxy = createProxyMiddleware('/socket', {
    target: 'http://localhost:2096',
    changeOrigin: true,
    ws: true,
    // logLevel: 'debug',
  });

  app.use(apiRequest);
  app.use(socketProxy);
};
