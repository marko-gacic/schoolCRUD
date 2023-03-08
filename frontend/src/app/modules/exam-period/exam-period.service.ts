import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExamPeriod } from './interfaces/exam-period';
import { BaseAPIService } from 'src/app/core/services/base-api.service';

@Injectable({
	providedIn: 'root'
})
export class ExamPeriodService extends BaseAPIService<ExamPeriod>{
	protected override entityEndpoint: string = 'examperiod'

	constructor(private _http: HttpClient) {
		super(_http);
	}
}

