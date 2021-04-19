import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

type User = {
  username: string;
  password: string;
  firstname?: string;
  lastname?: string;
};

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  user: User = {username: '', password: '', firstname: ''};

  constructor(public authService: AuthService,
              private router: Router, private location: Location) {
  }

  login(): void {
    console.log('user:', this.user);
    this.authService.login(environment.loginUrl, this.user)
      .subscribe(res => {
        console.log(res);
        this.authService.error = false;
        this.authService.isLoggedIn = true;
        if (window.history.length > 2) {
          this.location.back();
        } else {
          this.router.navigate(['/']).then(() => console.log('navigated', window.history));
        }
      }, error => {
        this.authService.error = true;
        this.authService.isLoggedIn = false;
        console.log('error:', error);
      });
  }

  ngOnInit(): void {
  }

}
