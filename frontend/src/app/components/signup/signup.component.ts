import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  returnUrl: string;

  constructor(
    private userService: UserService,
    private authenticationService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
  }

  ngOnInit() {
    console.log('signup component');
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/login';
  }

  signUp() {
    const pwHash: string = sha256(this.signUpForm.controls.password.value);

    this.userService
      .register(
        this.signUpForm.controls.username.value,
        this.signUpForm.controls.name.value,
        pwHash
      ).pipe(first())
      .subscribe(
        res => {
            this.router.navigate([this.returnUrl]);
            console.log(res)
        },
        error => {
            console.log(error);
      });
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    this.signUp();
  }

}
