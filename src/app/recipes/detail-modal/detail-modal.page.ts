import { RecipesInt } from './../../interfaces/RecipesInt';
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.page.html',
  styleUrls: ['./detail-modal.page.scss'],
})
export class DetailModalPage {

@Input() recipt: any;
  
  constructor(
    private modalController: ModalController) { }

  async closeModal(){
    await this.modalController.dismiss({
    /*   'ion-card': this.X.value */
    });
  }

}
