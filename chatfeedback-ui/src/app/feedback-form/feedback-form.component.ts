import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service/user-service.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {

  feedbackObject : any = {
    TimeStamp: '',
    ResourceURI: '',
    Product: 'Azure Web App (Windows)',
    ChatURL: '',
    SupportTopic: '',
    Problem: '',
    Deflected: '',
    Resolution: '',
    DetectorsHelped: '',
    DocsHelped: '',
    CSAT : 0,
    WhyLeaked: '',
    Improvements: '',
    OtherRemarks: '',
    OwnerEmail: ''
  };

  detectorsList: any[] = [
    {
      id: 'webappdown',
      name: 'Web App Down'
    },
    {
      id: 'functionsGeneralInfo',
      name: 'Functions General Info'
    }
  ];

  selectedDetectors: any[] = [];
  dropdownSettings = {};

  constructor(public userService: UserService) {
    let currentDate = new Date();
    this.feedbackObject.TimeStamp = this.formatDate(currentDate);

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true
    };
   }

  ngOnInit() {
  }

  OnSubmit(): void{
    this.feedbackObject.CSAT = parseInt(this.feedbackObject.CSAT);
    this.feedbackObject.DetectorsHelped = this.selectedDetectors.map((item)=>item.id).join();
    console.log(this.feedbackObject);
  }

  private formatDate(d: Date): string {
      var  month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
