import { Subject } from "rxjs/Subject";
import { User } from "../models/user.model";


export class ProduiService{

    private users: User[]=[];
    user$= new Subject<User[]>(); //mise a jour

    emitUser()
    {
        this.user$.next(this.users);
    }

    addProduits(user: User)
    {
        this.users.push(user);
        this.emitUser();
    }
}