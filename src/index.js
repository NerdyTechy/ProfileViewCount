const express = require("express");
const app = express();
require("dotenv").config();

const db = require("./utils/database");
db.init();

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

app.get("/:profile", async (req, res) => {
    const { profile } = req.params;
    const { style, color } = req.query;
    var views = (await db.query(`SELECT views FROM profileviews WHERE \`identifier\`="${db.getPool().escape(profile)}"`))[0];
    var url;
    if (!views) {
        views = 1;
        url = `https://img.shields.io/badge/Profile%20Views-${views}-${color ?? "blue"}?style=${style ?? "for-the-badge"}`;
        db.query(`INSERT INTO \`profileviews\` (\`identifier\`, \`views\`) VALUES (${db.getPool().escape(profile)}, '1');`);
    } else {
        views = views.views;
        url = `https://img.shields.io/badge/Profile%20Views-${views + 1}-${color ?? "blue"}?style=${style ?? "for-the-badge"}`;
        db.query(`UPDATE \`profileviews\` SET \`views\` = '${views + 1}' WHERE \`profileviews\`.\`identifier\` = ${db.getPool().escape(profile)};`);
    }
    const img = await fetch(url).then((data) => data.text());
    res.set("Content-Type", "image/svg+xml");
    res.send(img);
});

app.all("*", async (req, res) => {
    const url = "https://img.shields.io/badge/Error-Invalid%20Endpoint-red?style=for-the-badge";
    const img = await fetch(url).then((data) => data.text());
    res.set("Content-Type", "image/svg+xml");
    res.send(img);
});

app.listen(process.env.port, () => {
    console.log(`Running on port ${process.env.port}.`);
});

module.exports = app;
