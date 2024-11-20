import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfluencerRoutingModule } from './influencer-routing.module';
import { InfluencerlistComponent } from '../influencerlist/influencerlist.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    InfluencerlistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InfluencerRoutingModule,
    NgxPaginationModule
  ]
})
export class InfluencerModule { }
