import fs from "fs/promises"
import path from "path"
import { parse } from "url"

export default async function postUsers(req, res) {

    const postsPath = path.join("data", "posts.json");
    const query = parse(req.url, true);

    const users = JSON.parse(await fs.readFile(postsPath, "utf-8"));
    const newUser = {
        id: users.length + 1,
        name: "",
        lastname: "",
        age: 0,
        isDeveloper: false,
        isMaried: false,
        adress: "",
        gender: "",
        nikname: ""
    }

    const keys = Object.entries(query.query);

    if (keys[0] !== undefined) {

        for (const [key, value] of keys) {

            if (typeof newUser[key] === "boolean") {
                newUser[key] = Boolean(value);
            } else if (typeof newUser[key] === "number") {
                newUser[key] = Number(value);
            } else {
                newUser[key] = value;
            }
        }
    } else {

        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "New user data is not defined" }));
    }

    users.push(newUser);

    await fs.writeFile(postsPath, JSON.stringify(users, null, "\t"));

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "User added successfuly" }));
}
