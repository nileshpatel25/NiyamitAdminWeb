

import { UnitRoutingModule } from './unit-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {NgxPaginationModule} from 'ngx-pagination';
import { UnitlistComponent } from '../unitlist/unitlist.component';
import { UnitsearchfilterPipe } from 'src/app/Services/Pipe/unitsearchfilter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UnitlistComponent,
    UnitsearchfilterPipe
  ],
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    UnitRoutingModule,
    NgxPaginationModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class UnitModule { }
