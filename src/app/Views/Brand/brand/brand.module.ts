import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrandRoutingModule } from './brand-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrandlistComponent } from '../brandlist/brandlist.component';
import { SearchFilterPipe } from 'src/app/Services/Pipe/search-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BrandlistComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    BrandRoutingModule,
    NgxPaginationModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BrandModule { }
