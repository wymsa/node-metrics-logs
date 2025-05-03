const config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    LOGS_FOLDER: process.env.LOGS_FOLDER || "logs",
    SERVER: {
        PORT: Number(process.env.SERVER_PORT || "3001")
    }
}

export default config;