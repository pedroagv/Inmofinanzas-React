const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    const apiUrl = process.env.REACT_APP_API_URL;

    if (!apiUrl) {
        throw new Error('La variable de entorno REACT_APP_API_URL no está definida.');
    }

    // Configuración del proxy para /categorias
    app.use('/categorias', createProxyMiddleware({
        target: `${apiUrl}/api/categorias`,
        pathRewrite: {
            '^/categorias': '',  // Elimina el prefijo '/categorias' de la ruta
        },
        changeOrigin: false
    }));
};
