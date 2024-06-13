import express from "express";
import {createServer} from 'http';
import initSocket from "./init/socket.js";
import { loadGameAssets } from "./init/assets.js";

const app = express();
const server = createServer(app);

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extends:false}))
app.use(express.static('public'));
initSocket(server);

app.get('/', (req,res) => {
    res.send("Hello World!");
})

server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    // 이 곳에 파일을 읽음
    const assets = await loadGameAssets();
    try{
        //console.log(assets);
    }catch(e){
        console.error('Failed to load game assets :' , e)
    }
});