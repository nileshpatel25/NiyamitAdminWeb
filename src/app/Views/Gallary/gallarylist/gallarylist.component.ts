import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../Services/app.service';
import {ApiService} from '../../../Services/api.service';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-gallarylist',
  templateUrl: './gallarylist.component.html',
  styleUrls: ['./gallarylist.component.css']
})
export class GallarylistComponent implements OnInit {

  gallarylist:any=[];
  gform!: FormGroup;
  formSubmitted:boolean=false;
  mode:any='insert';
  p: number = 1;

  constructor( private apiservice:ApiService,  private fb:FormBuilder,private appservice: AppService,
    private router:Router,private toast:ToastrService) { }


  ngOnInit(): void {
              this.appservice.checktoken();
              this.getgallarylist();
          this.gform=this.fb.group({
            userId:[localStorage.userid],
            name:['',Validators.required],
            guidGallaryId:['']
          });
    
  }

  addgallary(){
    this.formSubmitted=true;
    if(this.gform.valid && this.formSubmitted){
      if(this.mode=='insert'){
        this,this.apiservice.postapi('Gallary/AddNewGallary',this.gform.value).subscribe(resp=>{
          if(resp.status){
            this.toast.success(resp.message);
            this.gform.reset();
            this.formSubmitted=false;
            this.getgallarylist();
          }else{
            this.toast.error(resp.message);
          }
        });
      }else{
        this.apiservice.postapi('Gallary/UpdateGallary',this.gform.value).subscribe(resp=>{
          if(resp.status){
            this.toast.success(resp.message);
            this.gform.reset();
            this.formSubmitted=false;
            this.getgallarylist();
            this.mode='insert';
          }else{
            this.toast.error(resp.message);
          }
        });
      }
    }

  }

  edit(id:string){
    const gallary=this.gallarylist.filter((resp: any)=>{
      return resp.guidGallaryId==id;
    });
    this.gform.patchValue({
      name:gallary[0].name,
      guidGallaryId:id,
      userId:localStorage.userId
    });
    this.mode='edit';
  }

  delete(id:string){
    const gallary=this.gallarylist.filter((resp:any)=>{
      return resp.guidGallaryId===id;
    });
    this.gform.get("guidGallaryId")?.setValue(id);
    this.gform.get("userId")?.setValue(localStorage.userId);
    this.apiservice.postapi('Gallary/DeleteGallary',this.gform.value).subscribe(resp=>{
      if(resp.status){
        this.getgallarylist();
        this.toast.success(resp.message);
      }
    })
  }
  pageChanged(event: any): void {
    // this.apiService.getData(url?page=event);
    }
  getgallarylist(){
    this.apiservice.getapi('Gallary/GetAllGallaryList').subscribe(resp =>{
      if(resp.status){
        this.gallarylist=resp.gallaryDatas;
      }});
  }

}
