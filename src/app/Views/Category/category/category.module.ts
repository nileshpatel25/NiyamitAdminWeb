import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryRoutingModule } from './category-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { CategorylistComponent } from '../categorylist/categorylist.component';
import { CategorysearchfilterPipe } from 'src/app/Services/Pipe/categorysearchfilter.pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@NgModule({
  declarations: [
    CategorylistComponent,
    CategorysearchfilterPipe
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSlideToggleModule
  ]
})
export class CategoryModule { }
