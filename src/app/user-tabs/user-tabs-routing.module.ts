import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTabsPage } from './user-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: UserTabsPage,
    children: [
      {
        path: 'recipes',
        loadChildren: () => import('../recipes/recipes.module').then(m => m.ReceiptsPageModule)
      },
      {
        path: 'scanner',
        loadChildren: () => import('../scanner/scanner.module').then(m => m.ScannerPageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../favorites/favorites.module').then(m => m.FavoritesPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/user-tabs/recipes',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/user-tabs/recipes',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class UserTabsPageRoutingModule {}
