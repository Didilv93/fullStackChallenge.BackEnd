import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as contextService from 'request-context';
import { routers } from './shared/routers';
import * as compression from 'compression';
import * as cors from 'cors';
import * as morgan from 'morgan';

class App {
  public express: any;
  constructor() {
    this.express = express();
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(contextService.middleware('request'));
    this.express.use(compression());
    this.express.use(morgan('combined'));
    this.mountRoutersV1();
  }
  mountRoutersV1(): void {
    const router = express.Router();
    router.get('/', (req: any, res: any) => {
      res.json({
        message: 'Api Desafio CI&T V1'
      });
    });
    this.express.use(function(req: any, res: any, next: any) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', '*');
      next();
    });
    this.express.use('/api/v1/', router, routers);
  }
}

export default new App().express;
