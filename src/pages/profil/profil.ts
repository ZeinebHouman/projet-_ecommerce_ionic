import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { Produit } from '../../models/produit.model';
import { User } from '../../models/user.model';
import { ProduiService } from '../../services/produit.service';
import { sqliteService } from '../../services/sqlite.service';
import { UserService } from '../../services/user.service';
import { NewProduitPage } from '../new-produit/new-produit';
import { SingleProduitPage } from '../single-produit/single-produit';



@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage implements OnInit{

  user:User;
  produitList: Produit[];
  newProduit=NewProduitPage;
  userSubscription: Subscription
  produitListSubscription: Subscription; // pour souscrire du subject de service
  constructor( private navCntrl: NavController, private userServise: UserService ,private produitService: ProduiService,private menuCntrl: MenuController, public navParams: NavParams)
  {

  }
  
  ngOnInit()
  {
    this.userSubscription=this.userServise.user$.subscribe(
      (user: User)=>{
        this.user=user;
      });
    
     //this.user= this.navParams.get('user');
 //   this.user=this.userSercise.user;
 //   console.log("**ici**"+this.user);
    /*this.produitListSubscription=this.produitService.produits$.subscribe(
      (produits: Produit[]) =>{ this.produitList= produits}
    );
    this.produitService.emitProduit();*/
  }
  
  onToggleMenu()
  {
    
    console.log("cccc",this.user);
    this.menuCntrl.open();
  }
  

 /* ngOnDestroy(): void {
   this.produitListSubscription.unsubscribe();
  }*/
  onLoadProduit(p: Produit)
  {
    this.navCntrl.push(SingleProduitPage, {produitView : p});
  }

  }



