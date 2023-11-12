export interface UseCase<Tinput,Toutput>{
    execute(payload:Tinput):Promise<Toutput>;
}