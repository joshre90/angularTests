import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.page.html',
  styleUrls: ['./board-admin.page.scss'],
})
export class BoardAdminPage implements OnInit {

 
  content: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}