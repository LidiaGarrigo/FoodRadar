import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.page.html',
  styleUrls: ['./detail-modal.page.scss'],
})
export class DetailModalPage implements OnInit {
  public recipes = [];
  constructor(private modalController: ModalController,private RecipeService: RecipesService,) { }

  ngOnInit() {
    this.RecipeService.getRecipes$()
      .subscribe((data)=> this.recipes = data.hits);
  }
  async closeModal(){
    await this.modalController.dismiss({
    /*   'ion-card': this.X.value */
    });
  }

}
