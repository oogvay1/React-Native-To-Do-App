import fs from "fs/promises"
import path from "path"
import { parse } from "url"

export default async function deleteUsers(req, res) {

    const postsPath = path.join("data", "posts.json");
    const { query } = parse(req.url, true);
    const users = JSON.parse(await fs.readFile(postsPath, "utf-8"));

    let delate = null;

    if (query.id) {
        const userD = users.filter(u => Number(u.id) === Number(query.id));
        const user = userD[0];

        if (user) {

            delate = users.filter(u => Number(u.id) !== Number(query.id));
        } else if (!user) {
            delate = users;

            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User with this id is not defined" }));
            return
        }
    }

    await fs.writeFile(postsPath, JSON.stringify(delate, null, "\t"));

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User succesfully deleted" }));

}