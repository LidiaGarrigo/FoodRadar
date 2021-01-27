import { FavoriteService } from 'src/app/services/favorite.service';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { DetailModalPage } from '../recipes/detail-modal/detail-modal.page';



@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  public recipes = [];

  filterTerm: string;
  
  @Input() recipt: any;
  favorite: boolean = false;

  constructor(
    private RecipeService: RecipesService,
    private modalController: ModalController,
    private fs: FirebaseService,
    private favoriteService: FavoriteService) {  }

    ngOnInit() {
      /* this.RecipeService.getRecipes$()
      .subscribe((data) => this.recipes = data.hits); */

      /* console.log(this.recipt.recipe.label); */

    }
    
    async openModal(recipt){
      const modal = await this.modalController.create({
        component: DetailModalPage,
        cssClass: 'my-custom-class',
        componentProps: {
          'recipt': recipt,
        }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
    }

    onLogout() {
      this.fs.logout();
    }
}
