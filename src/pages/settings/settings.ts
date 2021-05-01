import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthentificationPage } from '../authentification/authentification';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
ImageArray: any = [];
authPage=AuthentificationPage;
  constructor(public navCtrl: NavController, public navParams: NavParams ) {
    this.ImageArray=[
  {'image' : 'https://www.activemedia.com/sites/default/files/styles/tablet_frame/public/media/slider/am-mark-mobile.jpg'},
{'image': 'https://img.freepik.com/photos-gratuite/femme-afro-serieuse-utilise-carte-credit-telephone-portable-pour-achats-ligne-dans-grand-magasin-achete-vetements-solde-vetue-chemise-mode-jaune-se-dresse-contre-differents-vetements-cintres_273609-32750.jpg?size=626&ext=jpg'}];
  }

  
}
