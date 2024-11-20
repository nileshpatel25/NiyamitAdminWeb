import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../Services/app.service';
import { HttpHeaders } from '@angular/common/http';
import { Router ,ActivatedRoute} from '@angular/router';

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-gallaryimage',
  templateUrl: './gallaryimage.component.html',
  styleUrls: ['./gallaryimage.component.css']
})
export class GallaryimageComponent implements OnInit {
  name:any;
  isReadonly = true;
  pform!: FormGroup;
  gallaryimagelist:any=[];
  selectedFile: File | null = null;


  constructor(private apiservice:ApiService,private toast:ToastrService,  private fb:FormBuilder,private appservice: AppService,
    private router:Router,private activrouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getimagename();
    this.getgallaryimagelist();
    this.pform=this.fb.group({
      Guid_Gallaryid:[this.activrouter.snapshot.queryParamMap.get('guid')],
      Is_Primary:[true],
      UserId:[localStorage.userid]
    });

  }

  fileProgress(fileInput: any)
    {
       this.selectedFile=fileInput.target.files[0];
    }

    getimagename(){
      this.apiservice.postapi('Gallary/GetGallarybyid?GiudGallaryid='+this.activrouter.snapshot.queryParamMap.get('guid')).subscribe(resp=>{
        this.name=resp.gallaryDatas[0].name;
      })
     }

     getgallaryimagelist(){
      this.apiservice.postapi('GallaryImage/GetGallaryImagebyId?guidGallaryId='+this.activrouter.snapshot.queryParamMap.get('guid')).subscribe(resp=>{
        this.gallaryimagelist=resp.gallaryImageDatas;
      })
     }

     uploadImage(){
   
      if(this.selectedFile!=null){
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        this.apiservice.postapi('GallaryImage/AddGallaryImage?guidGallaryId='+this.activrouter.snapshot.queryParamMap.get('guid'),formData).subscribe((resp) => {
          this.toast.success(resp.message);
          this.getgallaryimagelist();
        });
      }
    }

}
