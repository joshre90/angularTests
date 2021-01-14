import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  credentialsForm: FormGroup;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {

      this.credentialsForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]] });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  

  onSubmit(): void {
    console.log(this.credentialsForm.value);
    this.authService.login(this.credentialsForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        console.log('Roles:',this.roles);
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  logOut(){
    this.tokenStorage.signOut();
    this.isLoggedIn = false;
  }

  reloadPage(): void {
    window.location.reload();
  }

  goToRegister() {
    this.route.navigate(['/register']);
  }

}