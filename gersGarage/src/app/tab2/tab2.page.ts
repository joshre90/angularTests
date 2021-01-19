import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  user_id:'';

  content: string;
  data= {"First_name": "Ionic",
  "Last_name": "Tests",
  "Phone": "0838944819",
  "Comments": "There is no wheel in the car",
  "Status": "Booked",
  "Date" : "2020-01-22",
  "Slot" : {"s2": "5fdcbaa3c4fc5c163d43f7b5"}}

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      //this.isLoggedIn = true;
      this.user_id = this.tokenStorage.getUser().id;
      console.log(this.user_id)
      this.data.Slot.s2=this.user_id;
    }

  }


  bookService(): void {
    console.log('Before post:',this.data);
    this.userService.postBooking(this.data).subscribe(
      data => {
      console.log(data);
    }, err=> {
      //this.content = JSON.parse(err.error).message;
      this.content = err.error.message;
      console.log('Error: ',this.content);
    });
  }

}
