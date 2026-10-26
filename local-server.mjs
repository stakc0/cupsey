import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT=path.dirname(fileURLToPath(import.meta.url));
const MIME={'.html':'text/html; charset=utf-8','.json':'application/json; charset=utf-8','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp'};
const port=Number(process.env.PORT)||3000;
const server=http.createServer(async(req,res)=>{
  const pathname=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`).pathname;
  if(pathname!=='/'&&pathname!=='/index.html'&&!pathname.startsWith('/assets/')&&pathname!=='/posts.json'){res.writeHead(404,{'content-type':'text/plain; charset=utf-8'});return res.end('Not found');}
  try{const file=pathname==='/'||pathname==='/index.html'?'index.html':pathname.slice(1);const html=await readFile(path.join(ROOT,file));res.writeHead(200,{'content-type':MIME[path.extname(file)]||'application/octet-stream','cache-control':'no-cache'});res.end(html)}catch(error){res.writeHead(500,{'content-type':'text/plain; charset=utf-8'});res.end(error.message)}
});
server.listen(port,'0.0.0.0',()=>console.log(`Cupsey Files running on http://localhost:${port}`));
