import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"; 
import { CommanService } from 'src/services/comman.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','./../../assets/table.css']
})
export class DashboardComponent implements OnInit {
  error_string:string="";
  userLists:any;
  constructor(private router: Router, public auth:CommanService) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn() == false) {
      this.router.navigateByUrl('/login'); 
    }else{
      this.userList();
    } 
  }

  userList(){
    this.auth.userList().subscribe(data => {
      this.error_string = ""; 
      this.userLists  = data.data;
    },(err) => {  console.log("err--",err);
      if(typeof err.error.message !== 'undefined' && err.error.message && err.error.message !==''){
        this.error_string = err.error.message;
      }else{ 
        this.error_string = err.error.message; 
      }
    });
  }
}
