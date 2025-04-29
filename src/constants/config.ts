const config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    SERVER: {
        PORT: Number(process.env.SERVER_PORT || "3000")
    }
}

export default config;