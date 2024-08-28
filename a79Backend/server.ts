import Websocket from './websocket';
require('dotenv').config()
import 'reflect-metadata';
import { createServer } from 'http';

import {
   createExpressServer,
   RoutingControllersOptions
} from 'routing-controllers'
import ConversationSocket from './src/conversation.socket';

const port = process.env.APP_PORT || 5001;


const routingControllerOptions: RoutingControllersOptions = {
   routePrefix: 'v1',
   controllers: [`${__dirname}/modules/http/*.controller.*`],
   validation: true,
   classTransformer: true,
   cors: true,
   defaultErrorHandler: true
}

const app = createExpressServer(routingControllerOptions);

const httpServer = createServer(app);
const io = Websocket.getInstance(httpServer);

httpServer.listen(port, () => {
    console.log(`This is working in port ${port}`);
 });

 io.initializeHandlers([
    { path: '/conversation', handler: new ConversationSocket() }
 ]);

