import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../Services/app.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {
  p: number = 1;
  searchText = '';
  dataSource: any;
  categorylist: any = [];
  categorylst: any = [];
  formSubmitted: boolean = false;
  mode: any = 'insert';
  cform!: FormGroup;
  selectedFile: File | null = null;
  filteredCategorytList: any[] = [];
  filterValue = '';
  constructor(private apiservice: ApiService, private toast: ToastrService, private http: HttpClient, private fb: FormBuilder, private appservice: AppService,
    private router: Router) { }
  ngOnInit(): void {
    this.appservice.checktoken();
    this.getcategorylist();
    this.getcategorybind();
    this.cform = this.fb.group({
      guid_CategoryId: [''],
      userId: [localStorage.userid],
      guid_SubCategoryId: [''],
      guid_SubSubCategoryId: [''],
      categoryName: ['', Validators.required],
      description: [''],
      categoryImg: [''],
      isPreorder: [false]
    });
  }
  fileProgress(fileInput: any) {
    this.selectedFile = fileInput.target.files[0];
  }
  getcategorybind() {
    this.apiservice.getapi('Category/categorylist').subscribe(resp => {
      this.categorylst = resp.categoryDatas;
      // this.categorylst = this.categorylst.filter((resp : any)=>{
      //   return resp.guid_SubCategoryId===null || resp.guid_SubCategoryId===null;
      //       });   
    });
  }
  getcategorylist() {
    this.apiservice.getapi('Category/GetAllCategoryforadmin').subscribe(resp => {
      if (resp.status) {
        this.categorylist = resp.categoryDatas;
        this.filteredCategorytList = resp.categoryDatas;
        console.log('C_List', this.categorylist);
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    return (this.dataSource.filter = filterValue.trim().toLowerCase());
  }
  pageChanged(event: any): void {
    // this.apiService.getData(url?page=event);
  }
  uploadImage(id: any) {
    if (this.selectedFile != null) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      const headers = new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      });
      let options = { headers: headers };
      this.apiservice.postapi('Category/UploadcategoryImage?categoryid=' + id, formData).subscribe((resp) => {
      });
    }
  }
  addcategory() {
    this.formSubmitted = true;
    if (this.cform.valid && this.formSubmitted) {
      if (this.mode == 'insert') {
        this.apiservice.postapi('Category/AddNewCategory', this.cform.value).subscribe(resp => {
          if (resp.status) {
            this.uploadImage(resp.guid);
            this.toast.success(resp.message);
            this.cform.reset();
            this.formSubmitted = false;
            this.getcategorylist();
            this.getcategorybind();
            this.selectedFile = null;
          }
          else {
            this.toast.error(resp.message);
          }
        });
      }
      else {
        this.apiservice.postapi('Category/UpdateCategory', this.cform.value).subscribe(resp => {
          if (resp.status) {
            this.uploadImage(resp.guid);
            this.toast.success(resp.message);
            this.cform.reset();
            this.formSubmitted = false;
            this.getcategorylist();
            this.mode = 'insert';
            this.getcategorybind();
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
    const category = this.categorylist.filter((resp: any) => {
      return resp.guid_CategoryId === id;
    });
    this.cform.patchValue({
      guid_CategoryId: category[0].guid_CategoryId,
      guid_SubCategoryId: category[0].guid_SubCategoryId,
      guid_SubSubCategoryId: category[0].guid_SubSubCategoryId,
      categoryName: category[0].categoryName,
      description: category[0].description,
      // categoryImg:category[0].categoryImg,
      isPreorder: category[0].isPreorder
    });
    this.mode = 'edit';
  }
  delete(id: string) {
    this.cform.get("guid_CategoryId")?.setValue(id);
    this.cform.get("userId")?.setValue(localStorage.id);
    this.apiservice.postapi('Category/DeleteCategory', this.cform.value).subscribe(resp => {
      if (resp.status) {
        this.getcategorylist();
        this.getcategorybind();
        this.toast.success(resp.message);
      }
    })
  }
  toggleChange(event: any, id: any) {
    this.apiservice.postapi('Category/CategoryActiveInactive?categoryid=' + id).subscribe(resp => {
      if (resp.status) {
        this.getcategorylist();
        this.toast.success(resp.message);
      }
    })
  }
  applyFilterActive(event: any) {
    const value = event.target.value;
    if (value == 'Active') {
      this.filterValue = 'true'
    } else if (value == 'InActive') {
      this.filterValue = 'false'
    } else {
      this.filterValue = '';
    }
    this.categorylist = this.filteredCategorytList.filter((product: any) => {
      return product.isActive.toString().includes(this.filterValue);
    });
    console.log(this.categorylist);
  }
}
