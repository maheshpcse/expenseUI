import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
})
export class ExpenseFormComponent implements OnInit {

  expense: any = null;
  currency: any = null;
  amount: any = null;
  description: any = null;
  paidOn: any = null;
  proof: any = null;
  rating: any = null;
  ratingName: any = null;
  @ViewChild('expenseForm', { static: false }) expenseFormRef: NgForm;

  public myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false,
    disableUntil: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() - 1,
      day: new Date().getDate(),
    }
  };

  viewType: any = 'table';
  public sortBy: any = '';
  public sortOrder: any = 'asc';
  public rowsOnPage: any = 10;
  public rowsOnPageSet: any = [5, 10, 25];
  page: any = 1;
  expenseList: any = [];

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    for (let i = 0; i < 25; i++) {
      this.expenseList.push({
        expense: `test_item ${i + 1}`,
        cost: Math.abs(Math.round(Math.random() * 999)),
        // tslint:disable-next-line:max-line-length
        quantity: Math.abs(Math.round(Math.random() * 999)) / 2 === 0 ? `${Math.abs(Math.round(Math.random() * 999))} gms` : `${Math.abs(Math.round(Math.random() * 999))} kgs`,
        type: '-',
        paidOn: `2021-01-${i + 1}`,
        rating: Math.abs(Math.round(Math.random() * 9))
      });
    }
  }

  onDateChanged(event: IMyDateModel) {
    console.log(event);
  }

  onSelectRating(value: any) {
    this.ratingName =
      Number(value) === 1
        ? 'Bad'
        : Number(value) === 2
        ? 'Average'
        : Number(value) === 3
        ? 'Good'
        : Number(value) === 4
        ? 'Exellent'
        : Number(value) === 5
        ? 'Outstanding'
        : '';
  }

  pageChanged(event: any) {
    console.log(event);
    this.page = event;
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  resetForm() {
    if (this.expenseFormRef) {
      this.expenseFormRef.reset();
    }
    this.expense = null;
    this.currency = null;
    this.amount = null;
    this.description = null;
    this.paidOn = null;
    this.proof = null;
    this.rating = null;
    this.ratingName = null;
  }
}
