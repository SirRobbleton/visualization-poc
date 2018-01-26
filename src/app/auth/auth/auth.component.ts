import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public radioGroupForm: FormGroup;
  public authView = 'login';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.radioGroupForm = this.formBuilder.group({
      'model': 'login'
    });
  }

  public toggleAuth() {
    this.authView === 'login' ? this.authView = 'signUp' : this.authView = 'login';
  }

}
