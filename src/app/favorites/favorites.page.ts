import { FavoriteService } from 'src/app/services/favorite.service';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { DetailModalPage } from '../recipes/detail-modal/detail-modal.page';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  public recipes = [];
  filterTerm: string;
  recetas: any;
  
  @Input() recipt: any;
  favorite: boolean = false;

  constructor(
    private RecipeService: RecipesService,
    private modalController: ModalController,
    private fs: FirebaseService,
    private favoriteService: FavoriteService) {  
      /* this.showFav(); */
    }

    async ngOnInit() {
      this.recetas = await this.favoriteService.getAllFavoriteRecipes();
      console.log(this.recetas);
      this.recetas.forEach(label => { 
        this.RecipeService.searchCharacters(label)
        .subscribe((data: any) => this.recipes.push(data.hits[0]));
      });
    }
   /*  showFav(){
     const mostrar = localStorage.getItem('favoriteRecipes');
     console.log(mostrar);

    } */
    
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
