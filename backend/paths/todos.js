import getTodos from "../methods/getTodos.js"

export default function todos(req, res) {
    
    if (req.method === 'GET') {
        getTodos(req, res);
    }
}