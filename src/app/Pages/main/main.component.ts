import { Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ApiService} from '../../Services/api.service';
import { AppService } from '../../Services/app.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  name:any;
  public sidebarMenuOpened = true;
  currantYear: number = new Date().getFullYear();
  constructor(private renderer: Renderer2,
    private apiservice:ApiService, public appservice:AppService
    ) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getuserinfo();
    // this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
    // this.renderer.removeClass(
    //   document.querySelector('app-root'),
    //   'register-page'
    // );
  }

  mainSidebarHeight(height:any) {
    // this.renderer.setStyle(
    //   this.contentWrapper.nativeElement,
    //   'min-height',
    //   height - 114 + 'px'
    // );
  }
getuserinfo(){
  this.apiservice
  .postapi('Account/GetUserInfo?userid=' + localStorage.userid)
  .subscribe((resp) => {
    if (resp) {
      this.name=resp.firstName + resp.lastName;
    }
  });
  
  
}
logout()
{
  this.appservice.logout();
}
  toggleMenuSidebar() {
    console.log('sidebarMenuCollapsed', this.sidebarMenuOpened);
    if (this.sidebarMenuOpened) {
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'sidebar-open'
      );
      this.renderer.addClass(
        document.querySelector('app-root'),
        'sidebar-collapse'
      );
      this.sidebarMenuOpened = false;
    } else {
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'sidebar-collapse'
      );
      this.renderer.addClass(
        document.querySelector('app-root'),
        'sidebar-open'
      );
      this.sidebarMenuOpened = true;
    }
  }


}
