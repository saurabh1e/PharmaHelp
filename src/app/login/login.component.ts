import {Component, InjectionToken, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

export const WINDOW = new InjectionToken<Window>('WindowToken');

export function _window(): Window {
  return window;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  userNumber: string;
  userSub: Subscription;
  recaptchaVerifier: any;
  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this.userSub = this._userService.user$.subscribe((user) => {
      if (user && user.uid) {
        console.log(this._userService.redirectUrl);
        if (this._userService.redirectUrl) {
          this._router.navigate([this._userService.redirectUrl]).then();
        } else {
          this._router.navigate(['']).then();
        }
      }
    });
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': function (response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // onSignInSubmit();
      }
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  signIn(phoneNumber: string) {
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = '+91' + phoneNumber;
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then(confirmationResult => {
        const a = prompt('Enter Verification Code');
        confirmationResult.confirm(a).then((response) => {
          alert('Login Successful!');
        }, () => {
          alert('Error logging in please try again!');
        });
      })
      .catch(function (error) {
        //
        console.error('SMS not sent', error);
      });
  }
}
