import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../Services/app.service';
import { HttpHeaders } from '@angular/common/http';

import { AngularEditorConfig } from '@kolkov/angular-editor';
// import { NgxSpinnerService } from "ngx-spinner";
import { Router ,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-productimage',
  templateUrl: './productimage.component.html',
  styleUrls: ['./productimage.component.css']
})
export class ProductimageComponent implements OnInit {
  name:any;
  isReadonly = true;
  pform!: FormGroup;
  productimagelist:any=[];
  selectedFile: File | null = null;
  constructor( private apiservice:ApiService,private toast:ToastrService,  private fb:FormBuilder,private appservice: AppService,
    private router:Router
    ,private activrouter: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getproductname();
    this.getproductimagelist();
    this.pform=this.fb.group({
      guid_ProductImageId:[''],     
      userId:[localStorage.userid]
    });
  }

  fileProgress(fileInput: any){

    this.selectedFile=fileInput.target.files[0];
   
    }
    uploadImage(){
   
      if(this.selectedFile!=null){
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        this.apiservice.postapi('Productimage/Addproductimage?productguid_id='+this.activrouter.snapshot.queryParamMap.get('guid'),formData).subscribe((resp) => {
          this.toast.success(resp.message);
          this.getproductimagelist();
        });
      }
    }
  getproductname(){
    this.apiservice.postapi('Product/GetProductbyId?Guid_Productid='+this.activrouter.snapshot.queryParamMap.get('guid')).subscribe(resp=>{
      this.name=resp.productDatas[0].productName;
    })
   }

   getproductimagelist(){
    this.apiservice.postapi('Productimage/GetallImagesbyProductId?guidproductid='+this.activrouter.snapshot.queryParamMap.get('guid')).subscribe(resp=>{
      this.productimagelist=resp.productimagedatas;
    })
   }
   delete(id:string)
   {
     console.log(id);
     const brand=this.productimagelist.filter((resp: any)=>{
       return resp.guidProductImageId===id;
     });
     this.pform.get("guid_ProductImageId")?.setValue(id);
     this.pform.get("userId")?.setValue(localStorage.userid);

    

     this.apiservice.postapi('Productimage/Deleteproductimage',this.pform.value).subscribe(resp=>{
       if(resp.status)
       {
         this.getproductimagelist();
         this.toast.success(resp.message);
       }
     })
   }
  }
