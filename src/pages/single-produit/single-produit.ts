import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Produit } from '../../models/produit.model';



@IonicPage()
@Component({
  selector: 'page-single-produit',
  templateUrl: 'single-produit.html',
})
export class SingleProduitPage implements OnInit {
  p: Produit;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams) {

  }
  ngOnInit(): void {
   this.p=this.navParams.get('produitView');
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


}
