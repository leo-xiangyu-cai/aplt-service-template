import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import logger from 'koa-logger';
import Mongo from 'mongoose';
import { Server } from 'http';
import healthCheckRoutes from './controller/HealthCheckController';
import {
  DB_CONNECT_UNITTEST, Mode, PORT_APP, PORT_UNITTEST,
} from './Constants';
import { getConfig } from './Configs';

export default class KoaApp {
  mode: Mode;

  port: number;

  app: Koa;

  dbConnect : string = '';

  private server? : Server;

  constructor(mode: Mode) {
    this.app = new Koa();
    this.mode = mode;
    switch (this.mode) {
      case Mode.App:
        this.dbConnect = getConfig().dbConn;
        this.port = PORT_APP;
        break;
      case Mode.UnitTest:
        this.dbConnect = DB_CONNECT_UNITTEST;
        this.port = PORT_UNITTEST;
        break;
      default:
        throw new Error(`Invalid mode ${this.mode}, the mode can be only one of {App, UnitTest}`);
    }
    Mongo.connect(this.dbConnect, { useNewUrlParser: true, useUnifiedTopology: true }, () => { });
    this.app.use(bodyParser());
    this.app.use(
      cors({
        origin: '*',
      }),
    );
    this.app.use(logger());

    this.app.use(healthCheckRoutes.routes());
  }

  start() {
    this.server = this.app.listen(this.port, async () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port: ${this.port}`);
    })
      .on('error', (err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
    return this.server;
  }

  stop = () => {
    Mongo.connection.close().then();
    this.server?.close();
  };
}
