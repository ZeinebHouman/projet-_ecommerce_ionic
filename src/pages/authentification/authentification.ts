import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ProfilPage } from '../profil/profil';

@IonicPage()
@Component({
  selector: 'page-authentification',
  templateUrl: 'authentification.html',
})
export class AuthentificationPage implements OnInit{
  user: User;
  userForm: FormGroup;
  constructor(private navCtrl: NavController, private alertCntrl: AlertController, private authService : UserService , private formBuilder: FormBuilder) {


  }
  ngOnInit(){
    this.initForm()
  }
  initForm() {
   this.userForm=this.formBuilder.group({
     login: ['',Validators.email],
     password: ['',Validators.required]
   }
   )
  }
  onSubmitForm(){

    let email= this.userForm.get('login').value;
    let password = this.userForm.get('password').value
    this.authService.Authentification(email,password).then(
      (user : User) =>{
       this.navCtrl.push(ProfilPage, {user: user});
       console.log("user authentificated");

      },
      (reject) =>{
        let alert = this.alertCntrl.create({
          title: "Oups",
          subTitle: "Vérifiez bien vos coordonnées",
          buttons: ['OK']
        });
        alert.present();
      }

    )
   

 /* for(var i in  this.authService.users){
  if( this.authService.users[i]['email']=== this.userForm.get('login').value)
  {
    if( this.authService.users[i]['password']===this.userForm.get('password').value)
    {
    this.user= this.authService.users[i];
    this.authService.isAuth=true;
    console.log(this.user);

  this.navCtrl.push(ProfilPage,{user: this.user});

//  console.log("coileee");
    }
    else{
      let alert = this.alertCntrl.create({
        title: "Oups",
        subTitle: "le mot de passe est incorrecte",
        buttons: ['OK']
      });
      alert.present();
    }
  }
  }
  if(this.user==null)
  {
    let alert = this.alertCntrl.create({
      title: "Oups",
      subTitle: "l'email' est incorrecte",
      buttons: ['OK']
  });
}*/
}




}

