import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

const appRoutes: Routes = [
  { path: 'feedback-form', component: FeedbackFormComponent },
  { path: '',   redirectTo: '/feedback-form', pathMatch: 'full' },
  { path: '**', redirectTo: '/feedback-form', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
