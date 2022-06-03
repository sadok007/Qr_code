import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  env = 'http://137.74.219.115:3000'
  constructor(private http : HttpClient) { }
  postEmployee(data : any){
    return this.http.post<any>(`${this.env}/user/register`,data);
  }
  getEmployee(){
    return this.http.get<any>(`${this.env}/user/all/user`);
  }
  putEmployee(data:any,id : string){
    return this.http.put<any>(`${this.env}/user/`+id,data)
  }
  deleteEmployee(id:string){
    return this.http.delete<any>("http://localhost:3000/EmployeeList/"+id)
  }
}
