import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissedPassPage } from './missed-pass.page';

const routes: Routes = [
  {
    path: '',
    component: MissedPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissedPassPageRoutingModule {}
