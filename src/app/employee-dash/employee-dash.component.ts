import { ApiService } from './../sercices/api.service';
import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-employee-dash',
  templateUrl: './employee-dash.component.html',
  styleUrls: ['./employee-dash.component.css']
})
export class EmployeeDashComponent implements OnInit {
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'phonenumber','departement','start_at','leave_at','isActivated','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog ,private api : ApiService){}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%',
  //    data:{editData : 'test'}
    }).afterClosed().subscribe(val=>{
      if(val){
        console.log(val);
        
        this.getAllEmployee();
      }
    })
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe({
      next:(res)=>{
        console.log(res);
        
        this.dataSource=new MatTableDataSource(res.results.data);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=>{
        alert("Error while fetching the records!")
      }
    })

  }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  editEmployee(row : any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row,
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllEmployee();
      }
    })
  }


  deleteEmployee(id:string){
    this.api.deleteEmployee(id)
    .subscribe({
      next:(res)=>{
        alert("Employee Deleted Successfully");
        this.getAllEmployee();
      },
      error:()=>{
        alert("Error while deleting the Employee")
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
