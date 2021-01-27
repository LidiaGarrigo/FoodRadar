import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {RecipesInt} from '../../app/interfaces/RecipesInt';
import {RecipesService} from '../../app/services/recipes.service';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  

constructor() { 
}



async addFavorite(label: any): Promise<void>{
  let result: any = await this.getAllFavoriteRecipes();
  if(result) {
    console.log(result);
    result.push(label);
    return Storage.set({key:'favoriteRecipes', value: JSON.stringify(result)});
  }
  else {
    return Storage.set({key:'favoriteRecipes', value: JSON.stringify([label])});
  }
  
}

async isFavorite(label:any): Promise<boolean> {
  let result: any = await this.getAllFavoriteRecipes();

  return result && result?.indexOf(label)>=0;
}
async getAllFavoriteRecipes(): Promise<{value:any}>{
  const ret = await Storage.get({key: 'favoriteRecipes'});
  return JSON.parse(ret.value);
}

async deleteFavorite(label: any){
  let result: any = await this.getAllFavoriteRecipes();
  console.log(result);
  console.log(label);
  for (let i = 0; i < result.length; i++) {
    if(result[i] === label){
      result.splice(i, 1);
      console.log(result);
    }
  }
  return Storage.set({key:'favoriteRecipes', value: JSON.stringify(result)});

}

/* async getAllFavoriteFilms(): Promise<{value:any}> {
  const ret = await Storage.get({key: 'favoriteFilms'});

  return JSON.parse(ret.value);
}

async favoriteFilm(filmId){
  let result: any = await this.getAllFavoriteFilms();
//TODO: Utilizar set en lugar de array
  if(result) {
    result.push(filmId);

    return Storage.set({key:'favoriteFilms', value: JSON.stringify(result)});

  } else {
    return Storage.set({key:'favoriteFilms', value: JSON.stringify([filmId])});
  }
}

async isFavorite(filmId){
  let result: any = await this.getAllFavoriteFilms();
  return result && result?.indexOf(filmId)>=0;
}
 */
}
