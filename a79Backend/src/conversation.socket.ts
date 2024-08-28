import { Socket } from "socket.io";
import MySocketInterface from "../mySocketInterface";
import { MessageCreate } from "./types";
import { createConversation, createMessage, readConversation } from "./conversations";

class ConversationSocket implements MySocketInterface {

   handleConnection(socket: Socket) {

        socket.emit('ping', 'Hi! I am a live socket connection');

    }

   middlewareImplementation(socket: Socket, next) {
       //Implement your middleware for orders here
       const createOrSendMessage = (message: MessageCreate, callback) => {
        const messageReturned = createMessage(message);
    
        if(messageReturned.length ===0 ) return callback(new Error('no conversation found'));
        if(messageReturned) {
            // socket.join(messageReturned?.conversation_id.toString() ?? '');
    
            socket.emit('message', messageReturned);
            // socket.broadcast.to(messageReturned?.conversation_id.toString()).emit('message', { user: 'admin', text: `new conversation` });
        
            // io.to(messageReturned?.conversation_id.toString()).emit('roomData', { message: 'this is inteligence'  });
        }
    
        callback();
      };
      const readMessage= ({ conversationId }, callback) => {
        const messageReturned = readConversation(conversationId);
    
        socket.emit('message', messageReturned);
    
        callback();
      };

       socket.on('join', createConversation);
       socket.on('sendMessage', createOrSendMessage);
       socket.on('readConversations', readMessage);
       return next();
   }
}

export default ConversationSocket;