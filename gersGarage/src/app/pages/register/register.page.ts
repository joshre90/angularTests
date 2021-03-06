import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  //form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  credentialsForm: FormGroup;
  

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    //this.form=this.credentialsForm.value;
    this.authService.register(this.credentialsForm.value).subscribe(
      data => {
        console.log(data);
        //console.log(this.form);
        console.log(this.credentialsForm.value);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isSignUpFailed = true;
      }
    );
  }

  goToLogin() {
    this.route.navigate(['/login']);
  }

}
