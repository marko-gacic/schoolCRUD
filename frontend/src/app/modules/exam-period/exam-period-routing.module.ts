import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamPeriodComponent } from './exam-period.component';

const routes: Routes = [{ path: '', component: ExamPeriodComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamPeriodRoutingModule { }
