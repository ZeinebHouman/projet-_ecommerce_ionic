import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { User } from "../models/user.model";
import { sqliteService } from "./sqlite.service";

@Injectable()
export class UserService{
    isAuth: boolean=false;
    public user: User
  //  public users: User[]=[]
    user$= new Subject<User>(); //mise a jour
    public users: User[]=  [{
            id: '6',
            lastName: 'Zeineb',
            firstName: 'Houman',
            email: 'zeineb@gmail.com',
            password: "123",
            photo: "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png",
         
        },
        {
            id: '7',
            lastName: 'Aycha',
            firstName: 'Houman',
            email: 'aycha@gmail.com',
            password: "123",
            photo: "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png",
        
        }
    ];
    constructor(public sqliteBD: sqliteService){}
    emitUser()
    {
        this.user$.next(this.user);
    }

    addUser(user: User)
    {
        this.users.push(user);
        this.emitUser();
    }
    Authentification(email : String,password: String)
    {
        return new Promise(
            (resolve,reject)=>{
                this.sqliteBD.db.executeSql('SELECT * FROM USER WHERE EMAIL=\''+email+'\' AND PASSWORD=\''+password+'\'',[])
                .then((data)=>{
                    if(data.rows.length==0) {
                        reject(false);}
                    else{
                       
                            this.user=new User(data.rows.item(0).ID,data.rows.item(0).FIRSTNAME,data.rows.item(0).LASTNAME,data.rows.item(0).EMAIL,data.rows.item(0).PASSWORD,'https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png');
                
                            this.isAuth=true;
                            this.emitUser();
                            resolve(this.user);
                        }

            });

      })
    }
 
    
    deconnexion()
    {
        return new Promise((resolve, reject) => {
            this.isAuth=false;
            this.user=null;
            this.emitUser();
            resolve(true);
        })
    }
}
