import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../Services/app.service';
import { HttpHeaders } from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-brandlist',
  templateUrl: './brandlist.component.html',
  styleUrls: ['./brandlist.component.css']
})
export class BrandlistComponent implements OnInit {
  p: number = 1;
  searchText = '';
  dataSource: any;
  brandlist:any=[];
  
  formSubmitted:boolean=false;
  mode:any='insert';
  bform!: FormGroup;

  constructor( private apiservice:ApiService,private toast:ToastrService,  private fb:FormBuilder,private appservice: AppService,
    private router:Router) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getbrandlist();
    this.bform=this.fb.group({
      userId:[localStorage.userid],
      brandName:['',Validators.required],
      guidBrandId:['']
          });
  }

  getbrandlist(){
    this.apiservice.getapi('Brand/GetAllBrands').subscribe(resp=>{
      if(resp.status){
this.brandlist=resp.brands;

      }});

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    return (this.dataSource.filter = filterValue.trim().toLowerCase());
  }
  pageChanged(event: any): void {
   // this.apiService.getData(url?page=event);
   }

   addbrand(){

    this.formSubmitted=true;
    if(this.bform.valid && this.formSubmitted){
   
    if(this.mode=='insert')
    {
      this.apiservice.postapi('Brand/Addnewbrand',this.bform.value).subscribe(resp=>{
        if(resp.status){
          this.toast.success(resp.message);
      this.bform.reset();
      this.formSubmitted=false;
           this.getbrandlist();
        }
        else{
          this.toast.error(resp.message);
        }
      });

    }
    else{
      this.apiservice.postapi('Brand/Updatebrand',this.bform.value).subscribe(resp=>{
        if(resp.status){
          this.toast.success(resp.message);
      this.bform.reset();
      this.formSubmitted=false;
           this.getbrandlist();
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
    const brand=this.brandlist.filter((resp: any)=>{
      return resp.guidBrandId===id;
    });
    this.bform.patchValue({
      brandName:brand[0].brandName,
      guidBrandId:id,
      userId:localStorage.userid
    });
   
    this.mode='edit';
  }

  delete(id:string)
  {
    console.log(id);
    const brand=this.brandlist.filter((resp: any)=>{
      return resp.guidBrandId===id;
    });
    this.bform.get("guidBrandId")?.setValue(id);
    this.bform.get("userId")?.setValue(localStorage.userid);
    this.apiservice.postapi('Brand/Deletebrand',this.bform.value).subscribe(resp=>{
      if(resp.status)
      {
        this.getbrandlist();
       this.toast.success(resp.message);
      }
    })
  }
}
