import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/models/user';
import {AuthService} from '../../../shared/services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  newUser: User = null;
  loading = false;
  userForm: FormGroup;

  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      givenName: ['', [Validators.required]],
      familyName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });
    this.userForm.valueChanges.subscribe(value => {
      this.newUser = {...this.userForm.value, role: 'ADMIN'};
      console.log(this.newUser);
    });
  }

  login(user): void {
    this.authService.login(environment.loginUrl, user)
      .subscribe(res => {
        this.authService.error = false;
        this.authService.isLoggedIn = true;
        this.router.navigate(['']).then(() => console.log('redirect to dashboard'));
      }, error => {
        this.authService.error = true;
        this.authService.isLoggedIn = false;
      });
  }

  signup(): void {
    this.loading = true;
    this.authService.signup(environment.userApiUrl, this.newUser).subscribe(
      res => {
        this.authService.error = false;
        // login
        const username = this.newUser?.username;
        const password = this.newUser?.password;
        this.login({username, password});
        this.loading = false;
      }, error => {
        this.loading = false;
        this.authService.error = true;
      });
  }
}
