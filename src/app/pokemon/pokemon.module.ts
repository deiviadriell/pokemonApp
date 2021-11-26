import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { ListComponent } from './list/list.component';
import { BuscarPipe } from './pipes/buscar.pipe';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ListComponent,
    BuscarPipe,
    MantenimientoComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule, 
    NgxSpinnerModule,
    SharedModule
  ],
  
})
export class PokemonModule { }
