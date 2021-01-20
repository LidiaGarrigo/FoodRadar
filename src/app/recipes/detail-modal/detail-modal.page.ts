import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.page.html',
  styleUrls: ['./detail-modal.page.scss'],
})
export class DetailModalPage implements OnInit {

  constructor(private modalController: ModalController,) { }

  ngOnInit() {
  }
  async closeModal(){
    await this.modalController.dismiss({
    /*   'ion-card': this.X.value */
    });
  }

}
