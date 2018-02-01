import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public registrySuccessful: boolean;
  public errorMsg = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public onSignUp(form: NgForm) {
    const email = form.value.email;
    const pw = form.value.password;
    this.authService.signUpUser(email, pw);
  }
}
