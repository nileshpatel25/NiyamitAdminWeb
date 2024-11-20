import { Component, OnInit } from '@angular/core';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../Services/app.service';
import { HttpHeaders } from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-addsmsconfig',
  templateUrl: './addsmsconfig.component.html',
  styleUrls: ['./addsmsconfig.component.css']
})
export class AddsmsconfigComponent implements OnInit {

  formSubmitted:boolean=false;
  mode:any='insert';
  eform!: FormGroup;
  guid:any;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  constructor( private apiservice:ApiService,private toast:ToastrService,  private fb:FormBuilder,private appservice: AppService,
    private router:Router, private activrouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.eform=this.fb.group({
      guidSMSTemplateId:[''],
      userId:[localStorage.userid],
      name:['',Validators.required],
      code:['',Validators.required],
      subject:['',Validators.required],
      body:['',Validators.required]
    
          });
          this.guid = this.activrouter.snapshot.queryParamMap.get('guid');
          if(this.guid != null)
               this.getemailconfigdata(this.guid);    
      
  }

  getemailconfigdata(guid:any){
    this.apiservice.postapi('SmsTemplate/GetsmstemplatebyId?guidsmstemplateId='+guid).subscribe(resp=>{
      if(resp.status){
        this.eform.patchValue({
          guidSMSTemplateId:resp.smsTemplateDatas[0].guidSMSTemplateId,
          userId:localStorage.userid,
          name:resp.smsTemplateDatas[0].name,
          code:resp.smsTemplateDatas[0].code,
          subject:resp.smsTemplateDatas[0].subject,
          body:resp.smsTemplateDatas[0].body
        
        })

      }});
      this.mode='edit';

  }
  addemailconfig()
  {
    
    this.formSubmitted=true;
    if(this.eform.valid && this.formSubmitted){
   
    if(this.mode=='insert')
    {
      this.apiservice.postapi('SmsTemplate/addNewSmsTemplate',this.eform.value).subscribe(resp=>{
        if(resp.status){

          this.router.navigate(['/smsconfig/smsconfiglist']);
          this.toast.success(resp.message);
      this.eform.reset();
      this.formSubmitted=false;
        
        }
        else{
          this.toast.error(resp.message);
        }
      });

    }
    else{
      this.apiservice.postapi('SmsTemplate/UpdateSmsTemplate',this.eform.value).subscribe(resp=>{
        if(resp.status){
          this.router.navigate(['/smsconfig/smsconfiglist']);
          this.toast.success(resp.message);
      this.eform.reset();
      this.formSubmitted=false;
         
        }
        else{
          this.toast.error(resp.message);
        }
      });
    }

   }

  }

}
