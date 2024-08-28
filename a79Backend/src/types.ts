export type ConversationPublic = {
    name: string;
    id: number;
    messages?: Array<MessagePublic>;
}
export type MessageContextPayload = {
     tabular_data?: string;
}
export type MessageCreate = {
    conversation_id?: number;
    content: string;
    message_context?: MessageContextPayload;
}
export type MessagePublic = {
    created_at?: string;
    updated_at?: string;
    content: string;
    role?: string;
    conversation_id?: number;
    id: number;
    message_context: MessageContextPayload;
}



// export const  readConversation = (conversationId: string) => ConversationPublic;