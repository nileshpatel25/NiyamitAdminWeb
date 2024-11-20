import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailconfigRoutingModule } from './emailconfig-routing.module';
import { EmailconfiglistComponent } from '../emailconfiglist/emailconfiglist.component';
import { AddemailconfigComponent } from '../addemailconfig/addemailconfig.component';
import { EmailconfigsearchfilterPipe } from 'src/app/Services/Pipe/emailconfigsearchfilter.pipe';
import { AngularEditorModule } from '@kolkov/angular-editor';

import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
    EmailconfiglistComponent,
    AddemailconfigComponent,
    EmailconfigsearchfilterPipe
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    NgxPaginationModule,
    CommonModule,
    EmailconfigRoutingModule,
    NgxPaginationModule
  ]
})
export class EmailconfigModule { }
