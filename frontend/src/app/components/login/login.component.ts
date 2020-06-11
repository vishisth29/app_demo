import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private authenticationService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/user';
  }

  login() {
    const pwHash: string = sha256(this.loginForm.controls.password.value);

    this.authenticationService
      .login(this.loginForm.controls.username.value, pwHash)
      .pipe(first())
      .subscribe(
        res => {
            this.router.navigate([this.returnUrl]);
            console.log(res);
        },
        error => {
            console.log(error);
      });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.login();
  }

}
