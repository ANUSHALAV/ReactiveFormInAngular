import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css']
})
export class ReactiveformComponent implements OnInit {

  userArray: any[] = [];
  constructor(private httpclient: HttpClient) {
    this.getData();
  }

  myform: FormGroup = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  });



  ngOnInit() {
    this.getData();
  }

  userData: any;
  savedata() {
    const dataObj = this.myform.value;
    this.httpclient.post('https://jsonplaceholder.typicode.com/users', dataObj).subscribe((res: any) => {
      if (res) {
        alert("User Added!");
      } else {
        alert("User Added Unsuccessfully!");
      }
    });
  }


  editData(ID: number) {
    this.httpclient.get('https://jsonplaceholder.typicode.com/users/' + ID).subscribe((res: any) => {
      this.myform = new FormGroup({
        name: new FormControl(res.name),
        username: new FormControl(res.username),
        email: new FormControl(res.email),
        phone: new FormControl(res.phone)
      });
    });
  }


  deleteData(ID: number) {
    alert("id = " + ID + " delete successfully!");
  }

  getData() {
    this.httpclient.get('https://jsonplaceholder.typicode.com/users').subscribe((res: any) => {
      this.userArray = res;
    });
  }
}
