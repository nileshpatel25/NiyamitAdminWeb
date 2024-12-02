import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../Services/app.service';
import { HttpHeaders } from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-contactuslist',
  templateUrl: './contactuslist.component.html',
  styleUrls: ['./contactuslist.component.css']
})
export class ContactuslistComponent implements OnInit {
  p: number = 1;
  searchText = '';
  dataSource: any;
  contactuslist: any = [];
  eform!: FormGroup;
  formSubmitted: boolean = false;
  mode: any = 'insert';
  cform!: FormGroup;
  selectedFile: File | null = null;  
  constructor(private apiservice: ApiService, private toast: ToastrService, private fb: FormBuilder, private appservice: AppService,
    private router: Router) { }
  ngOnInit(): void {
    this.appservice.checktoken();
    this.getcontactlist();
  }
  getcontactlist() {
    this.apiservice.getapi('ContactUs/GetAllContactUsList?Guid_VendorId='+localStorage.userid).subscribe(resp => {
      if (resp.status) {
        this.contactuslist = resp.contactUsDatas;
        console.log('ContactUsList',this.contactuslist);
      }
    });
  }
  updateStatus(id:any){
    let resData = {
      guidContactusid:id,
      userId:localStorage.userid,
      status:""
    }    
    this.apiservice.postapi('ContactUs/UpdateContactusStatus',resData).subscribe(resp=>{
      if(resp.status)
      {
        this.getcontactlist();       
       this.toast.success(resp.message);
      }
    })
  }
  cancelStatus(id:any){
    let resData = {
      guidContactusid:id,
      userId:localStorage.userid,
      status:""
    }    
    this.apiservice.postapi('ContactUs/CancelContactusStatus',resData).subscribe(resp=>{
      if(resp.status)
      {
        this.getcontactlist();       
       this.toast.success(resp.message);
      }
    })
  }
}
