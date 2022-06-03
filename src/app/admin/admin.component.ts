import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(){}

  ngOnInit() {
    this.loginForm=new FormGroup({
      username:new FormControl ('',[Validators.required]),
      password:new FormControl ('',[Validators.required,Validators.minLength(8)])
    });
  }
  
  

}
