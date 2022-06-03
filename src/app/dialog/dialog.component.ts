import { ApiService } from './../sercices/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import{MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { inject } from '@angular/core/testing';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  statutList=["true","false"];
  employeeForm !: FormGroup;
  actionBtn : string = "Save"
  constructor(private FormBuilder: FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    this.employeeForm = this.FormBuilder.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',Validators.required],
      phonenumber: ['',Validators.required],
      departement: ['',Validators.required],
      start_at: ['',Validators.required],
      leave_at: ['',Validators.required],
      isActivated: ['',Validators.required],
    });
    if(this.editData){
      this.actionBtn = "Update";
      this.employeeForm.controls['firstname'].setValue(this.editData.firstname);
      this.employeeForm.controls['lastname'].setValue(this.editData.lastname);
      this.employeeForm.controls['email'].setValue(this.editData.email);
      this.employeeForm.controls['phonenumber'].setValue(this.editData.phonenumber);
      this.employeeForm.controls['departement'].setValue(this.editData.departement);
      this.employeeForm.controls['start_at'].setValue(this.editData.start_at);
      this.employeeForm.controls['leave_at'].setValue(this.editData.leave_at);
      this.employeeForm.controls['isActivated'].setValue(this.editData.isActivated);
    }
  }
  addEmployee(){
    if(!this.editData){
      if(this.employeeForm.valid){
        this.api.postEmployee(this.employeeForm.value)
        .subscribe({
          next:(res)=>{
            alert("Employee added successfully");
            this.employeeForm.reset();
            this.dialogRef.close();
          },
          error:()=>{
            alert("Error while adding Employee")
          }
        })
      }
    }
    else{
      this.updateEmployee()
    }
  }
  updateEmployee(){
    this.api.putEmployee(this.employeeForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Employee updated successfully");
        this.employeeForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the Employee!!")
      }
    })
  }
}
