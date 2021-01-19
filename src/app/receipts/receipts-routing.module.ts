import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiptsPage } from './receipts.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiptsPage
  },
  {
    path: 'detail-modal',
    loadChildren: () => import('./detail-modal/detail-modal.module').then( m => m.DetailModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiptsPageRoutingModule {}
