import fs from "fs/promises";
import path from "path";

export default async function getPosts(req, res) {

    const pathName = path.join("data", "posts.json");

    const jsonText = await fs.readFile(pathName, "utf-8");

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(jsonText);
}