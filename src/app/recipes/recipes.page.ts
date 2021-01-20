import { DetailModalPage } from './detail-modal/detail-modal.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  public recipes = [];

  constructor(
    private RecipeService: RecipesService,
    private modalController: ModalController, ) {  }

    ngOnInit() {
      this.RecipeService.getRecipes$()
      .subscribe((data)=> this.recipes = data.hits);
    }
    
    async openModal(){
      const modal = await this.modalController.create({
        component: DetailModalPage,
        cssClass: 'my-custom-class',
        componentProps: {
          'firstName': 'Douglas',
          'lastName': 'Adams',
          'middleInitial': 'N'
        }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
    }
}