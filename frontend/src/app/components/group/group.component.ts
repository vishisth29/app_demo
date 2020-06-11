import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';
import { User } from 'src/app/models/user';
import { Expense } from 'src/app/models/expense';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  group$: Group;
  groupMembers: User[];
  groupExpenses: Expense[];

  constructor(
    private route: ActivatedRoute,
    private authorizationService: AuthService,
    private groupService: GroupService,
    private userService: UserService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.groupService.getGroup(id)
      .subscribe(
        res => {
          console.log(res);
          this.group$ = res;
        },
        err => console.log(err)
      );
  }

  getGroupMembers() {
    this.groupService.getGroupMembers(this.group$.id)
      .subscribe(
        res => {
          console.log(res);
          this.groupMembers = res;
        },
        err => console.log(err)
      );
  }

  getGroupExpenses() {

  }

  createExpense() {
    // console.log('Halo!');

    // this.groupService.createGroupExpense(expense).subscribe();
  }

}
