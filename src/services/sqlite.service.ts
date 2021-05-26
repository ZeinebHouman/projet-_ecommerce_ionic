import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

import { LoadingController, NavController, Platform, ToastController } from "ionic-angular";

@Injectable()
export class sqliteService{
    public db:SQLiteObject;
    constructor(
        private sqlite:SQLite,
        private loadingCtrl:LoadingController,
        private toastCtrl:ToastController,
        private platform:Platform)
        {
            let loader= this.loadingCtrl.create({
                content: 'Loading...'
              });

            loader.present();
            this.platform.ready().then(()=>{
            
                this.createDataBaseFile();
                
                loader.dismiss();
            
            });
            
     
    }
        
     
    

private createDataBaseFile() 
    {
        this.sqlite.create({
            name: 'data.db',
            location:'default'
        })
        .then((db:SQLiteObject)=>{
            
            this.db=db;
            this.createProduitsUsers();
            this.insertUsers();
  
        })
        .catch((error)=>
        {
           
        }        
        )
     
    }
   
    
    createProduitsUsers() {
        //Creation de table produit 
        this.db.executeSql('create table IF NOT EXISTS USER (ID int not null,FIRSTNAME char(20)  not null,LASTNAME  char(20) not null,EMAIL char(50) not null,PASSWORD  char(30) not null, TEL char(20) not null ,primary key (ID))',{})
        .then(()=>{
            ////Creation de table produit
         this.db.executeSql('create table IF NOT EXISTS PRODUIT (ID_PRODUIT int not null, ID int not null, NAME char(30) not  null, PRIX decimal not null ,DESCRIPTION  varchar(100)  not null, IMAGEPATH  long blob not null, primary key (ID_PRODUIT), foreign key(ID) references USER (ID))',{})
         .then(()=>{
     
                /* let toast= this.toastCtrl.create({
                     message: "tables created",
                     duration:3000,
                     position:'top'
                          });
                     toast.present();
                    // alert("tables created");*/
         
 
             })
         .catch((error)=>    {
              alert(error.message)
          
         });
     })
     .catch((error)=>    {
       
     
     });
     }


    insertUsers() {
        this.db.executeSql('INSERT INTO USER VALUES (1,\''+'Houman'+'\',\''+'Zeineb'+'\',\''+'zeineb@gmail.com'+'\',\''+'123'+'\',\''+'25879654'+'\')',{})
        .then(()=>{
         /*   let toast= this.toastCtrl.create({
                message: "user 1 inserted !!",
                duration:3000,
                position:'top'
                     });
                toast.present();*/
        
    })
    .catch((error)=>{
      /*  let toast= this.toastCtrl.create({
            message:"erreur insertion user 1 "+ error.message,
            duration:3000,
            position:'top'
                 });
            toast.present();*/
    });
    this.db.executeSql('INSERT INTO USER VALUES (2,\''+'Houman'+'\',\''+'Nour'+'\',\''+'nour@gmail.com'+'\',\''+'123'+'\',\''+'5578945'+'\')',{})
    .then(()=>{
        let toast= this.toastCtrl.create({
            message: "user 2 inserted !!",
            duration:3000,
            position:'top'
                 });
            toast.present();
    
})
.catch((error)=>{
    /*let toast= this.toastCtrl.create({
        message:"erreur insertion user 2 "+ error.message,
        duration:3000,
        position:'top'
             });
        toast.present();*/
})

}



  
}

