import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Employee } from 'src/app/Models/Employee.model';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-employee-for-rf',
  templateUrl: './employee-for-rf.component.html',
  styleUrls: ['./employee-for-rf.component.css'],
})
export class EmployeeForRFComponent implements OnInit {
  // Employee Id that comes from localstorage
  emp_id =
    this.service.getEmployeeFromLocalStorage() == null
      ? 1
      : this.service.getEmployeeFromLocalStorage().length + 1;

  constructor(
    private service: EmployeeService,
    private formbuilder: FormBuilder
  ) {}
  employeeForm: FormGroup;

  // Employee Model
  employee: Employee = {
    employee_id: 0,
    employee_name: '',
    contact: '',
    address: '',
    gender_id: 0,
    expense: [],
  };

  ngOnInit(): void {
    this.employee.employee_id = this.emp_id;
    this.employeeForm = this.formbuilder.group({
      employee_id: [this.emp_id],
      employee_name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(14),
        ],
      ],
      contact: [
        '',
        [Validators.required, Validators.pattern(/^03\d{2}-\d{7}$/)],
      ],
      address: [''],
      gender_id: 0,
      expense: this.formbuilder.array([]),
    });
  }

  gender = [
    { id: 1, gender: 'Male' },
    { id: 2, gender: 'Female' },
    { id: 3, gender: 'Others' },
  ];

  Submit() {
    if(this.employeeForm.valid){
      this.service.setEmployeeToLocalStorage(this.employeeForm.value);
      console.log(this.service.getEmployeeFromLocalStorage());
      console.log(this.employeeForm);
      location.reload();
    }
  }
}
