import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  public authenticationDone = new BehaviorSubject<string>('');
  public loginSuccessful = new BehaviorSubject<string>('');
  public registrySuccessful = new BehaviorSubject<string>('');

  public token: string;

  constructor() { }

  signUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        response => {
          console.log(response);
          this.registrySuccessful.next('success');
        }
      )
      .catch(
        error => {
          console.log(error);
          this.registrySuccessful.next(error.message);
        }
      );
  }

  signInUser(email: string, password: string) {
    console.log('AUTH SERVICE: signInUser');
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          console.log(response);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                  this.token = token;
                  this.authenticationDone.next(token);
                  this.loginSuccessful.next('success');
              }
            );
        }
      )
      .catch(
        error => {
          console.log(error);
          console.log(error.message);
          this.loginSuccessful.next(error.message);
        }
      );
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
  return this.token;
  }
}
