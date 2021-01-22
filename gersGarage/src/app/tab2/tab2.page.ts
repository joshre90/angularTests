import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Constants } from '../_helper/constants'


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  

  //isVehicle=true;
  user_id:'';


  content: string;
  data= {"First_name": "Ionic",
  "Last_name": "Tests",
  "Phone": "0838944819",
  "Comments": "There is no wheel in the car",
  "Status": "Booked",
  "Date" : "2020-01-22",
  "Slot" : {"s2": "5fdcbaa3c4fc5c163d43f7b5"}}

  vehicle={
    "Licence": "DLSO32K",
    "id_user": "5ffe3ce68c8c81fd078df20a",
    "engine": "Petrol",
    "vehicle_type": "Minivan",
    "make": "Nissan Titan"
};

  constructor(private userService: UserService, private tokenStorage: TokenStorageService, public alertController: AlertController, private route: Router,
  private storage: Storage, public isVehicle : Constants) {}

  ionViewDidEnter() {
    if (!this.isVehicle.registerState){
      console.log('later',this.isVehicle)
      this.presentAlertConfirm();
    }
  }
  
  

  ngOnInit(): void {


    console.log('tab2 init');

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

  saveVehicle(): void {
    console.log('Before post:',this.vehicle);
    this.userService.postVehicle(this.vehicle).subscribe(
      data => {
      console.log(data);
    }, err=> {
      //this.content = JSON.parse(err.error).message;
      this.content = err.error.message;
      console.log('Error: ',this.content);
    });
  }




  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Sorry!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
              this.route.navigate(['/tabs/tab1']);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
