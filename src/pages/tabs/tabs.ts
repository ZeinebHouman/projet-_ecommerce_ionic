import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { AcceuilPage } from '../acceuil/acceuil';
import { ProfilPage } from '../profil/profil';
import { SettingsPage } from '../settings/settings';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  acceuilPage=AcceuilPage;
  profilPage=ProfilPage;
  settingsPage=SettingsPage;

  constructor(public navCtrl: NavController,public userService: UserService) {
      
  }
  isAuth(){
   
     return this.userService.isAuth;
    }
  }

 


