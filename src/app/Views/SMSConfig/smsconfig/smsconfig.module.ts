import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmsconfigRoutingModule } from './smsconfig-routing.module';
import {SmsconfiglistComponent} from '../smsconfiglist/smsconfiglist.component';
import { AddsmsconfigComponent } from '../addsmsconfig/addsmsconfig.component';
import { SmsconfigserchfilterPipe } from 'src/app/Services/Pipe/smsconfigserchfilter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularEditorModule } from '@kolkov/angular-editor';
@NgModule({
  declarations: [
  SmsconfiglistComponent,
  AddsmsconfigComponent,
  SmsconfigserchfilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    SmsconfigRoutingModule,
    AngularEditorModule
  ]
})
export class SmsconfigModule { }
