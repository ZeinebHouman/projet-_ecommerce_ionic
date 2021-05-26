import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { ToastController } from "ionic-angular";
import { Subject } from "rxjs/Subject";
import { Produit } from "../models/produit.model";
import { User } from "../models/user.model";
import { sqliteService } from "./sqlite.service";

@Injectable()
export class ProduiService{

    private produits: Produit[]=[];
    private produitProfil : Produit[]=[]; //produit pour l'utilisateur connecté qui vont etre affiché dans son profil
    produits$= new Subject<Produit[]>(); //mise a jour
    db : SQLiteObject; 
    image: String;
    user: User;

    constructor(private toastCtrl: ToastController, private sqlite:SQLite){
        this.sqlite.create({
            name: 'data.db',
            location:'default'
        })
        .then((db:SQLiteObject)=>{
            
            this.db=db;
        })
        .catch((error)=>
        {
            let toast= this.toastCtrl.create({
                message:error.message,
                duration:3000,
                position:'top'
                     });
                toast.present();
        }        
        )

    }
    emitProduit()
    {
        this.produits$.next(this.produits);
    }

    addProduits(produit: Produit)
    {
     /*   this.produits.push(produit);
        this.emitProduit();*/
        return new Promise((resolve, reject) => {

            if(produit==null) resolve(false);
           
           // produit.id_produit=Math.max.apply(null, this.produits)+1;
             produit.id_produit=Math.floor(Math.random() * (100 - 1 + 1)) + 1;
            this.db.executeSql("INSERT INTO PRODUIT VALUES('"+produit.id_produit+"','"+produit.user.id+"','"+produit.name+"','"+produit.prix+"','"+produit.description+"','"+produit.imagePath+"') ",{})
            .then(
                () =>{
                    this.produits.push(produit);
                    this.emitProduit();
                    resolve(true)
                }     
            )
            .catch(
                error => {reject(error.message)}
            )
        })
    }
    displayProduitProfil(user : User)
    {
        return new Promise((resolve, reject) =>{

           let i=0
           let produitProfil : Produit[]=[];
            this.db.executeSql("SELECT * FROM PRODUIT,USER WHERE USER.ID=PRODUIT.ID AND USER.ID="+user.id+"",{})
              .then((data)=>{
                while(i< data.rows.length)
                {
                    const produit=new Produit(data.rows.item(i).ID_PRODUIT,data.rows.item(i).NAME,data.rows.item(i).PRIX,data.rows.item(i).DESCRIPTION,new Date,data.rows.item(i).IMAGEPATH,user);
                    i++;
                    produitProfil.push(produit);
                    

                }
                resolve(produitProfil);
              })
            .catch( error => {reject(error.message)} )     
        
    });
}
    displayProduitAcceuil()
    {
        return new Promise((resolve, reject) =>{
            
            let i=0
            let produitAcceuil : Produit[]=[];
             this.db.executeSql("SELECT * FROM PRODUIT,USER WHERE PRODUIT.ID=USER.ID",{})
               .then((data)=>{
                 while(i< data.rows.length)
                 {
                    if(data.rows.item(i).ID==1){
                        this.image="/assets/imgs/image1.jpg"
                   }

                   else{
                        this.image="/assets/imgs/image2.png"
                   }
                    // this.db.executeSql("SELECT * FROM USER WHERE USER.ID="+data.rows.item(i).ID+"",{})
                   // .then((data1)=>{
                      this.user= new User(data.rows.item(i).ID,data.rows.item(i).LASTNAME,data.rows.item(i).FIRSTNAME,data.rows.item(i).EMAIL,data.rows.item(i).PASSWORD,this.image,data.rows.item(i).TEL);
                   // })
                    const produit=new Produit(data.rows.item(i).ID_PRODUIT,data.rows.item(i).NAME,data.rows.item(i).PRIX,data.rows.item(i).DESCRIPTION,new Date,data.rows.item(i).IMAGEPATH,this.user);
                    i++;
                    produitAcceuil.push(produit);

                   
                }
                
               
                resolve(produitAcceuil);
                
               
            })
             .catch( error => {reject(error.message)} )     
         
     });
    }
    

    removeProduit(id:number)
    {
        return new Promise(
            (resolve, reject)=>{
                this.db.executeSql("DELETE FROM PRODUIT WHERE ID_PRODUIT='"+id+"' ",{}).then(
                    ()=>{
                        let indice= this.produits.findIndex(e=>Number(e.id_produit)==id);
                        this.produits.splice(indice);
                        this.emitProduit();
                        resolve(true);
                    }
                )
                .catch(
                    (error) =>(
                        reject(error.message)))
            }
            )
    }
    updateProduit(produit: Produit)
    {
        return new Promise(
            (resolve,reject) =>{
                this.db.executeSql("UPDATE PRODUIT SET NAME='"+produit.name+"' , PRIX='"+produit.prix+"' , DESCRIPTION='"+produit.description+"' , IMAGEPATH='"+produit.imagePath+"' WHERE ID_PRODUIT='"+produit.id_produit+"' ",{})
                .then(
                    ()=>{
                        let indice= this.produits.findIndex(e=>e.id_produit==produit.id_produit);
                        this.produits[indice]=produit;
                        this.emitProduit();
                        resolve(true);
                    }
                    
                )
                .catch(
                    (error)=>{ reject(error.message);}
                    )
            }

        )
    }
}
