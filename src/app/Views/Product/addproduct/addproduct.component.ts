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
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  p: number = 1;
  searchText = '';
  dataSource: any;
  categorylist:any=[];
  categorylst:any=[];
  subcategorylist:any=[];
  brandlist:any=[];
  unitlist:any=[];
  guid:any;
  formSubmitted:boolean=false;
  mode:any='insert';
  pform!: FormGroup;
  selectedFile: File | null = null;
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
    private router:Router
    ,private activrouter: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getcategorybind();
   this.getunitlist();
    this.getbrandlist();
    this.pform=this.fb.group({
      guid_ProductId:[''],
      guid_CategoryId:[''],
      userId:[localStorage.userid],
      guid_SubCategoryId:[''],
      guid_SubSubCategoryId:[''],
      guid_UnitId:[''],
      is_Organic:[''],
      discountType:[''],
      productName:['',Validators.required],
      short_Description:[''],
      full_Description:[''],
      guid_BrandId:[''],
      thumbnail_Image_Url:[''],
      available_Stock:[''],
      maxPurchaseQty:[''],
      price:[''],
      tag:[''],
      is_InSale:[false],
      discount:['']
          });
          this.guid = this.activrouter.snapshot.queryParamMap.get('guid');
          if(this.guid != null)
               this.getproductdata(this.guid); 
  }

  getproductdata(guid:any){
    this.apiservice.postapi('Product/GetProductbyId?Guid_Productid='+guid).subscribe(resp=>{
      if(resp.status){
        this.getsubcategory(resp.productDatas[0].guid_CategoryId);
        this.pform.patchValue({
          guid_ProductId:resp.productDatas[0].guid_ProductId,
          guid_CategoryId:resp.productDatas[0].guid_CategoryId,
      userId:localStorage.userid,
      guid_SubCategoryId:resp.productDatas[0].guid_SubCategoryId,
      guid_SubSubCategoryId:resp.productDatas[0].guid_SubSubCategoryId,
      productName: resp.productDatas[0].productName,
      short_Description:resp.productDatas[0].short_Description,
      full_Description:resp.productDatas[0].full_Description,
      guid_BrandId:resp.productDatas[0].guid_BrandId,
      thumbnail_Image_Url:resp.productDatas[0].thumbnail_Image_Url,
      available_Stock:resp.productDatas[0].available_Stock,
      price:resp.productDatas[0].price,
      is_InSale:false,
      discount:resp.productDatas[0].discount,
      discountType:resp.productDatas[0].discountType,
      guid_UnitId:resp.productDatas[0].guid_UnitId,
      is_Organic:resp.productDatas[0].is_Organic,
      tag:resp.productDatas[0].tag,
      maxPurchaseQty:resp.productDatas[0].maxPurchaseQty
        })

      //  this.getsubcategorylist(resp.productDatas[0].guid_CategoryId);
      }});
     
      this.mode='edit';

  }

  fileProgress(fileInput: any){

    this.selectedFile=fileInput.target.files[0];
   
    }
  getcategorybind(){
    this.apiservice.getapi('Category/categorylist').subscribe(resp=>{
      this.categorylst=resp.categoryDatas;
    
             
    });
  
  }

  getsubcategory(id:any){
    this.apiservice.postapi('Category/Getsubcategorylist?guidcategoryid='+id).subscribe(resp=>{
      this.subcategorylist=resp.categoryDatas;
    
             
    });
  }

  getsubcategorylist(id:any){
    this.apiservice.postapi('Category/Getsubcategorylist?guidcategoryid='+id.target.value).subscribe(resp=>{
      this.subcategorylist=resp.categoryDatas;
    
             
    });
  
  }
  getbrandlist(){
    this.apiservice.getapi('Brand/GetAllBrands').subscribe(resp=>{
      this.brandlist=resp.brands;
    
             
    });
  
  }

  getunitlist(){
    this.apiservice.getapi('Unit/GetAllUnits').subscribe(resp=>{
      this.unitlist=resp.unitdata;
    
             
    });
  
  }
  uploadImage(id : any){
   
    if(this.selectedFile!=null){
      const formData = new FormData();
      formData.append('file', this.selectedFile);

     
    

      this.apiservice.postapi('Product/UploadproductImage?guidproductid='+id, formData).subscribe((resp) => {
            
      });
    }
  }
  addproduct(){

    this.formSubmitted=true;
    if(this.pform.valid && this.formSubmitted){
   
    if(this.mode=='insert')
    {
      this.apiservice.postapi('Product/Addnewproduct',this.pform.value).subscribe(resp=>{
        if(resp.status){

          this.uploadImage(resp.guid);
          this.toast.success(resp.message);
          this.router.navigate(['/product/productlist']);
      this.pform.reset();
      this.formSubmitted=false;
        
           this.selectedFile=null;
        }
        else{
          this.toast.error(resp.message);
        }
      });

    }
    else{
      this.apiservice.postapi('Product/Updateproduct',this.pform.value).subscribe(resp=>{
        if(resp.status){
          this.uploadImage(resp.guid);
          this.toast.success(resp.message);
          this.router.navigate(['/product/productlist']);
      this.pform.reset();
      this.formSubmitted=false;
          
           this.mode='insert';
          
           this.selectedFile=null;
        }
        else{
          this.toast.error(resp.message);
        }
      });
    }

   }
  }
}
