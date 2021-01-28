import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Photo, PhotoService } from '../services/photo.service';
import { FormularioService } from '../services/formulario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  img: any;
  profileForm: FormGroup;
  avatar = 'assets/icon/avatar.png';
  mostrar: boolean;

  constructor(
    private fs: FirebaseService,
    private fb: FormBuilder,
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    private Sanitizer: DomSanitizer,
    private formService: FormularioService) {

    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      image: [this.avatar],
    });

  }

  ngOnInit() {
    this.photoService.loadSaved();
  
  }

  logForm() {
    this.profileForm.get('image').setValue(this.img);
    console.log(this.profileForm.value);
    this.formService.writeStorage(this.profileForm.value);
  }

  public async showActionSheet(photo: Photo, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }

  async addPhoto() {
    const imagen = await this.photoService.addNewToGallery();
    this.img = this.Sanitizer.bypassSecurityTrustResourceUrl(imagen.webviewPath);
  }

  edit(){
    this.mostrar ? this.mostrar = false : this.mostrar = true;
  }
  onLogout() {
    this.fs.logout();
  }

}
