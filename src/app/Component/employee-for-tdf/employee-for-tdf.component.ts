import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/Models/Employee.model';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-employee-for-tdf',
  templateUrl: './employee-for-tdf.component.html',
  styleUrls: ['./employee-for-tdf.component.css']
})
export class EmployeeForTDFComponent implements OnInit{
// Employee Id that comes from localstorage
  emp_id=this.service.getEmployeeFromLocalStorage()==null?1:this.service.getEmployeeFromLocalStorage().length+1;

  constructor(private service:EmployeeService){}

  // Employee Model
  employee:Employee={
    employee_id: 0,
    employee_name: '',
    contact: '',
    address: '',
    gender_id: 0,
    expense: []
  };

  ngOnInit(): void {
    this.employee.employee_id=this.emp_id;
  }

  gender=[
    {id:1,gender:"Male"},
    {id:2,gender:"Female"},
    {id:3,gender:"Others"}
  ]

  Submit(val:NgForm){
    console.log(val)
      this.service.setEmployeeToLocalStorage(this.employee);
      console.log(this.service.getEmployeeFromLocalStorage());
      location.reload();
  }




}
