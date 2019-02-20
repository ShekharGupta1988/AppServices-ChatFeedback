import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { FormService} from './services/form-service/form-service.service';
import { UserService } from './services/user-service/user-service.service';

@NgModule({
  declarations: [
    AppComponent,
    FeedbackFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    FormService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
