import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ToastController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AcceuilPage } from '../pages/acceuil/acceuil';
import { SettingsPage } from '../pages/settings/settings';
import { ProfilPage } from '../pages/profil/profil';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Produit } from '../models/produit.model';
import { ProduiService } from '../services/produit.service';
import { NewProduitPage } from '../pages/new-produit/new-produit';
import { Camera } from '@ionic-native/camera';
import { AuthentificationPage } from '../pages/authentification/authentification';
import { UserService } from '../services/user.service';
import { SingleProduitPage } from '../pages/single-produit/single-produit';
import { sqliteService } from '../services/sqlite.service';
import { SQLite } from '@ionic-native/sqlite';
;

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    AcceuilPage,
    SettingsPage,
    ProfilPage,
    NewProduitPage,
    AuthentificationPage,
    SingleProduitPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    ReactiveFormsModule,
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    AcceuilPage,
    SettingsPage,
    ProfilPage,
    NewProduitPage,
    AuthentificationPage,
    SingleProduitPage,
    
    
    
  ],
  providers: [
  
    StatusBar,
    SplashScreen,
    ProduiService, 
    Camera,
    UserService,
    sqliteService,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
