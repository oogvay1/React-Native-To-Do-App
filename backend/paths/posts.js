import getPosts from "../methods/getPosts.js"
import patchUsers from "../methods/patchUsers.js"
import postUsers from "../methods/postUsers.js"
import deleteUsers from "../methods/deleteUsers.js"

export default function posts(req, res) {
    if (req.method === "GET") return getPosts(req, res);
    if (req.method === "POST") return postUsers(req, res);
    if (req.method === "PATCH") return patchUsers(req, res);
    if (req.method === "DELETE") return deleteUsers(req, res);

    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "wrong method" }));
}