import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewProduitPage } from './new-produit';

@NgModule({
  declarations: [
    NewProduitPage,
  ],
  imports: [
    IonicPageModule.forChild(NewProduitPage),
  ],
})
export class NewProduitPageModule {}
