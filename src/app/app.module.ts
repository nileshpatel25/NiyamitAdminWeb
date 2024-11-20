import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA} from '@angular/core';
import { MainComponent } from './Pages/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpserviceService } from './Services/httpservice.service';
import { ApiService } from './Services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { BrandModule } from './Views/Brand/brand/brand.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VendorComponent } from './Views/Vendor/vendor/vendor.component';

//import { MatSlideToggleModule } from '@angular/material/slide-toggle';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,   
    MainComponent, VendorComponent     
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,       
    BrowserAnimationsModule,       
    //MatSlideToggleModule,    
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar:true,
      progressAnimation:'increasing'
    })
  ],
  // exports: [
  //   MatSlideToggleModule
  // ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],
  providers: [
    HttpserviceService,
    ApiService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
