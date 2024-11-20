import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { ProductlistComponent } from '../productlist/productlist.component';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ProductsearchfilterPipe } from 'src/app/Services/Pipe/productsearchfilter.pipe';
import { ProductimageComponent } from '../productimage/productimage.component';
import {UiSwitchModule} from 'ngx-ui-switch';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@NgModule({
  declarations: [
    ProductlistComponent,
    AddproductComponent,
    ProductsearchfilterPipe,
    ProductimageComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    NgxPaginationModule,
    MatSlideToggleModule,   
    UiSwitchModule.forRoot({
      size: 'small',
      color: 'rgb(0, 189, 99)',
      switchColor: '#80FFA2',
      defaultBgColor: '#00ACFF',
      defaultBoColor : '#476EFF',
      checkedLabel: 'on',
      uncheckedLabel: 'off'
    }),
  ]
})
export class ProductModule { }
