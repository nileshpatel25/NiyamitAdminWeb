import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../Services/app.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gallaryvideolist',
  templateUrl: './gallaryvideolist.component.html',
  styleUrls: ['./gallaryvideolist.component.css']
})
export class GallaryvideolistComponent implements OnInit {
  p: number = 1;
  searchText = '';
  dataSource: any;
  videourllist: any = [];
  gallarylst: any = [];
  formSubmitted: boolean = false;
  mode: any = 'insert';
  cform!: FormGroup;
  selectedFile: File | null = null;
  constructor(private apiservice: ApiService, private toast: ToastrService, private http: HttpClient, private fb: FormBuilder, private appservice: AppService,
    private router: Router) { }
  ngOnInit(): void {
    this.appservice.checktoken();
    this.getvideourllist();
    this.getGallarybind();
    this.cform = this.fb.group({
      guidGallaryvideoid: [''],
      userId: [localStorage.userid],
      guidGallaryid: ['', Validators.required],
      videourl: ['', Validators.required],
      isPrimery: [false]
    });
  }
  fileProgress(fileInput: any) {
    this.selectedFile = fileInput.target.files[0];
  }
  getGallarybind() {
    this.apiservice.getapi('Gallary/GetAllGallaryList').subscribe(resp => {
      this.gallarylst = resp.gallaryDatas;
    });
  }
  getvideourllist() {
    this.apiservice.getapi('GallaryVideo/GetAllGallaryVideoList').subscribe(resp => {
      this.videourllist = resp.gallaryVideoDatas;
      console.log("V_List",this.videourllist);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    return (this.dataSource.filter = filterValue.trim().toLowerCase());
  }
  pageChanged(event: any): void {
    // this.apiService.getData(url?page=event);
  }
  addvideourl() {
    this.formSubmitted = true;
    if (this.cform.valid && this.formSubmitted) {
      if (this.mode == 'insert') {
        this.apiservice.postapi('GallaryVideo/AddNewGallaryVideo', this.cform.value).subscribe(resp => {
          if (resp.status) {
            this.toast.success(resp.message);
            this.cform.reset();
            this.formSubmitted = false;
            this.getGallarybind();
            this.getvideourllist();
            this.selectedFile = null;
          }
          else {
            this.toast.error(resp.message);
          }
        });
      }
      else {
        this.apiservice.postapi('GallaryVideo/UpdateGallaryVideo', this.cform.value).subscribe(resp => {
          if (resp.status) {
            this.toast.success(resp.message);
            this.cform.reset();
            this.formSubmitted = false;
            this.getGallarybind();
            this.mode = 'insert';
            this.getvideourllist();
            this.selectedFile = null;
          }
          else {
            this.toast.error(resp.message);
          }
        });
      }
    }
  }

  edit(id: string) {
    const videourl = this.videourllist.filter((resp: any) => {
      return resp.guidGallaryvideoid === id;
    });
    this.cform.patchValue({
      guidGallaryvideoid: videourl[0].guidGallaryvideoid,
      guidGallaryid: videourl[0].guidGallaryid,
      videourl: videourl[0].videourl,
      isPrimery: videourl[0].isPrimery
    });
    this.mode = 'edit';
  }
  delete(id: string) {
    this.cform.get("guidGallaryvideoid")?.setValue(id);
    this.cform.get("userId")?.setValue(localStorage.id);
    this.apiservice.postapi('GallaryVideo/DeleteGallaryVideo', this.cform.value).subscribe(resp => {
      if (resp.status) {
        this.getGallarybind();
        this.getvideourllist();
        this.toast.success(resp.message);
      }
    })
  }
}
