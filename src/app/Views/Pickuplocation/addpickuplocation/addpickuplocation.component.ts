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
  selector: 'app-addpickuplocation',
  templateUrl: './addpickuplocation.component.html',
  styleUrls: ['./addpickuplocation.component.css']
})
export class AddpickuplocationComponent implements OnInit {
  formSubmitted:boolean=false;
  mode:any='insert';
  eform!: FormGroup;
  guid:any;
  constructor( private apiservice:ApiService,private toast:ToastrService,  private fb:FormBuilder,private appservice: AppService,
    private router:Router, private activrouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.eform=this.fb.group({
      guid_PickupLocationId:['0'],
      userid:[localStorage.userid],
      cityName:[''],
      contactName:['',Validators.required],
      contactNumber:['',Validators.required],
      contactNumber2:['',Validators.required],
      guid_VendorId: [localStorage.userid],
      address1:['',Validators.required],
      address2:[''],
      city:['',Validators.required],
      state:['',Validators.required],
      zipcode:['',Validators.required],
      country:['USA'],
      latitude:0,
      longitude:0
    
          });
          this.guid = this.activrouter.snapshot.queryParamMap.get('guid');
          if(this.guid != null)
               this.getpickuplocationdata(this.guid);    
      
  }

  getpickuplocationdata(id:any){
    this.apiservice.postapi('PickupLocation/GetpickuplocationbyId?guidpickuplocation='+id).subscribe(resp=>{
      if(resp.status){
        this.eform.patchValue({
          guid_PickupLocationId:resp.pickuplocationDatas[0].guidPickupLocationId,
          userId:localStorage.userid,
          contactName:resp.pickuplocationDatas[0].contactName,
          contactNumber:resp.pickuplocationDatas[0].contactNumber,
          contactNumber2:resp.pickuplocationDatas[0].contactNumber2,
          address1:resp.pickuplocationDatas[0].address1,
          address2:resp.pickuplocationDatas[0].address2,
          city:resp.pickuplocationDatas[0].city,
          state:resp.pickuplocationDatas[0].state,
          zipcode:resp.pickuplocationDatas[0].zipCode,
     })

      }});
      this.mode='edit';

  }

  addpickuplocation()
  {
    
    this.formSubmitted=true;
    if(this.eform.valid && this.formSubmitted){
   
    if(this.mode=='insert')
    {
      this.apiservice.postapi('PickupLocation/AddNewPickuplocation',this.eform.value).subscribe(resp=>{
        if(resp.status){

          this.router.navigate(['/pickuplocation/pickuplocationlist']);
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
      this.apiservice.postapi('PickupLocation/Updatepickuplocation',this.eform.value).subscribe(resp=>{
        if(resp.status){
          this.router.navigate(['/pickuplocation/pickuplocationlist']);
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
