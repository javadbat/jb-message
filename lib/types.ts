export type MessageType = "success" | "error" | "information" | "warning";
export type NewMessageParams = {
    type: MessageType,
    message:string,
}
export type MessageDiv = HTMLDivElement & {
    close: ()=>void,
    isClosing:boolean,
    closed:boolean
};