import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(  private router:Router,) { }
  login(resp:any){
    localStorage.setItem('token',resp.accessToken);
    localStorage.setItem('userid',resp.userid);
    localStorage.setItem('expires_in',resp.expiration);
    localStorage.setItem('role',resp.role);
    
    // localStorage.setItem('username',resp.userName);
    // localStorage.setItem('role',resp.Role);
    // localStorage.setItem('Name',resp.Name);
    //  localStorage.setItem('key','loaded');
    // if(resp.Role=="Admin")
    // {
    //   this.router.navigate(['/admindashboard']);
    // }else
    // {
    //   this.router.navigate(['/dashboard']);
     
    //   //this.router.navigateByUrl('/dashboard',{ skipLocationChange: true });
    
     
    // }
   

  }

  isAdmin(): boolean {
    return localStorage.role === 'Admin';
  }
  isUser(): boolean {
    return localStorage.role === 'User';
  }
checktoken(){
  if(!localStorage.userid){
    // this.toast.info('','token expired');
    this.router.navigate(['/login']);
  }
}
logout()
{
  localStorage.removeItem('token');
  localStorage.removeItem('userid'); 
  localStorage.removeItem('expires_in'); 
  this.router.navigate(['/login']);
}
}
