import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderlistComponent } from '../orderlist/orderlist.component';
import { OrdersearchfilterPipe } from 'src/app/Services/Pipe/ordersearchfilter.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmailconfigsearchfilterPipe } from 'src/app/Services/Pipe/emailconfigsearchfilter.pipe';
import { AngularEditorModule } from '@kolkov/angular-editor';

import {NgxPaginationModule} from 'ngx-pagination';
import { OrderviewComponent } from '../orderview/orderview.component';

@NgModule({
  declarations: [
    OrderlistComponent,
    OrderviewComponent,
    OrdersearchfilterPipe
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    NgxPaginationModule,
  
    
    NgxPaginationModule
  ]
})
export class OrderModule { }
