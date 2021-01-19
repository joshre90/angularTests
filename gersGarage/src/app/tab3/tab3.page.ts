import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  content: string;
  isLoggedIn = false;

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;

        setTimeout(() => {
          this.isLoggedIn = true;
      }, 300);

        //this.isLoggedIn=true;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  goToAdmin(){
    this.route.navigate(['tab-admin']);
  }

}