import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, Event, NavigationStart, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: User;

  constructor(
    private authenticationServce: AuthService,
  ) { }

  ngOnInit() {
    this.authenticationServce.currentUser.subscribe(
      currentUser => {
        this.currentUser = currentUser;
        console.log(this.currentUser);
      }
    );
  }

}
