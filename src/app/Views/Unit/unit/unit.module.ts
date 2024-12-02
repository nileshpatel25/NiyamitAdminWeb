

import { UnitRoutingModule } from './unit-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {NgxPaginationModule} from 'ngx-pagination';
import { UnitlistComponent } from '../unitlist/unitlist.component';
import { SearchFilterPipe } from 'src/app/Services/Pipe/search-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UnitlistComponent,
    SearchFilterPipe
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
