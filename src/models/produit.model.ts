import { User } from "./user.model";

export class Produit{
    [x: string]: any;

    constructor
    (
        public id_produit: number,
        public name: String,
        public prix: number,
        public description: String,
       public  date :Date,
       public imagePath: string,
       public user: User
    ){} 

}