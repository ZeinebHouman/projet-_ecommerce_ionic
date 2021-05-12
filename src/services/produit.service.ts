import { Injectable } from "@angular/core";
import { SQLiteObject } from "@ionic-native/sqlite";
import { Subject } from "rxjs/Subject";
import { Produit } from "../models/produit.model";
import { sqliteService } from "./sqlite.service";

@Injectable()
export class ProduiService{

    private produits: Produit[]=[];
    produits$= new Subject<Produit[]>(); //mise a jour
    db : SQLiteObject; 

    constructor(private sqlite:sqliteService){

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
            produit.id_produit=Math.max.apply(null, this.produits);
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
    displayProduitProfil()
    {
       /*
            this.db.executeSql('SELECT * FROM ANNONCE,UTILISATEUR WHERE UTILISATEUR.ID=ANNONCE.ID',{})
              .then((data)=>{*/
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
                this.db.executeSql("UPDATE PRODUIT SET NAME='"+produit.name+"' , PRIX='"+produit.date+"' , DESCRIPTION='"+produit.description+"', DATE='"+produit.prix+"'  , IMAGEPATH='"+produit.imagePath+"' WHERE ID_PRODUIT='"+produit.id_produit+"' ",{})
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
