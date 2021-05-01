import { Subject } from "rxjs/Subject";
import { Produit } from "../models/produit.model";

export class ProduiService{

    private produits: Produit[]=[];
    produits$= new Subject<Produit[]>(); //mise a jour

    emitProduit()
    {
        this.produits$.next(this.produits);
    }

    addProduits(produit: Produit)
    {
        this.produits.push(produit);
        this.emitProduit();
    }
}