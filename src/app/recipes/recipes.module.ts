import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiptsPageRoutingModule } from './recipes-routing.module';

import { RecipesPage } from './recipes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiptsPageRoutingModule
  ],
  declarations: [RecipesPage]
})
export class ReceiptsPageModule {}
