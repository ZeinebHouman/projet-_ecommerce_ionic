import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleProduitPage } from './single-produit';

@NgModule({
  declarations: [
    SingleProduitPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleProduitPage),
  ],
})
export class SingleProduitPageModule {}
