import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT=path.dirname(fileURLToPath(import.meta.url));
const port=Number(process.env.PORT)||3000;
const server=http.createServer(async(req,res)=>{
  const pathname=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`).pathname;
  if(pathname!=='/'&&pathname!=='/index.html'){res.writeHead(404,{'content-type':'text/plain; charset=utf-8'});return res.end('Not found');}
  try{const html=await readFile(path.join(ROOT,'index.html'));res.writeHead(200,{'content-type':'text/html; charset=utf-8','cache-control':'no-cache'});res.end(html)}catch(error){res.writeHead(500,{'content-type':'text/plain; charset=utf-8'});res.end(error.message)}
});
server.listen(port,'0.0.0.0',()=>console.log(`Cupsey Files running on http://localhost:${port}`));
