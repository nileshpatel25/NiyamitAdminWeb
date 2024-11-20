import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../Services/app.service';
import { HttpHeaders } from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-pickuplocationlist',
  templateUrl: './pickuplocationlist.component.html',
  styleUrls: ['./pickuplocationlist.component.css']
})
export class PickuplocationlistComponent implements OnInit {

 
  p: number = 1;
  searchText = '';
  dataSource: any;
  pickuplocationlist:any=[];
  eform!: FormGroup;
  formSubmitted:boolean=false;
  mode:any='insert';
  cform!: FormGroup;
  selectedFile: File | null = null;


  constructor( private apiservice:ApiService,private toast:ToastrService,  private fb:FormBuilder,private appservice: AppService,
    private router:Router) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getpickuplocationlist();
    this.eform=this.fb.group({
      guid_Wholesellerid:[''],
      userId:[localStorage.userid]
     
    
          });
  }

  getpickuplocationlist(){
    this.apiservice.getapi('PickupLocation/GetAllPickuplocationList').subscribe(resp=>{
      if(resp.status){
this.pickuplocationlist=resp.pickuplocationDatas;

      }});

  }


  delete(id:any){
    this.eform.get("guid_PickupLocationId")?.setValue(id);
    this.eform.get("userId")?.setValue(localStorage.userid);
    this.apiservice.postapi('PickupLocation/Deletepickuplocation',this.eform.value).subscribe(resp=>{
      if(resp.status)
      {
        this.getpickuplocationlist();
       
       this.toast.success(resp.message);

      }
    })
  }
}

