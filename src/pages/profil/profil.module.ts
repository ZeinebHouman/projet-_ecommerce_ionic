import { NgModule, OnDestroy } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Produit } from '../../models/produit.model';
import { ProduiService } from '../../services/produit.service';
import { ProfilPage } from './profil';

@NgModule({
  declarations: [
    ProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilPage),
  ],
})
export class ProfilPageModule{

}
