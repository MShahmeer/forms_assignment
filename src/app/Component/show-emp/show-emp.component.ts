import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/Employee.model';
import { Expense } from 'src/app/Models/Expense.model';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit{
  constructor(
      private serivices:EmployeeService,
      private router:Router
      ){}

  employeeList:Employee[]=[];

  ngOnInit(): void {
    this.employeeList=this.serivices.getEmployeeFromLocalStorage();
  }

  isTable:boolean=false;
  employeeExpense:Expense[]=[];
  isExpenseShow(item){
    this.isTable=true;
    this.employeeExpense=item.expense;
  }

  close(e)
  {
    this.isTable=e;
  }

  deleteEmployee(i){
    this.employeeList=this.employeeList.filter(x=>{
      return x.employee_id!=i;
    })
    localStorage.setItem("data",JSON.stringify(this.employeeList));
  }

  EditEmployee(id){
    this.router.navigate(["edit-employee/"+id]);
    console.log(id)
  }

}
