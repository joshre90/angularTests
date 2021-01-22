import { Component, OnInit} from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Storage } from '@ionic/storage';
import { Constants } from '../_helper/constants'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  isLoggedIn = false;
  content ='';
  contentVehicle ='';
  
  
  constructor(private tokenStorage: TokenStorageService, private userService:UserService, private storage: Storage, public isVehicle : Constants) {}

  ngOnInit(){
    this.userService.getVehicleList().subscribe(data => {
      this.contentVehicle = data;
      console.log('content2',this.contentVehicle)
      console.log('content2 Length',this.contentVehicle.length)
      if(this.contentVehicle.length >0){
        this.isVehicle.registerState = true;
      }
      
      console.log('Car exist? : ',this.isVehicle.registerState)

    //   this.storage.ready().then(() => this.storage.set("hasCars", "true"))

    //   this.storage.get('hasCars').then(valueStr => {
    //     let value = JSON.parse(valueStr);
    
    //      // Modify just that property
    //      value = true;
    
    //      // Save the entire data again
    //      this.storage.set('hasCars', JSON.stringify(value));
    //      this.storage.get('hasCars').then((val) => {
    //       console.log('Your car is: ', val);
    //     });
    // });


      //this.storage.set('hasCars', 'true');
      // this.storage.get('hasCars').then((val) => {
      //   console.log('Your car is: ', val);
      // });
    },
    err => {
      this.contentVehicle =  err.error;
      console.log(this.contentVehicle);
      this.isVehicle.registerState=false;
      
      console.log('Car exist? : ',this.isVehicle.registerState)

    //   this.storage.get('hasCars').then(valueStr => {
    //     let value = JSON.parse(valueStr);
    
    //      // Modify just that property
    //      value = false;
    
    //      // Save the entire data again
    //      this.storage.set('hasCars', JSON.stringify(value));

    //      this.storage.get('hasCars').then((val) => {
    //       console.log('Error! Your car is: ', val);
    //     });
    // });
    // this.storage.get('hasCars').then((val) => {
    //   console.log('Error! Your car is: ', val);
    // });
    }
  );


    this.userService.getEngineList().subscribe(
      data => {
        this.content = data;
        console.log(this.content)

        let incoming = JSON.parse(data);
        console.log(incoming);

        var dataArray = [];
        for(var o in incoming) {
            dataArray.push(incoming[o].name);
        }
        console.log(dataArray)

      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }



  logOut(){
    this.tokenStorage.signOut();
    //isCar=true;
  }

}
