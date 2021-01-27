import { FirebaseService } from 'src/app/services/firebase.service';
import { DetailModalPage } from './detail-modal/detail-modal.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { RecipesService } from '../services/recipes.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { take } from 'rxjs/operators';

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
  characters: any;
  private query: string;

  filterTerm: string;
  
  constructor(
    private recipeService: RecipesService,
    private modalController: ModalController,
    private fs: FirebaseService,
    private router: Router,
    private route: ActivatedRoute) {  }

    ngOnInit() {
      this.recipeService.getRecipes$()
      .subscribe((data) => this.recipes = data?.hits);

      this.getCharactersByQuery();
    }

    private getCharactersByQuery(): void{
      this.route.queryParams.pipe(take(1)).subscribe((params: ParamMap) => { console.log('Params=', params);
        this.query = params['q']|| 'potato';
        this.getDataFromService();
      });
    }

    private getDataFromService(): void{
      this.recipeService.searchCharacters(this.query).pipe(
        take(1)).subscribe((res:any)=>{
          console.log('res',res);
        this.characters = [...res.hits];
        console.log('characters',this.characters);
      });
  }

  onSearch(value: string){
    if (value && value.length > 3){
      this.query = value;
      console.log(this.query);
      this.getDataFromService();
    }

  }
    async openModal(recipt){
      console.log(recipt);
      const modal = await this.modalController.create({
        component: DetailModalPage,
        cssClass: 'my-custom-class',
        componentProps: {
          'recipt': recipt,
          'receta': 'recetas',
        }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
    }

    onLogout() {
      this.fs.logout();
    }
}