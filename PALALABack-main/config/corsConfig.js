const cors = require("cors");
require('dotenv').config();

const allowedOrigins = ['http://localhost:3006',"https://palala.pages.devpalala.online","https://palala.pages.dev","https://palala.online"]

const corsOptions = {
    origin: function(origin, callback){
        if (!origin) {
            callback(null, true);
            return;
        }

        // Verifica si el origen coincide con alguno de los dominios permitidos
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        // Verifica si el origen es un subdominio de alguno de los dominios permitidos
        for (const allowedOrigin of allowedOrigins) {
            const regex = new RegExp(`^${allowedOrigin.replace('.', '\\.')}`);
            if (regex.test(origin)) {
                callback(null, true);
                return;
            }
        }

        callback(new Error('Not allowed by CORS'));
    },
};

module.exports = cors(corsOptions);