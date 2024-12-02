import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../Services/app.service';
import { HttpHeaders } from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-unitlist',
  templateUrl: './unitlist.component.html',
  styleUrls: ['./unitlist.component.css']
})
export class UnitlistComponent implements OnInit {
  p: number = 1;
  searchText = '';
  dataSource: any;
  unitlist:any=[];
  
  formSubmitted:boolean=false;
  mode:any='insert';
  bform!: FormGroup;

  constructor( private apiservice:ApiService,private toast:ToastrService,  private fb:FormBuilder,private appservice: AppService,
    private router:Router) { }



  ngOnInit(): void {
    this.appservice.checktoken();
    this.getuntilist();
    this.bform=this.fb.group({
      userid:[localStorage.userid],    
      unitname:['',Validators.required],
      unitguid:['']
          });
  }
  getuntilist(){
    this.apiservice.getapi('Unit/GetAllUnits').subscribe(resp=>{
      if(resp.status){
this.unitlist=resp.unitdata;

      }});

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    return (this.dataSource.filter = filterValue.trim().toLowerCase());
  }
  pageChanged(event: any): void {
   // this.apiService.getData(url?page=event);
   }

   addunit(){
   
    this.formSubmitted=true;
    if(this.bform.valid && this.formSubmitted){
   
    if(this.mode=='insert')
    {
      this.apiservice.postapi('Unit/Addnewunit',this.bform.value).subscribe(resp=>{
        if(resp.status){
          this.toast.success(resp.message);
      this.bform.reset();
      this.formSubmitted=false;
           this.getuntilist();
        }
        else{
          this.toast.error(resp.message);
        }
      });

    }
    else{
      this.apiservice.postapi('Unit/Updateunit',this.bform.value).subscribe(resp=>{
        if(resp.status){
          this.toast.success(resp.message);
      this.bform.reset();
      this.formSubmitted=false;
           this.getuntilist();
           this.mode='insert';
        }
        else{
          this.toast.error(resp.message);
        }
      });
    }

   }
  }

  edit(id:string)
  {
    const brand=this.unitlist.filter((resp: any)=>{
      return resp.unitGuid===id;
    });
    this.bform.patchValue({
      unitname:brand[0].unitName,
      unitguid:id,
      userid:localStorage.userid
    });
   
    this.mode='edit';
  }

  delete(id:string)
  {
    console.log(id);
    const brand=this.unitlist.filter((resp: any)=>{
      return resp.guidBrandId===id;
    });
    this.bform.get("guidBrandId")?.setValue(id);
    this.bform.get("userId")?.setValue(localStorage.userid);
    this.apiservice.postapi('Brand/Deletebrand',this.bform.value).subscribe(resp=>{
      if(resp.status)
      {
        this.getuntilist();
       this.toast.success(resp.message);
      }
    })
  }
}
