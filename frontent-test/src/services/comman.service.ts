import { Injectable,EventEmitter,Output } from '@angular/core';
import { HttpClient} from "@angular/common/http"; 
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'; 
import { environment } from 'src/environments/environment';

/*
 Fields to save user details into database
 */
export interface role {
  email?: String;
  otp?: String,
  fullname?: String,
  password?: String,
  confirmpassword?: String,
  hint?:String,
  phone?:number,
  twofa?:number,
  thirdDpin?:String,
  emailcode?:String,
  group?: String,
  businessType?: String,
  designation?:String,
  maincategory?:String,
  institutionGroup?:String,
  institutionEduSelected?:String,
  day?:number,
  month?:String,
  year?:number,
  birthday?:String,
  gender?:String,
  _csrf?:String,
  action?:String,
  phonecode?:String
}

/*
 Active User Fields
 */
export interface active {
  email?: String;
  name?: String,
  phone?:number,
  address?: String,
  dob?:String,
  birthday?:String,
  myreferralcode?:String,
  city?:String,
  state?:String,
  country?:String,
  postal?:String,
  aboutme?:String,
  avatar?:String,
  cover?:String,
  group?:String,
  gender?:String,
  maincategory?:String,
  designation?:String,
  _id?:String,
  _csrf?:String
}

/*
 Active User Fields
 */
export interface umDetailsActive {
  officialTitle?: String;
  officialOrg?: String,
  officialYear?:number,
  tEventNumber?: number,
  tEventName?:String,
  eventYear?:number,
  workJobtitle?:String,
  workOrg?:String,
  workAppointedYear?:number,
  preJobtitle?:String,
  preOrg?:String,
  preAppointedYear?:number,
  team?:String,
  club?:String,
  academy?:String,
}

/*
 Advance user profile
 */
export interface userAdvance {
  playerType?: String;
  turnelProfessional?: String,
  height?:String,
  weigth?: String,
  playerlevel?:String,
  playingrole?:String,
  battinghand?:String,
  battingstyle?:String,
  bowlingarm?:String,
  bowlingstyle?:String,
  favouritshot?:String,
  favouritefielding?:String,
}

/*
 specific format of create user call reponse
 */
export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  userid: number;
  exp: number;
  iat: number;
}
/*
 interface for token
 */
interface TokenResponse {
  token: string;
}
/*
 Fields to save user details into database
 */
export interface TokenPayload {
  name?: String;
  userid?: String;
  usertype?: String; 
  email?: String;
  phone?: Number; 
  country_code?: String, 
  password?: String,
  kyc_verified?: Number,
  sportname?: String,
  otp?:String, 
  social_id?:String,
  social_token?:String,
  page?:Number,
  perpage?:Number,
  formData?:any
}


@Injectable({
  providedIn: 'root'
})
export class CommanService {
 
  /*back end application api url
  */
 api_url: string = environment.apiServerEndPoint;

 private token:any;
 @Output() imgurl: EventEmitter<string> = new EventEmitter();
 constructor(private http : HttpClient, private router: Router) {
   this.token = "";
 }

 /*
  save token into localStorage as a item with specific key
  */
 public saveToken(token: string): void {
   localStorage.setItem('mean-token', token);
   this.token = token;
 }

 /*
  call for fetch token from localStrogae
  */

 private getToken(): string {

   if (!this.token) {
     this.token = localStorage.getItem('mean-token');
   }
   return this.token;
 }
 /*
  fetch user token details
  */

 public getUserDetails(): UserDetails {
   const token = this.getToken();
   let payload;
   if (token) {
     payload = token.split('.')[1];
     payload = window.atob(payload);
     return JSON.parse(payload);
   } else {
     return  null as any
   }
 }

 /*
  call for check the user session
  */
 public isLoggedIn(): boolean {
   const user = this.getUserDetails();
   if (user) {
     return user.exp > Date.now() / 1000;
   } else {
     return false;
   }
 }

 /*
  * Call For user Logout
  * */
 public logout(): void {
   this.token = '';
   window.localStorage.removeItem('mean-token');
   this.router.navigateByUrl('/login');
 }

 /*
  all type of api call handlers at client side and send token in header in all GET api call to verify valid user
  application at back end match user token with this token, if both token are match means this is a valid user otherwise
  return with a exception invalid user
  */
 public request(method: 'post' | 'get'| 'delete', type?:any, user?:any, paramslist?:any): Observable<any> {
   let base;

   if (method === 'post') {
     if (type === 'login') {
       base = this.http.post<any>(this.api_url + type, user, {
         headers:{"Access-Control-Allow-Origin":"*"}
       });
       console.log(base)
     } else {
       base = this.http.post<any>(this.api_url + type, user, {withCredentials: true, headers: {"Access-Control-Allow-Origin":"*", Authorization: `${this.getToken()}` } });
     }
   }else if(method === 'delete'){
     base = this.http.delete<any>(this.api_url + type,  {withCredentials: true, headers: {"Access-Control-Allow-Origin":"*", Authorization: `${this.getToken()}` } ,params: paramslist});
      
   } else {
     base = this.http.get<any>(this.api_url + type, { headers: {"Access-Control-Allow-Origin":"*", Authorization: `${this.getToken()}` },
        params: paramslist });
       console.log("base-->",base)
   }
   const request = base.pipe(
       map((data: TokenResponse) => {
         if (data !== null && data.token) {
           this.saveToken(data.token);
         }
         return data;
       })
   );
   return request;
 }
    

 /*
  * Api call for User login
  * */
 public login(user: TokenPayload):Observable<any> {
   return this.request('post', 'login', user);
 }

/**
 *  @author: Amit Saini
 *  Get user list 
 */
 public userList():Observable<any>{ 
     return this.request('get', 'user_list');
 }
 //user  Details
 public userDetails(getData:any):Observable<any>{  
   return this.request('get', 'user_details',null, getData);
 } 
}
