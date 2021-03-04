import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

type Token = {
  access_token: string;
};
type User = {
  username: string;
  password: string;
  firstname?: string;
  lastname?: string;
};

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})

export class LoginModalComponent implements OnInit {
  token: Token = null;
  user: User = {username: '', password: '', firstname: ''};

  constructor(private http: HttpClient) {
  }

  login(): void {
    console.log('user:', this.user);
    this.http.post(environment.loginUrl,
      JSON.stringify(this.user), {
        headers: new HttpHeaders({'Content-type': 'application/json ; charset=UTF-8'}),
        withCredentials: true,
        observe: 'response'
      })
      .subscribe(res => {
        console.log(res);
      }, error => console.log('error:', error));
  }

  ngOnInit(): void {
  }

}
