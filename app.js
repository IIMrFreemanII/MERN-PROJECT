const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const routes = require("./routes/auth.routes");

const app = express();

app.use(express.json({extended: true}));

app.use("/api/auth", routes);

const PORT = config.get("port") || 5000;

async function start() {
    try {
        const uri = config.get("mongoUri");
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}`);
        });
    } catch (e) {
        console.log("Server error", e.message);
        process.exit(1);
    }
}

start();