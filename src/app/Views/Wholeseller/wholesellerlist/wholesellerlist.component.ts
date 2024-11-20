import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../Services/app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-wholesellerlist',
  templateUrl: './wholesellerlist.component.html',
  styleUrls: ['./wholesellerlist.component.css']
})
export class WholesellerlistComponent implements OnInit {
  p: number = 1;
  searchText = '';
  dataSource: any;
  wholesellerlist: any = [];
  eform!: FormGroup;
  formSubmitted: boolean = false;
  mode: any = 'insert';
  cform!: FormGroup;
  selectedFile: File | null = null;
  constructor(private apiservice: ApiService, private toast: ToastrService, private fb: FormBuilder, private appservice: AppService,
    private router: Router) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getwholesellerlist();
    this.eform = this.fb.group({
      guid_Wholesellerid: [''],
      userId: [localStorage.userid]
    });
  }
  getwholesellerlist() {
    this.apiservice.getapi('WholeSeller/GetAllWholeseller').subscribe(resp => {
      if (resp.status) {
        this.wholesellerlist = resp.wholesellerDatas;
      }
    });
  }
  delete(id: any) {
    this.eform.get("guid_Wholesellerid")?.setValue(id);
    this.eform.get("userId")?.setValue(localStorage.userid);
    this.apiservice.postapi('WholeSeller/Deletewholeseller', this.eform.value).subscribe(resp => {
      if (resp.status) {
        this.getwholesellerlist();
        this.toast.success(resp.message);
      }
    })
  }
  updateStatus(id: any) {
    let resData = {
      userId: localStorage.userid,
      guid_Wholesellerid: id,
      status: ""
    }
    this.apiservice.postapi('WholeSeller/updatewholesellerstatus', resData).subscribe(resp => {
      if (resp.status) {
        this.getwholesellerlist();
        this.toast.success(resp.message);
      }
    })
  }
  cancelStatus(id: any) {
    let resData = {
      userId: localStorage.userid,
      guid_Wholesellerid: id,
      status: ""
    }
    this.apiservice.postapi('WholeSeller/cancelwholesellerstatus', resData).subscribe(resp => {
      if (resp.status) {
        this.getwholesellerlist();
        this.toast.success(resp.message);
      }
    })
  }
}
