import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgForm} from '@angular/forms';
import {WarehouseDataService} from '../../services/warehouse-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewChecked {
  @ViewChild('f') form: ElementRef;

  public loginSuccessful: boolean;
  public errorMsg = '';

  constructor(private router: Router, private authService: AuthService, private whService: WarehouseDataService) {
  }

  ngOnInit() {
    this.whService.finishedLoading.subscribe(
      (state: boolean) => {
        if (state) {
          this.router.navigateByUrl('displayMap');
        }
      }
    );
    this.authService.loginSuccessful.subscribe(
      (value: string) => {
        if (value === 'success') {
          this.loginSuccessful = true;
          this.errorMsg = '';
        } else {
          this.loginSuccessful = false;
          this.errorMsg = value;
        }
      }
    );
    this.authService.authenticationDone.subscribe(
      (token: string) => {
        if (token !== '') {
          this.whService.getFromDatabase(token);
        }
      }
    );
  }

  ngAfterViewChecked() {
  }

  onLogin(form: NgForm) {
    this.errorMsg = '';
    const email = form.value.email;
    const pw = form.value.password;
    // const email = 'hans@gmail.com';
    // const pw = 'hanspeter';
    this.authService.signInUser(email, pw);
  }
}
