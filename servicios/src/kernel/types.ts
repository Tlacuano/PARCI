export type ResponseApi<T>= {
    status:number;
    data?:T;
    message?:string;
    error:boolean;
    count?:number;
}