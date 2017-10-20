import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UserService {

  _user: any;
  _user$: Subject<any> = <Subject<any>>  new Subject();
  public redirectUrl: string = null;
  constructor(private afAuth: AngularFireAuth, private _router: Router) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  set user(user) {
    this._user = user;
    this._user$.next(user);
  }
  get user$() {
    return this.afAuth.authState;
  }
  get user() {
    return this._user;
  }
  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this._router.navigate(['/login']).then();
    });
  }
}
