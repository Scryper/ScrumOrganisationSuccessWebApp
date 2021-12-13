export interface SosUser {
    id?:number,
    firstname:string,
    lastname:string,
    password:string,
    email:string,
    profile_picture?:string,
    birthdate:Date,
    description?:string,
    portfolio?:string,
    role:number,
    token?:string
}
