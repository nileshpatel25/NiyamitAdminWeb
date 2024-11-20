import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../Services/app.service';
import { HttpHeaders } from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  p: number = 1;
  itemcount: any;
  ordercount: any;
  customercount: any;
  pickuplocationcount: any;
  wholesellerlist: any;
  contactuslist: any;
  orderlist: any = [];
  constructor(private apiservice: ApiService, private toast: ToastrService, private fb: FormBuilder, private appservice: AppService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkLogin();
    this.appservice.checktoken();
  //  this.getitemcount();
  //  this.getallordercount();
  //  this.getusercount();
   // this.getallorderlist();
   // this.getpickuplocationcount();
   // this.getcontactlist();
   // this.getwholesellerlist();
  }
  checkLogin()
  {
    const userId = localStorage.getItem('userid');
    if (userId) {
        // User ID exists, proceed to load user data or display it
        console.log('User ID:', userId);     
    } else {
        // User ID does not exist, redirect to login or display an error
        window.location.href = '/login'; // or show a login prompt
    }
  }

  // getallorderlist() {
  //   this.apiservice.getapi('Order/GetAllOrders').subscribe(resp => {
  //     if (resp.status) {
  //       this.orderlist = resp.orderdatas;
  //       const confirmorderlist = this.orderlist.filter((resp: any) => {
  //         return resp.status === 'confirm';
  //       });

  //     }
  //   });

  // }
  // getitemcount() {
  //   this.apiservice.getapi('Product/GetAllProduct').subscribe(resp => {
  //     if (resp.status) {
  //       this.itemcount = resp.productDatas.length;

  //     }
  //   });
  // }
  // getwholesellerlist() {
  //   this.apiservice.getapi('WholeSeller/GetAllWholeseller').subscribe(resp => {
  //     if (resp.status) {
  //       this.wholesellerlist = resp.wholesellerDatas;
  //     }
  //   });

  // }
  // getcontactlist() {
  //   this.apiservice.getapi('ContactUs/GetAllContactUsList').subscribe(resp => {
  //     if (resp.status) {
  //       this.contactuslist = resp.contactUsDatas;

  //     }
  //   });

  // }
  // getusercount() {
  //   this.apiservice.getapi('Account/GetAllUser').subscribe(resp => {
  //     if (resp.status) {
  //       this.customercount = resp.userDatas.length;

  //     }
  //   });
  // }
  // getpickuplocationcount() {
  //   this.apiservice.getapi('PickupLocation/GetAllPickuplocationList').subscribe(resp => {
  //     if (resp.status) {
  //       this.pickuplocationcount = resp.pickuplocationDatas.length;

  //     }
  //   });

  // }
  // getallordercount() {
  //   this.apiservice.getapi('Order/GetAllOrders').subscribe(resp => {
  //     if (resp.status) {
  //       this.ordercount = resp.orderdatas.length;

  //     }
  //   });

  // }

}
