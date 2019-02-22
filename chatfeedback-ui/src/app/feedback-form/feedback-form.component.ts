import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service/user-service.service';
import { ProductService } from '../services/product-service/product.service';
import { FormService } from '../services/form-service/form-service.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {

  feedbackObject: any;
  errorObject: any;
  selectedDetectors: any[] = [];
  dropdownSettings = {};
  showAlert: boolean = false;
  alertMessage: string = '';
  alertClass: string = '';
  submitButtonDisabled: boolean = false;

  productList: string[] = [];

  constructor(public userService: UserService, public productService: ProductService, private formService: FormService) {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true
    };

    this.productList = Object.keys(this.productService.productInfo);
    this.resetModels();
  }

  ngOnInit() {
  }

  OnSubmit(): void {

    this.feedbackObject.CSAT = parseInt(this.feedbackObject.CSAT);
    if (this.selectedDetectors && this.selectedDetectors.length > 0) {
      this.feedbackObject.DetectorsHelped = this.selectedDetectors.map((item) => item.id).join();
    }

    this.errorObject = {};

    var isFormValid: boolean = this.validateFormModel();

    if (isFormValid) {
      // do Post call
      this.feedbackObject.OwnerEmail = this.userService.userProfile.email;
      this.submitButtonDisabled = true;
      this.formService.submitFeedback(this.feedbackObject).subscribe((data: any) => {
        this.showSuccessAlertOnPage();
        this.resetModels();
        window.scroll(0, 0);
        this.submitButtonDisabled = false;
      }, (err) => {
        this.showFailureAlertOnPage("An error encountered during feedback submission.");
        window.scroll(0, 0);
        this.submitButtonDisabled = false;
      });
    }
    else {
      this.showFailureAlertOnPage("Fix the errors in the form before submitting.");
      window.scroll(0, 0);
    }
  }

  onProductSelectionChange(target: any) : void {
    this.feedbackObject.SupportTopic = '';
    this.feedbackObject.DetectorsHelped = '';
    this.selectedDetectors = [];
    this.feedbackObject.CSAT = 0;
    this.feedbackObject.WhyLeaked = '';
  }

  private validateFormModel(): boolean {

    var isFormValid: number = 1;

    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!this.feedbackObject.TimeStamp.match(regEx)) {
      this.errorObject.TimeStampError = "Invalid Format. Valid Format YYYY-MM-DD";
      isFormValid &= 0;
    }
    else if (Number.isNaN((new Date(this.feedbackObject.TimeStamp)).getTime())) {
      this.errorObject.TimeStampError = "Invalid Date."
      isFormValid &= 0;
    }

    if (this.feedbackObject.ResourceURI === '') {
      this.errorObject.ResourceURIError = "Resource Uri cannot be empty";
      isFormValid &= 0;
    }

    if (this.feedbackObject.ChatURL === '') {
      this.errorObject.FreshChatUrlError = "Fresh Chat Url cannot be empty";
      isFormValid &= 0;
    }

    if (this.feedbackObject.Problem === '') {
      this.errorObject.ProblemError = "Problem Description cannot be empty";
      isFormValid &= 0;
    }

    if (this.feedbackObject.Deflected === '') {
      this.errorObject.CaseDeflectedError = "Select one option";
      isFormValid &= 0;
    }

    if (this.feedbackObject.SupportTopic === '') {
      this.errorObject.supportTopicError = "Select a support topic";
      isFormValid &= 0;
    }

    if (this.feedbackObject.Deflected === 'Y') {

      if (this.feedbackObject.Resolution === '') {
        this.errorObject.ResolutionError = "Resolution cannot be empty";
        isFormValid &= 0;
      }
    }
    else if (this.feedbackObject.Deflected === 'N') {

      if (this.feedbackObject.WhyLeaked === '') {
        this.errorObject.WhyLeakedError = "Sepcify a reason";
        isFormValid &= 0;
      }
    }

    return isFormValid === 1;
  }

  private formatDate(d: Date): string {
    var month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  private resetModels(): void {
    this.feedbackObject = {
      TimeStamp: '',
      ResourceURI: '',
      Product: '',
      ChatURL: '',
      SupportTopic: '',
      Problem: '',
      Deflected: '',
      Resolution: '',
      DetectorsHelped: '',
      DocsHelped: '',
      CSAT: 0,
      WhyLeaked: '',
      Improvements: '',
      OtherRemarks: '',
      OwnerEmail: ''
    };

    this.errorObject = {};
    this.selectedDetectors = [];
    let currentDate = new Date();
    this.feedbackObject.TimeStamp = this.formatDate(currentDate);
    this.feedbackObject.Product = this.productList[0];
  }

  private showSuccessAlertOnPage(): void {
    this.showAlert = true;
    this.alertMessage = "Feedback submitted succesfully !";
    this.alertClass = "alert alert-success";
    setTimeout(() => {
      this.showAlert = false;
      this.alertMessage = '';
      this.alertClass = '';
    }, 5000);
  }

  private showFailureAlertOnPage(message: string): void {
    this.showAlert = true;
    this.alertMessage = message;
    this.alertClass = "alert alert-danger";
    setTimeout(() => {
      this.showAlert = false;
      this.alertMessage = '';
      this.alertClass = '';
    }, 5000);
  }
}
