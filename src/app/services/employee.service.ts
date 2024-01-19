import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { Employee } from '../interfaces/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  get(): Observable<Employee[]> {
    return this.http.get<any[]>("https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==")
      .pipe(
        map((array: any[]) => {
          return array.map((item: any) => {
            return {
              id: item.Id,
              employeeName: item.EmployeeName,
              startTimeUtc: item.StarTimeUtc,
              endTimeUtc: item.EndTimeUtc,
              timeWorked: this.calculateTimeWorked(item.StarTimeUtc, item.EndTimeUtc)
            } as Employee;
          });
        })
      );
  }

  private calculateTimeWorked(startDate: string, endDate: string): number {
    let timeInHours = Math.floor((Date.parse(endDate) - Date.parse(startDate)) / 1000 / 60 / 60);
    return timeInHours;
  }
}
