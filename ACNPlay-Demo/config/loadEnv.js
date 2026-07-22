const dotenv = require("dotenv");

function loadEnv() {
    dotenv.config();

    dotenv.config({ path: ".env.local" });
}

module.exports = loadEnv;