import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { Produit } from '../../models/produit.model';
import { User } from '../../models/user.model';
import { ProduiService } from '../../services/produit.service';
import { UserService } from '../../services/user.service';

/**
 * Generated class for the UpdateProduitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-produit',
  templateUrl: 'update-produit.html',
})
export class UpdateProduitPage implements OnInit {
  produitForm: FormGroup;
  imageUrl: string;
  userSubscription: Subscription;
  user: User;
  p: Produit;



  constructor(private formBuilder: FormBuilder, private camera: Camera,
    private toastCtrl: ToastController,
    private produitService: ProduiService,
    private navCnrtl: NavController,
    private authService: UserService,
    private alertCtrl: AlertController,
    private navParams: NavParams ) 
  {
    this.userSubscription = this.authService.user$.subscribe(
      (user: User) => {
        this.user = user;
      });
    this.authService.emitUser();
  }
  ngOnInit(): void {

    this.p=this.navParams.get('produit');
    this.imageUrl=this.p.imagePath;
    this.initForm();
  }


  initForm() {
    this.produitForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        description: ['', Validators],
        prix: ['', Validators.required]
      }
    )
  }
  async onTakePhoto(option: String) {
    if (option === 'camera') {
      this.openCamera();
    }
    else {
      const libraryImage = await this.openLibrary();
      this.imageUrl = 'data:image/jpg;base64,' + libraryImage;
    }
  }
  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }
  openCamera() {//ouvrir l'appareil photo / permettre de prendre la photo / recupere l'url q'uon va le normaliser et enregistrer
    // dans le cas erreur -> toast
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL, //destination
      encodingType: this.camera.EncodingType.JPEG, //type de la photo
      mediaType: this.camera.MediaType.PICTURE, //  choisir entre photo ou video -> photo
      correctOrientation: true // photo tourner dans le bon sens si c payage ou portrait

    }).then(
      (data) => {
        if (data) {
          this.imageUrl = 'data:image/jpeg;base64,' + data; //encoder fel base64
        }
      }
    ).catch(
      (error) => { //pour expliquer l'erreur on affiche un toast 
        this.toastCtrl.create({
          message: error.message,
          duration: 3000, //3s
          position: 'bottom'

        }).present(); //presenter le toast instantanement
      }
    )
  }
  onSubmitForm() //ajouter un produit dans le service
  {
    let newProduit = new Produit(
      this.p.id_produit,
      this.produitForm.get('name').value,
      this.produitForm.get('prix').value,
      this.produitForm.get('description').value,
      this.p.date,
      this.imageUrl,
      this.user);
    this.produitService.updateProduit(newProduit).then(
      (resolve) => {
        const alert = this.alertCtrl.create({
          title: 'Succés',
          subTitle: 'le produit a été bien modifié ',
          buttons: ["OK"]
        }
        );
        alert.present();
        this.navCnrtl.pop();
        this.navCnrtl.pop();
      }, (reject) => {
        const alert = this.alertCtrl.create({
          title: 'Erreur',
          subTitle: 'Probléme de modification ' + reject,
          buttons: ['OK']
        });
        alert.present();
      });
      





  }




}
