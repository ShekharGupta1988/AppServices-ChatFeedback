import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiEndpoint: string;

  constructor(private httpClient: HttpClient) {
    this.getApiEndpoint();
  }

  submitFeedback(feedbackObj: any): Observable<any> {
    return this.httpClient.post(this.apiEndpoint, feedbackObj);
  }

  private getApiEndpoint(): void {


    this.httpClient.get("./assets/appSettings.php").subscribe(data => {
      if (data && data["API_Endpoint"]) {
        this.apiEndpoint = data["API_Endpoint"];
      }
      else {
        this.apiEndpoint = "ubable_to_fetch_url";
      }
    }, err => {
      this.apiEndpoint = "ubable_to_fetch_url";
    });
  }
}
