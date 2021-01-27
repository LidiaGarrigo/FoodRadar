import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FavoriteService } from 'src/app/services/favorite.service';


@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.page.html',
  styleUrls: ['./detail-modal.page.scss'],
})
export class DetailModalPage implements OnInit{

  favorites: any[] = [];

  @Input() recipt: any;
  @Input() receta: any;

  storage: any;
  favorite: boolean = false;

  constructor(
    private modalController: ModalController, private favoriteService: FavoriteService) {

  }
  ngOnInit() {
    console.log(this.receta);
    this.favoriteService.isFavorite(this.recipt.recipe.label).then((data) => this.favorite = data);
  }

  async closeModal() {
    await this.modalController.dismiss({
      /*   'ion-card': this.X.value */
    });
  }

  addToFavorites() {
    this.favorite = true;
    console.log('adding to fav', this.recipt.recipe.label);
    this.favoriteService.addFavorite(this.recipt.recipe.label);
    console.log('fav', this.favorite);
  }
  deleteFav() {
    this.favorite = false;
    this.favoriteService.deleteFavorite(this.recipt.recipe.label);
    console.log(this.recipt.recipe.label);
  }

}