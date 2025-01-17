import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuditoriaPageRoutingModule } from './auditoria-routing.module';

import { AuditoriaPage } from './auditoria.page';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    AuditoriaPageRoutingModule,
    MatButtonModule
  ],
  declarations: [AuditoriaPage]
})
export class AuditoriaPageModule {}
