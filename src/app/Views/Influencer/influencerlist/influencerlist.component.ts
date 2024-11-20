import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Services/api.service';
import { AppService } from 'src/app/Services/app.service';

@Component({
  selector: 'app-influencerlist',
  templateUrl: './influencerlist.component.html',
  styleUrls: ['./influencerlist.component.css']
})
export class InfluencerlistComponent implements OnInit {
  p: number = 1;
  searchText = '';
  influcencerlist:any=[];  
  formSubmitted: boolean = false;
  iform!: FormGroup;
  constructor(private apiservice:ApiService,
    private toast:ToastrService,
    private appservice: AppService,
    private fb: FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getinflucencerlist();
    this.iform = this.fb.group({      
      userId: [localStorage.userid],      
      discountcode: ['', Validators.required],
      discount: ['', Validators.required],
      discountType: ['', Validators.required],
      maximumamount:['', Validators.required],
      minmumamount:['', Validators.required]
    });
  }
  getinflucencerlist()
  {
    this.apiservice.getapi('InfluencerDiscountCode/GetAllInfluencerdiscountcodeList').subscribe(resp => {
      if (resp.status) {
        this.influcencerlist = resp.influencerdiscountcodedatas;       
        console.log('I_List', this.influcencerlist);
      }
    });
  }
  addinflencer() {
    this.formSubmitted = true;    
    
  }
  edit(id:string)
  {
    // const brand=this.brandlist.filter((resp: any)=>{
    //   return resp.guidBrandId===id;
    // });
    // this.bform.patchValue({
    //   brandName:brand[0].brandName,
    //   guidBrandId:id,
    //   userId:localStorage.userid
    // });
   
    // this.mode='edit';
  }

  delete(id:string)
  {
    console.log(id);
    // const brand=this.brandlist.filter((resp: any)=>{
    //   return resp.guidBrandId===id;
    // });
    // this.bform.get("guidBrandId")?.setValue(id);
    // this.bform.get("userId")?.setValue(localStorage.userid);
    // this.apiservice.postapi('Brand/Deletebrand',this.bform.value).subscribe(resp=>{
    //   if(resp.status)
    //   {
    //     this.getbrandlist();
    //    this.toast.success(resp.message);
    //   }
    // })
  }

}
