import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/Models/Employee.model';
import { Expense } from 'src/app/Models/Expense.model';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-expense-fields',
  templateUrl: './expense-fields.component.html',
  styleUrls: ['./expense-fields.component.css']
})
export class ExpenseFieldsComponent implements OnInit{
  @Input() ngForm!:NgForm;
  @Input() employee!:Employee;

  expenseList:Expense[]=[];
  totalCost:number=0;

  constructor(private services:EmployeeService){}

  getEmplastlength=this.services.getEmployeeFromLocalStorage().length-1;
  getExpenseLastLength=this.services.getEmployeeFromLocalStorage()[this.getEmplastlength].expense.length-1
  newExpenseId=this.services.getEmployeeFromLocalStorage()[this.getEmplastlength].expense[this.getExpenseLastLength].employee_id;
  ngOnInit():void{
  }

  getTotalCost(val:any){
    if(val==null){

    }else{
      this.totalCost=0;
      val.forEach(element => {
        this.totalCost= this.totalCost+element.cost;
      });
    }
    return this.totalCost;
  }

  expenseType=[
    {id:1,Type:"Food"},
    {id:2,Type:"Travel"},
    {id:3,Type:"Others"}
  ]
  newval:number=0;
  AddNewExpense(){
    this.newval+=this.newExpenseId+2;
    this.expenseList.push({
      Expense_id: this.newval,
      Expense_name: '',
      Type: '',
      Expense_Date: new Date(),
      cost: null,
      employee_id: this.employee.employee_id
    })
    this.employee.expense=this.expenseList;
  }

  // DeleteItem(item){
  //   this.expenseList=this.expenseList.filter(object => {
  //     return object.Expense_id !== item.Expense_id;
  //   });

  // }

}
