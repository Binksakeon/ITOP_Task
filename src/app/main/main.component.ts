import { Component, OnInit } from '@angular/core';
import { CalculationAndActionsService } from '../calculation-and-actions.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private calculationServise: CalculationAndActionsService) {}
  //list with all objects from api
  rates_to_uah: { rate: number; cc: string }[] = [];
  //list of currencies needed to convert to
  currencies_to: string[] = ['UAH', 'USD', 'EUR', 'GBP', 'JPY', 'PLN', 'KZT'];
  //list of objects with currencies needed to convert to
  rates_of_currencies_to!: { rate: number; cc: string }[];
  //values of first input+select
  first_value = new FormControl(0);
  first_currency = new FormControl('UAH');
  //values of second input+select
  second_value = new FormControl(0);
  second_currency = new FormControl('UAH');
  //rates of currencies
  first_rate: number = 0;
  second_rate: number = 0;
  //changing rates based on first and second currency names
  changeRate(main_currency: FormControl, dependent_currency: FormControl) {
    [this.first_rate, this.second_rate] = this.calculationServise.changeRates(
      this.rates_to_uah,
      main_currency.value,
      dependent_currency.value
    );
  }
  //getting information from the api
  ngOnInit() {
    this.calculationServise
      .getData(
        'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
      )
      .subscribe((response: any) => {
        this.rates_to_uah = response;
        //filling list of objects with currencies needed to convert
        this.rates_of_currencies_to = this.calculationServise.findRates(
          this.rates_to_uah,
          this.currencies_to
        );
      });
  }
  //changing currency, rate and value
  changeCurrency(
    elem_to_change: FormControl,
    change_from_elem: FormControl,
    main_currency: FormControl,
    dependent_currency: FormControl
  ) {
    this.changeRate(main_currency, dependent_currency);
    this.changeValue(elem_to_change, change_from_elem);
  }
  //changing value based on another value+currency/rate
  changeValue(elem_to_change: FormControl, change_from_elem: FormControl) {
    elem_to_change.setValue(
      this.calculationServise.calculateValue(
        change_from_elem.value,
        this.first_rate,
        this.second_rate
      )
    );
  }
}
