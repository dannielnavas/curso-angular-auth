import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faAngleDown,
  faBell,
  faClose,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  user!: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.profile().subscribe((response) => {
      this.user = response;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
