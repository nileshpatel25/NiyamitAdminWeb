import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../Services/app.service';
import { HttpHeaders } from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-orderview',
  templateUrl: './orderview.component.html',
  styleUrls: ['./orderview.component.css']
})
export class OrderviewComponent implements OnInit {
  orderdata:any=[];
orderdetail:any=[];
total:any;
shippingcharg:any;
tax:any;
status:any;
ordertype:any;
paymenttype:any;
orderno:any;
name:any;
phoneno:any;
email:any;
address:any;
pickupguid:any;
pickuplocation:any=[];
pcontactName:any;
pcontactNumber:any;
paddress:any;
  constructor(private apiservice:ApiService,private toast:ToastrService,  private fb:FormBuilder,private appservice: AppService,
    private router:Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getOrder();
    this.getorderdetails();
  }


  getOrder(){
    this.apiservice.postapi('Order/GetOrderbyId?guidorderid='+this.route.snapshot.queryParamMap.get('guidorderid')).subscribe(resp=>{
      if(resp.status){
        this.orderdata=resp.orderdatas;
        this.total=resp.orderList[0].total;
        this.tax=resp.orderList[0].tax;
        this.shippingcharg=resp.orderList[0].shippingCharge;
        this.status=resp.orderList[0].status;
        this.ordertype=resp.orderList[0].ordertype;
        this.paymenttype=resp.orderList[0].paymenttype;
        this.orderno=resp.orderList[0].orderno;

        this.name=resp.orderList[0].name;
        this.phoneno=resp.orderList[0].phoneno;
        this.email=resp.orderList[0].emailid;
        this.getpickuplocationdetail(resp.orderList[0].guid_PickupLocationId);
this.address=resp.orderList[0].address+ ' , ' + resp.orderList[0].city + ' , ' + resp.orderList[0].zipcode;
      }});
  }
 getpickuplocationdetail(id:any){
  this.apiservice.postapi('PickupLocation/GetpickuplocationbyId?guidpickuplocation='+id).subscribe(resp=>{
    if(resp.status){
      this.pickuplocation=resp.pickuplocationDatas;
      this.pcontactName=resp.pickuplocationDatas[0].contactName;
      this.pcontactNumber=resp.pickuplocationDatas[0].contactNumber;
      this.paddress=resp.pickuplocationDatas[0].address1 + '' + resp.pickuplocationDatas[0].address2 + ',' +resp.pickuplocationDatas[0].city+ ',' +resp.pickuplocationDatas[0].state+ ',' +resp.pickuplocationDatas[0].zipcode;
    }});
 }
  getorderdetails()
  {
    this.apiservice.postapi('Order/GetOrderDetailbyId?guidorderid='+this.route.snapshot.queryParamMap.get('guidorderid')).subscribe(resp=>{
      if(resp.status){
        this.orderdetail=resp.orderdetaildatas;

      }});
  }
}
