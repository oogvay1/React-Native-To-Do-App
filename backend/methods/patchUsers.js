import fs from "fs/promises"
import path from "path"
import { parse } from "url"

export default async function patchUsers(req, res) {

    const postsPath = path.join("data", "posts.json");
    const { query } = parse(req.url, true);
    const keys = Object.entries(query);

    const users = JSON.parse(await fs.readFile(postsPath, "utf-8"));

    if (query.id) {
        const searchUser = users.filter(u => Number(u.id) === Number(query.id));
        const search = searchUser[0];

        if (search) {
            if (Number(search.id) === Number(query.id)) {
                for (const [key, value] of keys) {

                    console.log(value);
                    if (search.hasOwnProperty(key)) {

                        if (typeof search[key] === "boolean") {
                            search[key] = value == 'true' ? true : false;
                        } else if (typeof search[key] === "number") {
                            search[key] = Number(value);
                        } else {
                            search[key] = value;
                        }
                    }
                }
            }
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "User id is not defined" }));
        }
    }

    await fs.writeFile(postsPath, JSON.stringify(users, null, "\t"));

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "User updated successfuly" }));
}