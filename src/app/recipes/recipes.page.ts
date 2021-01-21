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
  
  constructor(
    private RecipeService: RecipesService,
    private modalController: ModalController, ) {  }
    private searchItem: any;

    ngOnInit() {
      this.RecipeService.getRecipes$()
      .subscribe((data) => this.recipes = data.hits);
      this.searchItem = this.recipes;
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
    buscar($event){
      let buscador = (`${this.RecipeService.search()}${$event.detail.value}`);
      console.log(buscador);
      /* console.log($event.detail.value);
      const usuario = $event.detail.value;
      const buscador = (`${this.API_URL}${usuario}`);
      console.log(buscador); */


      /* const val = $event.target.value;
      this.searchItem = this.recipes;
      if(val && val.trim() != ''){
        this.searchItem = this.searchItem.filter((item: any) => {
          return (item.title.indexOf(val) > -1);
        });
      } */
    }
    onSelectedOption(){}

    
}