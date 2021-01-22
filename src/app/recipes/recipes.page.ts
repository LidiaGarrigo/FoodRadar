import { FirebaseService } from 'src/app/services/firebase.service';
import { DetailModalPage } from './detail-modal/detail-modal.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  @ViewChild('search', {static: false}) serach: IonSearchbar;

  public recipes = [];
  foodFilter = '';
  value = '';

  filterTerm: string;
  
  constructor(
    private RecipeService: RecipesService,
    private modalController: ModalController,
    private fs: FirebaseService) {  }

    ngOnInit() {
      this.RecipeService.getRecipes$()
      .subscribe((data) => this.recipes = data.hits);
    }

    ionViewDidEnter(){
      setTimeout(() => {
        this.serach.setFocus();
      });
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