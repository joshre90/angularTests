import { Component } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  isLoggedIn = false;
  
  constructor(private tokenStorage: TokenStorageService) {}

  logOut(){
    this.tokenStorage.signOut();
  }

}
