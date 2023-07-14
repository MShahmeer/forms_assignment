import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-expense-fields-rf',
  templateUrl: './expense-fields-rf.component.html',
  styleUrls: ['./expense-fields-rf.component.css'],
})
export class ExpenseFieldsRfComponent implements OnInit {
  @Input() employeeForm: FormGroup;
  constructor(private services:EmployeeService){}
  getEmplastlength=this.services.getEmployeeFromLocalStorage().length-1;
  getExpenseLastLength=this.services.getEmployeeFromLocalStorage()[this.getEmplastlength].expense.length-1
  newExpenseId=this.services.getEmployeeFromLocalStorage()[this.getEmplastlength].expense[this.getExpenseLastLength].employee_id;
  item!: FormArray;
  totalCost: number = 0;

  expenseType = [
    { id: 1, Type: 'Food' },
    { id: 2, Type: 'Travel' },
    { id: 3, Type: 'Others' },
  ];

  ngOnInit(): void {
  }

  AddNewExpense() {
    this.item = this.employeeForm.get('expense') as FormArray;
    this.item.push(this.GetNewRow());

    // console.log(this.expenseList.controls);
  }

  // Generate new row
  newval:number=0;
  GetNewRow() {
    return new FormGroup({
      Expense_id: new FormControl(this.newval+=this.newExpenseId+2, Validators.required),
      Expense_name: new FormControl('', Validators.required),
      Type: new FormControl('', Validators.required),
      Expense_Date: new FormControl('', Validators.required),
      cost: new FormControl(0, [
        Validators.required,
        Validators.max(1000.21),
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]),
      employee_id: new FormControl(this.employeeForm.get('employee_id').value),
    });
  }

  //get expense array
  get expenseList() {
    return this.employeeForm.get('expense') as FormArray;
  }

  getCostValue(e){
    if(e==null){

    }else{
      this.totalCost=0;
      e.forEach(element => {
        this.totalCost+=element.value.cost;
      });
    }
    return this.totalCost;
  }
  // newList:any[]=[];
  // DeleteItem(item){
  //   this.newList=this.expenseList.controls;
  //   console.log(this.expenseList.controls)
  //   this.newList=this.expenseList.filter(object => {
  //     return object.Expense_id !== item.Expense_id;
  //   }) as FormArray<any>;
  // }
}
