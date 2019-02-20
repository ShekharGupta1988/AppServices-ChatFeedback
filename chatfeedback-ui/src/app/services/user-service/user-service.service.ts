import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userProfile: any = {
    name: '',
    email: ''
  };

  constructor(private http: HttpClient) { 
    this.getUserProfile();
  }

  private getUserProfile(): void {
    this.http.get('/.auth/me').subscribe((data : any[]) => {
      if(data === null || data.length <= 0){
        return;
      }

      let userData = data[0];
      this.userProfile.email = userData["user_id"];

      let claims : {type: string, val: string}[] = userData["user_claims"];
      let nameClaim = claims.find(p=> p.type === 'name');
      if(nameClaim){
        this.userProfile.name = nameClaim.val;
      }
      else{
        this.userProfile.name = this.userProfile.email;
      }
    });
  }
}
