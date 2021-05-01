import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { Produit } from '../../models/produit.model';
import { ProduiService } from '../../services/produit.service';
import { NewProduitPage } from '../new-produit/new-produit';

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage implements OnInit, OnDestroy {

  produitList: Produit[];
  newProduit=NewProduitPage;
  produitListSubscription: Subscription; // pour souscrire du subject de service
  constructor(private produitService: ProduiService,private menuCntrl: MenuController)
  {

  }
  
  ngOnInit()
  {

    this.produitListSubscription=this.produitService.produits$.subscribe(
      (produits: Produit[]) =>{ this.produitList= produits}
    );
    this.produitService.emitProduit();
  }
  onToggleMenu()
  {
    this.menuCntrl.open();
  }

  ngOnDestroy(): void {
   this.produitListSubscription.unsubscribe();
  }

  }



