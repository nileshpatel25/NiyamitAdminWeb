import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../Services/app.service';
import { HttpHeaders } from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  p: number = 1;
  searchText = '';
  dataSource: any;
  orderlist: any = [];
  eform!: FormGroup;
  formSubmitted: boolean = false;
  mode: any = 'insert';
  cform!: FormGroup;
  selectedFile: File | null = null;
  constructor(private apiservice: ApiService, private toast: ToastrService, private fb: FormBuilder, private appservice: AppService,
    private router: Router) { }
  ngOnInit(): void {
    this.appservice.checktoken();
    this.getallorderlist();
    this.eform = this.fb.group({
      guid_EmailTemplateid: [''],
      userId: [localStorage.userid]
    });
  }
  getallorderlist() {
    this.apiservice.getapi('Order/GetAllOrders').subscribe(resp => {
      if (resp.status) {
        this.orderlist = resp.orderdatas;
        console.log('O_List: ',this.orderlist);
      }
    });
  }
  view(c: any) {
  }
  print(c: any) {
  }
  pickupStatus(id: any){   
    this.apiservice.postapi('Order/UpdatePickupstatus?guidorderid=' + id).subscribe(resp => {
      if (resp.status) {
        this.getallorderlist();
        this.toast.success(resp.message);
      }
    })
  }
  returnStatus(id: any){   
    this.apiservice.postapi('Order/Updatereturnstatus?guidorderid=' + id).subscribe(resp => {
      if (resp.status) {
        this.getallorderlist();
        this.toast.success(resp.message);
      }
    })
  }
  cancelStatus(id: any){    
    this.apiservice.postapi('Order/Updatecancelstatus?guidorderid=' + id).subscribe(resp => {
      if (resp.status) {
        this.getallorderlist();
        this.toast.success(resp.message);
      }
    })
  }
  updateStatus(id: any){   
    this.apiservice.postapi('Order/Updateorderstatus?guidorderid=' + id).subscribe(resp => {
      if (resp.status) {
        this.getallorderlist();
        this.toast.success(resp.message);
      }
    })
  }
}
