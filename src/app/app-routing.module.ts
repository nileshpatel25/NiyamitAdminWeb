import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './Pages/main/main.component';
import { VendorComponent } from './Views/Vendor/vendor/vendor.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'Dashboard', component: DashboardComponent },
      {
        path: 'brand', loadChildren: () => import('./Views/Brand/brand/brand.module')
          .then(mode => mode.BrandModule)
      },      
      {
        path: 'vendor',component:VendorComponent
      },
      {
        path: 'category', loadChildren: () => import('./Views/Category/category/category.module')
          .then(mode => mode.CategoryModule)
      },
      {
        path: 'emailconfig', loadChildren: () => import('./Views/EmailConfig/emailconfig/emailconfig.module')
          .then(mode => mode.EmailconfigModule)
      },
      {
        path: 'smsconfig', loadChildren: () => import('./Views/SMSConfig/smsconfig/smsconfig.module')
          .then(mode => mode.SmsconfigModule)
      },
      {
        path: 'wholeseller', loadChildren: () => import('./Views/Wholeseller/wholeseller/wholeseller.module')
          .then(mode => mode.WholesellerModule)
      },
      {
        path: 'contactus', loadChildren: () => import('./Views/ContactUs/contactus/contactus.module')
          .then(mode => mode.ContactusModule)
      },
      {
        path: 'product', loadChildren: () => import('./Views/Product/product/product.module')
          .then(mode => mode.ProductModule)
      },
      {
        path: 'order', loadChildren: () => import('./Views/Order/order/order.module')
          .then(mode => mode.OrderModule)
      },
      {
        path: 'pickuplocation', loadChildren: () => import('./Views/Pickuplocation/pickuplocation/pickuplocation.module')
          .then(mode => mode.PickuplocationModule)
      },
      {
        path: 'gallary', loadChildren: () => import('./Views/Gallary/gallary/gallary.module')
          .then(mod => mod.GallaryModule)
      },
      {
        path: 'gallaryvideo', loadChildren: () => import('./Views/GallaryVideo/gallaryvideo/gallaryvideo.module')
          .then(mod => mod.GallaryvideoModule)
      },
      {
        path: 'influencer', loadChildren: () => import('./Views/Influencer/influencer/influencer.module')
          .then(mod => mod.InfluencerModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
