import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { User } from "../models/user.model";
import { sqliteService } from "./sqlite.service";

@Injectable()
export class UserService{
    isAuth: boolean=false;
    public user: User
    public users: User[]=[]
    image:String;
    user$= new Subject<User>(); //mise a jour

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
                            if(data.rows.item(0).ID==1){
                                 this.image="/assets/imgs/image1.jpg"
                            }

                            else{
                                 this.image="/assets/imgs/image2.png"
                            }
                               

                       
                            this.user=new User(data.rows.item(0).ID,data.rows.item(0).FIRSTNAME,data.rows.item(0).LASTNAME,data.rows.item(0).EMAIL,data.rows.item(0).PASSWORD,this.image,data.rows.item(0).TEL);
                
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
