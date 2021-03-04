import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout(environment.sessionInfoUrl)
      .subscribe(res => {
        this.authService.isLoggedIn = false;
        this.router.navigate(['/home']).then(() => console.log('redirect to dashboard'));
      }, error => {
        console.log('something went wrong');
      });
  }
}
