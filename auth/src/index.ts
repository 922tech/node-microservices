import 'dotenv/config';
import mongoose from "mongoose";
import app from "./app";
import { settings } from './settings';

async function start() {
    if (!settings.JWT.secretKey) {
        throw new Error("JWT_SECRET must be defined");
    }

    if (!settings.database.MONGO_URI) {
        throw new Error("MONGO_URI must be defined");
    }

    try {
        await mongoose.connect(settings.database.MONGO_URI);
        console.log("Connected to MongoDB.......!");
    } catch (err) {
        console.error(err);
    }
    app.listen(3000, () => {
        console.log("Listening on port 3000........!");
    });
}

start();
