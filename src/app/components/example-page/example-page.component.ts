import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-example-page',
  templateUrl: './example-page.component.html',
  styleUrl: './example-page.component.css'
})
export class ExamplePageComponent {

    employees: Array<Employee> = new Array<Employee>() 
    constructor(private employeeService:EmployeeService){

    }

    ngOnInit(): void {
      this.employeeService.get().subscribe({
        next:(data:any) =>{
          data.forEach((element: Employee) => {
            let existingEmployee = this.employees.find((f: Employee) => f.employeeName === element.employeeName);

            if (existingEmployee) {
                existingEmployee.timeWorked += element.timeWorked;
            } else {
                this.employees.push({
                    id: element.id,
                    employeeName: element.employeeName,
                    startTimeUtc: element.startTimeUtc,
                    endTimeUtc: element.endTimeUtc,
                    timeWorked: element.timeWorked
                } as Employee);
            }
            
          });

          this.employees = this.employees.sort((a,b)=> b.timeWorked - a.timeWorked);
        },
        error: (error: any) => console.log(error)
      })
      
    }
    ngAfterViewInit(): void {
      
      
    }
}
