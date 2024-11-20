import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators,AbstractControl, ValidationErrors} from '@angular/forms';
import {ApiService} from '../../Services/api.service';
import { AppService } from '../../Services/app.service';
import { HttpHeaders } from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currantYear: number = new Date().getFullYear();
  public loginform!: FormGroup;
  formSubmitted: boolean =false;
  test: string='Hello   ';
  constructor(
    private apiservice:ApiService,
    private router:Router,    
     private appservice:AppService 
  ) { }

  ngOnInit(): void {
  console.log(this.test.charAt(0));
  this.loginform = new FormGroup({
    userName:new FormControl('',[Validators.required,this.emailOrMobileValidator()]),
    //userName:new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[0-9]{10}$')]),
    password:new FormControl('',Validators.required),
    grantType:new FormControl('password')
  });
  }
 // Custom validator as a method in the same component
  emailOrMobileValidator(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      const mobilePattern = /^[0-9]{10}$/;
      const isValidEmail = emailPattern.test(control.value);
      const isValidMobile = mobilePattern.test(control.value);
      // Return null if valid, or { invalidUsername: true } if invalid
      return isValidEmail || isValidMobile ? null : { invalidUsername: true };
    };
  }
login()
{
  this.formSubmitted=true;
  if(this.loginform.valid && this.formSubmitted)
  {   
    const body=new URLSearchParams();
    body.set('userName',this.loginform.value.userName);
    body.set('password',this.loginform.value.password);
    body.set('grantType','password');
    const options = {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin','*')
    };
    this.apiservice.postapi('Account/login',this.loginform.value).subscribe(resp=>{
      if(resp.status){
        this.router.navigate(['/Dashboard']);
      //  this.toast.success('','login successfully..');
        this.appservice.login(resp);
      }
      else{
        alert('username and password incorrect');
      //  this.toast.error('Error!',resp.error_description);
      }
    });
  }else
  {
    //this.toast.error('Error!','Invalid User!');
  }
}
}
