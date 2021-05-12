import { User } from "./user.model";

export class Produit{
    constructor
    (
        public id_produit: String,
        public name: String,
        public prix: number,
        public description: String,
       public  date :Date,
       public imagePath: string,
       public user: User
    ){}

}