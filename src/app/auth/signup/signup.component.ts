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
    this.authService.registrySuccessful.subscribe(
      (value: string) => {
        if (value === 'success') {
          this.registrySuccessful = true;
          this.errorMsg = '';
        } else {
          this.registrySuccessful = false;
          this.errorMsg = value;
        }
      }
    );
  }

  public onSignUp(form: NgForm) {
    const email = form.value.email;
    const pw = form.value.password;
    this.authService.signUpUser(email, pw);
  }
}
