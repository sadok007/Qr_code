import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './sercices/api.service';
import { DialogComponent } from './dialog/dialog.component';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'phonenumber','departement','start_at','leave_at','isActivated','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog :MatDialog, private api :ApiService) { }
  exform!: FormGroup;
  

  ngOnInit(): void {
    
  
  }

  
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    });
  }
 
}