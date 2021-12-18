import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import { CommanService } from 'src/services/comman.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css','./../../assets/table.css']
})
export class UserDetailsComponent implements OnInit {
  error_string:string="";
  user_details:any;
  _isAvalable:boolean=false;
  _isActiveUser:any;
  userid:string="";
  constructor(private router: Router, private activeRoute: ActivatedRoute,public auth:CommanService) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn() == false) {
      this.router.navigateByUrl('/login'); 
    }else{
      this.userid = this.activeRoute.snapshot.params.id;
      if(typeof this.userid!=="undefined" && this.userid && this.userid !==""){
        this._isActiveUser = this.auth.getUserDetails();
        this.userDetails();
      }else{
        this.error_string = "Sorry, User not found";
        this.router.navigateByUrl('/login'); 
      }
    }
  }
  userDetails(){
    this.auth.userDetails({user_id:this.userid}).subscribe(data => {
      this.error_string = ""; 
      this.user_details  = data.data;
      if(typeof this.user_details!=="undefined" && this.user_details!==null && Object.keys(this.user_details).length>0)
        this._isAvalable =true;
    },(err) => {
      if(typeof err.error.message !== 'undefined' && err.error.message && err.error.message !==''){
        this.error_string = err.error.message;
      }else{ 
        this.error_string = err.error.message; 
      }
    });
  }
}
