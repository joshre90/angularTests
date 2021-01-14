import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.page.html',
  styleUrls: ['./board-moderator.page.scss'],
})
export class BoardModeratorPage implements OnInit {

  content: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getModeratorBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}