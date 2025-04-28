import { createServer } from 'http';

const PORT = 8000;

let arr = [
    {'id': 0, 'name': 'Arsham', 'sn': 123},
    {'id': 1, 'name': 'jafar', 'sn': 124},
    {'id': 2, 'name': 'mamd', 'sn': 126},
    {'id': 3, 'name': 'javad', 'sn': 129},
]

const server = createServer((req, res) =>{
    try{
        if (req.url === '/')
        {
            res.writeHead(200, {'Contetn-Type': 'txt/html'});
            res.end('<h1>home page</h1>')
        }else
        {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>Not Found</h1>')
        }
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('server error')
    }
});

server.listen(PORT, () =>{
    console.log(`listening of port ${PORT}`);
});