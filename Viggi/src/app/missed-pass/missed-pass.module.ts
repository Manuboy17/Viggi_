import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MissedPassPageRoutingModule } from './missed-pass-routing.module';

import { MissedPassPage } from './missed-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MissedPassPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MissedPassPage]
})
export class MissedPassPageModule {}
