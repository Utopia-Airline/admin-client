import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpService } from '../shared/services/http.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  // TODO: Add Typescript type instead of any
  userId: string;
  user: any;
  apiUrl: string;
  edit: boolean;
  updateUserForm: FormGroup;
  username: string;
  password: string;
  givenName: string;
  familyName: string;
  email: string;
  phone: string;
  // TODO: Add Typescript type instead of any
  updatedUser: any;
  isError: boolean;
  // TODO: Create Error Entity
  error: any;

  constructor(
    private authService: AuthService,
    private userService: HttpService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.apiUrl = `${environment.userApiUrl}`;
    this.edit = false;
    this.isError = false;
    this.initializeUser();
    this.initializeForms();
  }

  initializeUser() {
    this.userId = this.router.url.substring(7);
    this.apiUrl = environment.userApiUrl + "/" + this.userId;
    this.userService.get(this.apiUrl).subscribe((res) => {
      this.isError = false;
      this.user = res;
    }, (err) => {
      this.isError = true;
      this.error = err.error;
    });
  }

  initializeForms() {
    this.updateUserForm = this.formBuilder.group({
      username: [''],
      password: [''],
      givenName: [''],
      familyName: [''],
      email: [''],
      phone: [''],
    });
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  updateUser() {
    // console.log(this.updateUserForm.value);
    this.userService.update(this.apiUrl, this.updateUserForm.value).subscribe((res) => {
      this.toggleEdit();
      this.isError = false;
      this.initializeForms();
      this.initializeUser();
    }, (err) => {
      this.isError = true;
      this.error = err.error;
    });
  }

  deleteUser() {
    this.userService.delete(this.apiUrl).subscribe((res) => {
      this.router.navigate
    }, (err) => {
      this.isError = true;
      this.error = err.error;
      this.error.message = "Unable to delete User";
    });
  }
}
