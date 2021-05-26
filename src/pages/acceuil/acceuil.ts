import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { Produit } from '../../models/produit.model';
import { User } from '../../models/user.model';
import { ProduiService } from '../../services/produit.service';
import { UserService } from '../../services/user.service';

@IonicPage()
@Component({
  selector: 'page-acceuil',
  templateUrl: 'acceuil.html',
})
export class AcceuilPage {
  produitList: Produit[];
  produitListSubscription: any;
  ProduitFilter: Produit[];
  userSubscription: Subscription;
  user: User;
  isSearchBarOpen =false;

  constructor(public userService: UserService,public navCtrl: NavController, public navParams: NavParams, private produitService: ProduiService) {
    this.userSubscription=this.userService.user$.subscribe(
      (user: User) => {
        this.user=user;
      });
    }
  
  ionViewWillEnter()
 {
  /*this.produitListSubscription=this.produitService.produits$.subscribe(
    (produits: Produit[]) =>{ this.produitList= produits}
  );
  this.produitService.emitProduit();*/
  setTimeout(()=> {
    this.produitService.displayProduitAcceuil().then(
   (produits : Produit[]) =>{ 
     this.produitList=produits;
   }
 )},3000)
 
  
 
 }
 getItem(ev: any) {
  
   const val = ev.target.value;
   if (val && val.trim() != '') {
     this.produitList = this.produitList.filter((produit) => {
       return (produit.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
     })
   }
   else
   {
    this.produitService.displayProduitAcceuil().then(
      (produits : Produit[]) =>{ 
        this.produitList=produits;
      })
   }
 }
 isMyProduct(produit : Produit){
   if(this.userService.user !=null){
  if(produit.user.id==this.userService.user.id){
    return true
  }
  else return false;

 }
}

}
