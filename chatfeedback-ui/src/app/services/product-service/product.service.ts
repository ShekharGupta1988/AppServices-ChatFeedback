import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { 

    let productKeys = Object.keys(this.productInfo);

    productKeys.forEach(product => {
      this.httpClient.get(this.productInfo[product].detectorsFile).subscribe((output : any[]) => {
        this.productInfo[product].detectors = output.map(p=> p.metadata);
      });

      this.httpClient.get(this.productInfo[product].supportTopicsFile).subscribe((output : any[]) => {
        this.productInfo[product].supportTopics = output;
      });
    });
  }

  public productInfo : any = {
    "Azure Web App (Windows)": {
      supportTopics: [],
      detectors: [],
      detectorsFile : './assets/webapp-detectors.json',
      supportTopicsFile : './assets/webapp-supporttopics.json'
    },
    "Azure Web App (Linux)": {
      supportTopics: [],
      detectors: [],
      detectorsFile : './assets/linuxapp-detectors.json',
      supportTopicsFile : './assets/linuxapp-supporttopics.json'
    },
    "Azure Kubernetes Service (AKS)": {
      supportTopics: [],
      detectors: []
    }
  };
}
