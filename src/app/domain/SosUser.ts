export interface SosUser {
    id:number,
    pseudo:string,
    password:string,
    email:string,
    profile_picture?:string,
    birthdate?:Date,
    description?:string,
    portfolio?:string,
    role?:number
}
