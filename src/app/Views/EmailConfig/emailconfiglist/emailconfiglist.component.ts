import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../Services/app.service';
import { HttpHeaders } from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-emailconfiglist',
  templateUrl: './emailconfiglist.component.html',
  styleUrls: ['./emailconfiglist.component.css']
})
export class EmailconfiglistComponent implements OnInit {
  p: number = 1;
  searchText = '';
  dataSource: any;
  emailconfiglist:any=[];
  eform!: FormGroup;
  formSubmitted:boolean=false;
  mode:any='insert';
  cform!: FormGroup;
  selectedFile: File | null = null;


  constructor( private apiservice:ApiService,private toast:ToastrService,  private fb:FormBuilder,private appservice: AppService,
    private router:Router) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getemailconfigurationlist();
    this.eform=this.fb.group({
      guid_EmailTemplateid:[''],
      userId:[localStorage.userid]
     
    
          });
  }

  getemailconfigurationlist(){
    this.apiservice.getapi('EmailTemplate/GetAllEmailTemplate').subscribe(resp=>{
      if(resp.status){
this.emailconfiglist=resp.emailTemplateDatas;

      }});

  }


  delete(id:any){
    this.eform.get("guid_EmailTemplateid")?.setValue(id);
    this.eform.get("userId")?.setValue(localStorage.userid);
    this.apiservice.postapi('EmailTemplate/Deleteemailtemplate',this.eform.value).subscribe(resp=>{
      if(resp.status)
      {
        this.getemailconfigurationlist();
       
       this.toast.success(resp.message);

      }
    })
  }
}
