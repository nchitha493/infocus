import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { ToasterService } from '../toaster.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm:FormGroup;
  constructor(private userService: UserService,private toaster: ToasterService,private router:Router) { 
    this.LoginForm = new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null,[Validators.required])
    });
  }
  onSubmit(){
    console.log(this.LoginForm.value);
    if(this.LoginForm.valid){
    this.userService.login(this.LoginForm.value).subscribe((data:any)=>{
      localStorage.setItem('token',data.token);
        localStorage.setItem('user',JSON.stringify(data.user));
        this.router.navigate(['/home'])
    },(error)=>{
      console.log("error");
      this.toaster.show('error', error.error.message, '', 3000);
    });
  }else{
    this.toaster.show('warning', 'Please check the entered values', '', 3000);
  }

  }
  ngOnInit(): void {
  }

}
