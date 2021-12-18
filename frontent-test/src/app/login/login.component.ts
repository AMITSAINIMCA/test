import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { CustomvalidationService } from 'src/services/customvalidation.service';
import { CommanService } from 'src/services/comman.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./../../assets/login.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  error_string:string="";
  constructor(private formBuilder: FormBuilder,private router: Router, public auth:CommanService,
    private customValidator: CustomvalidationService) { }

  loginform =new FormGroup({ 
    email: new FormControl('', [Validators.required, Validators.email]),
    // password: new FormControl('', [Validators.required]),
    password: new FormControl('',Validators.compose([Validators.required,
      this.customValidator.patternValidator(),
    ])),
    usertype: new FormControl(1, [Validators.required])
  });
 
  ngOnInit(): void {
    if (this.auth.isLoggedIn() == false) {
      this.router.navigateByUrl('/login'); 
    }else{
      this.router.navigateByUrl('/dashboard');
    } 
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }

  onSubmit(): void {
    this.error_string = "";
    this.submitted = true;
    if (this.loginform.invalid) {
      return;
    } 
    this.auth.login(this.loginform.value).subscribe(data => {
      this.error_string = "";
      console.log(data)
      if(typeof data.userdetails !=="undefined" && data.userdetails!==null && Object.keys(data.userdetails).length>0){
        if(data.userdetails.usertype==1)
          this.router.navigateByUrl('/dashboard');
        else
         this.router.navigateByUrl('/user/'+data.userdetails._id);
      }else{
        this.error_string = "User is not available";
      }
        
    },(err) => {
      if(typeof err.error.message !== 'undefined' && err.error.message && err.error.message !==''){
        this.error_string = err.error.message;
      }else{ 
        this.error_string = err.error.message; 
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.loginform.reset();
  }

}
