import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import axios from "axios";
import helmet from "helmet";
import database from "./utils/database";

const app = express();
app.use(helmet());

app.get("/:profile", async (req: Request, res: Response) => {
    const { profile } = req.params;
    const { style, color } = req.query;

    if (!profile) {
        res.set("Content-Type", "text/plain");
        return res.status(400).end("Invalid identifier");
    }

    const views = (await database.query("SELECT views FROM profileviews WHERE identifier=?", [profile]))[0];

    database.query("INSERT INTO profileviews (identifier, views) VALUES (?, 1) ON DUPLICATE KEY UPDATE views = views + 1", [profile]);

    axios
        .get(`https://img.shields.io/badge/Profile%20Views-${!views || views.length === 0 ? 1 : views.views + 1}-${color ?? "blue"}?style=${style ?? "for-the-badge"}`)
        .then((data) => {
            res.set("Content-Type", "image/svg+xml");
            res.send(data.data);
        })
        .catch((err) => {
            console.error(err.message);
            res.set("Content-Type", "text/plain");
            res.status(500).end("Server Error");
        });
});

app.all("*", async (_, res) => {
    axios
        .get("https://img.shields.io/badge/Error-Invalid%20Endpoint-red?style=for-the-badge")
        .then((data) => {
            res.set("Content-Type", "image/svg+xml");
            res.send(data.data);
        })
        .catch((err) => {
            console.error(err.message);
            res.set("Content-Type", "text/plain");
            res.status(500).end("Server Error");
        });
});

app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}.`));
