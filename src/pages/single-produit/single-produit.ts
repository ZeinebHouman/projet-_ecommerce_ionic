import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { Produit } from '../../models/produit.model';
import { User } from '../../models/user.model';
import { ProduiService } from '../../services/produit.service';
import { UserService } from '../../services/user.service';
import { UpdateProduitPage } from '../update-produit/update-produit';



@IonicPage()
@Component({
  selector: 'page-single-produit',
  templateUrl: 'single-produit.html',
})
export class SingleProduitPage implements OnInit {
  p: Produit;
  userSubscription: Subscription;
  user: User;
  produit: Produit[];
  produit$: Subscription;


  
  constructor(public alertCtrl: AlertController ,public navCtrl: NavController, public userService: UserService,public toastCtrl: ToastController, public navParams: NavParams, public produitService: ProduiService) {
    this.userSubscription=this.userService.user$.subscribe(
      (user: User) => {
        this.user=user;
      }
    )
    this.userService.emitUser();
  }
  ngOnInit(): void {
   this.p=this.navParams.get('produitView');
  }
 
 /* doRefresh(event) {

    setTimeout(() => {
      this.produit$=this.produitService.produits$.subscribe(
      (produit: Produit[]) => {
        this.produit=produit;
      }
    )
    this.produitService.emitProduit();
      event.target.complete();
    }, 2000);
  }*/
  showAlert()
  {
    const confirm = this.alertCtrl.create({
      title: 'Suppression',
      message: 'Vous souhaitez supprimer le produit ?',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
          
          }
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.removeProduit();
          }
        }
      ]
    });
    confirm.present();
  }
  
  removeProduit()
  {
    this.produitService.removeProduit(this.p.id_produit).then(
      (resolve)=>{
       
          const alert = this.alertCtrl.create({
            title: 'Ajout',
            subTitle: 'Votre produit a été bien ajoutée !',
            buttons: ["OK"]
        }
      );
      alert.present();
      this.navCtrl.pop();
      },

    (reject)=>{
      const alert = this.alertCtrl.create({
        title: 'Echec',
        subTitle: 'probléme de suppression',
        buttons: ["OK"]
    }
  );
  alert.present();
      
    }


    

  
    );

}
updateProduit()
{
    this.navCtrl.push(UpdateProduitPage, {produit : this.p});
  
}
}