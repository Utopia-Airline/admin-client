import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss']
})
export class UserCreationComponent implements OnInit {
  addUserForm: FormGroup;
  username: string;
  password: string;
  givenName: string;
  familyName: string;
  email: string;
  phone: string;
  role: string;
  apiUrl: string;
  isError: boolean;
  error: string;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.apiUrl = environment.userApiUrl;
    this.isError = false;
    this.initializeForm();
  }

  initializeForm(): void {
    this.addUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      givenName: ['', Validators.required],
      familyName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  addUser(): void {
    if (this.addUserForm.valid) {
      this.userService.post(this.apiUrl, this.addUserForm.value).subscribe((res) => {
        this.isError = false;
        this.router.navigate;
      }, (err) => {
        this.isError = true;
        this.error = err?.error?.message;
      });
    }
    else {
      this.isError = true;
      this.error = "Invalid input"
    }
  }

}
