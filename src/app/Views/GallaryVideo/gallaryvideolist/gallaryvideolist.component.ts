import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../Services/app.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
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
  constructor(private apiservice: ApiService, private toast: ToastrService, private http: HttpClient, private fb: FormBuilder, private appservice: AppService,
    private router: Router) { }
  ngOnInit(): void {
    this.appservice.checktoken();
    this.getvideourllist();
    this.getGallarybind();
    this.cform = this.fb.group({
      guidGallaryvideoid: ['0'],
      userid: [localStorage.userid],
      guidVendorId: [localStorage.userid],
      guidGallaryid: ['', Validators.required],
      videourl: ['', Validators.required],
      isPrimery: [false],
      description:['']
    });
  }
  fileProgress(fileInput: any) {
    this.selectedFile = fileInput.target.files[0];
  }
  getGallarybind() {
    this.apiservice.getapi('Gallary/GetAllGallaryList?Guid_VendorId='+localStorage.userid).subscribe(resp => {
      this.gallarylst = resp.gallaryDatas;
    });
  }
  getvideourllist() {
    this.apiservice.getapi('GallaryVideo/GetAllGallaryVideoList?Guid_VendorId='+localStorage.userid).subscribe(resp => {
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
      return resp.guidGalleryVideoId === id;
    });
    this.cform.patchValue({
      guidGallaryvideoid: videourl[0].guidGalleryVideoId,
      guidGallaryid: videourl[0].guidGalleryId,
      guidVendorId:videourl[0].guidVendorId,
      videourl: videourl[0].videoUrl,
      isPrimery: videourl[0].isPrimary,
      userid: localStorage.userid,
      description: videourl[0].description
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
