export type Events = 
    | { type: "EVENT"; event: any } 
    | { type: "EVENT.PREVIEW"; eventType: string } 
    | { type: "STATE.UPDATE"; state: any } 
    | { type: "MACHINE.UPDATE" } 
    | { type: "PREVIEW.CLEAR" }