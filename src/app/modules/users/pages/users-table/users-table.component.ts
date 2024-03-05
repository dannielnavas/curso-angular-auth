import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../services/auth.service';
import { UsersService } from '../../../../services/users.service';
import { DataSourceUser } from './data-source';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user: any;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.user = this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.dataSource.init(users as any[]);
    });
  }
}
