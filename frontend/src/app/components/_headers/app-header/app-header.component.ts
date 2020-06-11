import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { GroupService } from 'src/app/services/group.service';
import { ExpenseShare } from 'src/app/models/expense-share';
import { UserService } from 'src/app/services/user.service';
import { Expense, SplitType } from 'src/app/models/expense';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  currentUser: User;
  groupModalToggle = false;
  expenseModalToggle = false;
  paymentModalToggle = false;
  searchResult: User;
  groupName: FormControl;
  expenseTitle: FormControl;
  expenseTotal: FormControl;
  paymentNote: FormControl;
  paymentAmount: FormControl;
  groupUsers = new Set<User>();
  expenseUsers = new Set<User>();
  userShareArray: Array<ExpenseShare> = [];
  newUserShare: ExpenseShare;

  constructor(
    private router: Router, private authenticationService: AuthService,
    private groupService: GroupService, private userService: UserService
  ) {
    this.groupName = new FormControl();
    this.expenseTitle = new FormControl();
    this.expenseTotal = new FormControl();
    this.paymentAmount = new FormControl();
    this.paymentNote = new FormControl();
    this.userShareArray.push({userName: undefined, share: undefined});
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      currentUser => this.currentUser = currentUser
    );
  }

  logout() {
    console.log('logging out');
    this.authenticationService.logout();
    this.router.navigate(['/landing']);
  }

  toggleGroupModal() {
    this.groupModalToggle = !this.groupModalToggle;
    this.groupUsers.clear();
    this.searchResult = undefined;
  }

  toggleExpenseModal() {
    this.expenseModalToggle = !this.expenseModalToggle;
  }

  togglePaymentModal() {
    this.paymentModalToggle = !this.paymentModalToggle;
  }

  clearExpenseModal() {
    this.userShareArray = this.userShareArray.slice(0, 1);
    this.expenseTitle.reset();
    this.expenseTotal.reset();
  }

  receiveValue($event) {
    this.searchResult = $event;
  }

  addUserToCreateGroup() {
    this.groupUsers.add(this.searchResult);
  }

  createGroup() {
    // this.groupUsers.add(this.currentUser);
    this.groupService.createGroup(this.groupName.value, Array.from(this.groupUsers))
      .subscribe(
        res => {
          // this.authenticationService.addGroupToCurrentUser(res);
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    this.groupModalToggle = false;
  }

  addExpense() {
    const newExpense = new Expense();
    newExpense.title = this.expenseTitle.value;
    newExpense.total = +this.expenseTotal.value;
    newExpense.payer = this.currentUser.id;
    newExpense.split = SplitType.EXACT;

    this._setShares(newExpense, this.userShareArray);

    this.userService.addExpense(newExpense)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }

  _setShares(expense: Expense, userShares: ExpenseShare[]) {
    const payerShare: number =
      expense.total - userShares.map((userShare) => +userShare.share)
        .reduce((acc, curr) => acc + curr);

    expense.shareMap.set(this.currentUser.username, payerShare);
    userShares.forEach(userShare => {
      expense.shareMap.set(userShare.userName, +userShare.share);
    });
  }

  _addRow(index: number) {
    this.newUserShare = {userName: undefined, share: undefined};
    this.userShareArray.push(this.newUserShare);
    return true;
  }

  _deleteRow(index: number) {
    if (this.userShareArray.length === 1) {
      return false;
    } else {
      this.userShareArray.splice(index, 1);
      return true;
    }
  }

  recordPayment() {
    const newPayment = new Payment();
    newPayment.note = this.paymentNote.value;
    newPayment.amount = this.paymentAmount.value;
    newPayment.payer = this.currentUser.id;
    newPayment.payee = this.searchResult.id;

    this.userService.recordPayment(newPayment)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }

}
