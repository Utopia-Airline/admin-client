import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpService } from '../shared/services/http.service';
import { UserService } from '../shared/services/user.service';

import { PagerService } from '../shared/services/pager.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  page = 1;
  limit = 15;
  totalUsers: number;
  pager: any = {};
  result: any;
  users: any;
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
  error: any;
  isSearching: boolean;
  searchUrl = '';
  currentSorting: string;
  order: boolean;

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private pagerService: PagerService,
  ) { }

  ngOnInit(): void {
    this.apiUrl = environment.userApiUrl;
    this.isError = false;
    this.isSearching = false;
    this.currentSorting = '&sort=username&order=asc';
    this.order = true;
    this.initializeUsers();
    this.initializeForm();
  }

  setPage(page: number): void {
    if (!this.totalUsers || page < 1 || page > this.pager.totalUsers) {
      return;
    }
    this.pager = this.pagerService.getPager(this.totalUsers, page, this.limit);
    console.log('pager server:', this.pager);
    console.log('paged users', this.users);
  }

  navigate(page: number): void {
    // if (page < 1 || page > this.totalUsers / this.limit) {
    //   this.isError = true;
    //   this.error = {
    //     message: "invalid page"
    //   };
    //   return;
    // }
    this.page = page;
    this.initializeUsers();
  }

  initializeUsers(): void {
    const offset = this.page - 1;
    console.log(this.apiUrl + '?offset=' + offset.toString() + '&limit=' + this.limit.toString() + this.currentSorting + this.searchUrl);
    this.httpService
      .get(this.apiUrl + '?offset=' + offset.toString() + '&limit=' + this.limit.toString() + this.currentSorting + this.searchUrl)
      .subscribe((res) => {
        this.isError = false;
        this.result = res;
        this.users = this.result.content;
        this.totalUsers = this.result.totalElements;
        this.setPage(this.page);
        if (this.searchUrl) {
          this.isSearching = true;
        }
      }, (err) => {
        this.isError = true;
        this.error = err.error;
        console.log('Error happened');
      });
  }

  searchUsers(usernameFilter, emailFilter, roleFilter): void {
    this.page = 1;
    const offset = this.page - 1;
    this.searchUrl = '';
    if (usernameFilter) {
      this.searchUrl = this.searchUrl.concat('&username=' + usernameFilter);
    }
    if (emailFilter) {
      this.searchUrl = this.searchUrl.concat('&email=' + emailFilter);
    }
    if (roleFilter) {
      switch (roleFilter) {
        case 'ADMIN':
          this.searchUrl = this.searchUrl.concat('&role=' + 1);
          break;
        case 'CUSTOMER':
          this.searchUrl = this.searchUrl.concat('&role=' + 2);
          break;
        case 'AGENT':
          this.searchUrl = this.searchUrl.concat('&role=' + 3);
          break;
      }
    }
    this.initializeUsers();
  }

  cancelSearch(): void {
    this.isSearching = false;
    this.page = 1;
    this.searchUrl = '';
    this.initializeUsers();
  }

  sortBy(sortString: string): void {
    this.page = 1;
    if (!this.currentSorting.includes(sortString)) {
      this.order = true;
    }
    else {
      this.order = !this.order;
    }
    if (this.order) {
      this.currentSorting = '&sort=' + sortString + '&order=asc';
    }
    else {
      this.currentSorting = '&sort=' + sortString + '&order=desc';
    }
    this.initializeUsers();
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
    this.httpService.post(this.apiUrl, this.addUserForm.value).subscribe((res) => {
      this.isError = false;
      this.initializeUsers();
      this.initializeForm();
    }, (err) => {
      this.isError = true;
      this.error = err.error;
    });
  }

  onSaveCSVFile(): void {
    this.httpService.get(environment.userApiUrl + '?sort=username').subscribe((res) => {
      let list: any;
      list = res;
      this.userService.saveUsersAsCSV(list.content);
    })
  }
}
