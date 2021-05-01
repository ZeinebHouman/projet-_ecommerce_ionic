import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { normalizeUrl } from 'ionic-angular/navigation/deep-linker';
import { Produit } from '../../models/produit.model';
import { ProduiService } from '../../services/produit.service';



@IonicPage()
@Component({
  selector: 'page-new-produit',
  templateUrl: 'new-produit.html',
})
export class NewProduitPage implements OnInit{
  produitForm: FormGroup;
  imageUrl: string;

  constructor(private formBuilder: FormBuilder, private camera: Camera,
    private toastCtrl: ToastController,
    private produitService: ProduiService,
    private navCnrtl: NavController
    ) {
  }
  ngOnInit(): void {
   this.initForm();
  }
  initForm()
  {
    this.produitForm=this.formBuilder.group(
      {
        name: ['',Validators.required],
        date: [new Date().toISOString, Validators.required],
        description: ['',Validators]
      }
    )
  }
  async onTakePhoto(option : String)
  { 
   if(option === 'camera')
   {
     this.openCamera();
   }
   else{
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
  openCamera()
  {//ouvrir l'appareil photo / permettre de prendre la photo / recupere l'url q'uon va le normaliser et enregistrer
    // dans le cas erreur -> toast
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL, //destination
      encodingType: this.camera.EncodingType.JPEG, //type de la photo
      mediaType: this.camera.MediaType.PICTURE, //  choisir entre photo ou video -> photo
      correctOrientation: true // photo tourner dans le bon sens si c payage ou portrait

    }).then(
      (data) => {
        if (data) {
          this.imageUrl= 'data:image/jpeg;base64,'+data; //encoder fel base64
        }
      }
    ).catch(
      (error) =>{ //pour expliquer l'erreur on affiche un toast 
        this.toastCtrl.create({
          message: error.message,
          duration : 3000, //3s
          position: 'bottom'

        }).present(); //presenter le toast instantanement
      }
    )
  }
  onSubmitForm() //ajouter un produit dans le service
  {
    let newProduit=new Produit(
      this.produitForm.get('name').value,
      this.produitForm.get('description').value,
      new Date,
      this.imageUrl);
      this.produitService.addProduits(newProduit);
      this.navCnrtl.pop();


  }

  

}
