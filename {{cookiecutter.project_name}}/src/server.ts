import KoaApp from './KoaApp';
import { Mode } from './Constants';

require('dotenv').config();

const koaApp = new KoaApp(process.env.MODE as Mode);

const server = koaApp.start();

export default server;
