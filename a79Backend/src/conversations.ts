import { ConversationPublic, MessageCreate, MessagePublic } from "./types";


const conversations: Record<number, ConversationPublic> ={}


export const createConversation = ({ conversationId }:{conversationId: number } ) => {
    const conv:ConversationPublic = {id: conversationId, name:'', messages: []}
    conversations[conversationId] = conv;
}


export const createMessage = (message: MessageCreate):MessagePublic[] => {
    console.log(message);
    const context = message.message_context ?? { tabular_data: ''};
    const result: MessagePublic = {
            content: message.content,
            message_context: context,
            conversation_id: message.conversation_id,
            created_at: new Date().toISOString(),
            role: 'user',
            id: message?.conversation_id ?? 0,
    }
    let messages = [];

    if(message.conversation_id !== undefined) {
        const conv = conversations[message.conversation_id ?? -Infinity] || { id: message.conversation_id, name: '', messages: [] };
        messages = conv.messages || [];
        messages.push(result)
        messages.push({...result, role: 'system', content: 'this is an AI generagted message for you', owner: 'system'})
        conv.messages = messages;
        console.log('return from if', conv.messages)
        return conv.messages;
    }
    console.log('return from end', messages)
    return messages;
}


export const  readConversation = (conversationId: number) => {
    const conv = conversations[conversationId]
    if(conv) {
        return conv
    }
};
