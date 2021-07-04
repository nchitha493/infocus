import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToasterService } from '../toaster.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  SignupForm:FormGroup;
  constructor(
    private userService: UserService,private toaster: ToasterService,private router:Router) {
    this.SignupForm = new FormGroup({
      'name':new FormControl(null,[Validators.required]),
      'age':new FormControl(null,[Validators.required]),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null,[Validators.required]),
      'repassword':new FormControl(null,[Validators.required])
    });
   }

   onSubmit(){
    if(this.SignupForm.valid){
      let value = this.SignupForm.value;
      if(value.password != value.repassword){
        this.toaster.show('warning', 'Your password is not same', '', 3000);
        return;
      }
      this.userService.register(value).subscribe((data:any)=>{
        console.log(data);
        localStorage.setItem('token',data.token);
        localStorage.setItem('user',JSON.stringify(data.user));
        this.router.navigate(['/home'])

      },(error)=>{
        console.log(error);
        this.toaster.show('error', error.error.message, '', 3000);
      });
    }else{
      console.log("invalid");
      this.toaster.show('warning', 'Please check the entered values', '', 3000);
      
    }

  }
  ngOnInit(): void {
  }

}
