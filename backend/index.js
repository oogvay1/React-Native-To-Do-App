import { createServer } from "http";
import { parse } from "url";
import posts from "./paths/posts.js";
import todos from "./paths/todos.js"

const server = createServer(async (req, res) => {

    const pathName = parse(req.url).pathname;

    if (pathName === '/posts') {

        posts(req, res);
    } else if (pathName === '/todos') {

        todos(req, res);
    } else if (pathName === '/' || pathName === '') {

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "OK!" }));
    } else {

        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "404 not found" }));
    }

});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});