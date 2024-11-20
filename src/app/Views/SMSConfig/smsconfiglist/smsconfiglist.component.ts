import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../Services/app.service';
import { HttpHeaders } from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-smsconfiglist',
  templateUrl: './smsconfiglist.component.html',
  styleUrls: ['./smsconfiglist.component.css']
})
export class SmsconfiglistComponent implements OnInit {
  p: number = 1;
  searchText = '';
  dataSource: any;
  smsconfiglist:any=[];
  eform!: FormGroup;
  formSubmitted:boolean=false;
  mode:any='insert';
  cform!: FormGroup;
  selectedFile: File | null = null;


  constructor( private apiservice:ApiService,private toast:ToastrService,  private fb:FormBuilder,private appservice: AppService,
    private router:Router) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getsmsconfigurationlist();
    this.eform=this.fb.group({
      guidSMSTemplateId:[''],
      userId:[localStorage.userid]    
    
          });
  }

  getsmsconfigurationlist(){
    this.apiservice.getapi('SmsTemplate/GetAllSmsTemplate').subscribe(resp=>{
      if(resp.status){
this.smsconfiglist=resp.smsTemplateDatas;

      }});

  }


  delete(id:any){
    this.eform.get("guidSMSTemplateId")?.setValue(id);
    this.eform.get("userId")?.setValue(localStorage.userid);
    this.apiservice.postapi('SmsTemplate/DeleteSmsTemplate',this.eform.value).subscribe(resp=>{
      if(resp.status)
      {
        this.getsmsconfigurationlist();
       
       this.toast.success(resp.message);

      }
    })
  }
}
