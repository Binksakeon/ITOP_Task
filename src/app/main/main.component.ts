import { Component, OnInit } from '@angular/core';
import { CalculationAndActionsService } from '../calculation-and-actions.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private calculationServie: CalculationAndActionsService){}
  //list with all objects from api
  rates_to_uah:{rate:number,cc:string}[]=[];
  //list of currencies needed to convert to
  currencies_to: string[] = ['UAH','USD','EUR','GBP','JPY','PLN','KZT'];
  //list of objects with currencies needed to convert to
  rates_of_currencies_to!: {rate:number,cc:string}[];
  //values of first input+select
  first_value:number=0;
  first_currency:string='UAH';
  //values of second input+select
  second_value:number=0;
  second_currency:string='UAH';
  //rates of currencies
  first_rate!:number;
  second_rate!:number;
  //changing rates based on first and second currency names
  change() {
    [this.first_rate,this.second_rate] = this.calculationServie.changeRates(this.first_currency,this.second_currency);
  }
  //getting information from the api
  async ngOnInit() {
    this.rates_to_uah = await this.calculationServie.fetchData()
    //filling list of objects with currencies needed to convert
    this.rates_of_currencies_to = this.calculationServie.findRates();
    //iniliazing rates of currensies
    this.change();
  }
  //changing second value based on first value+first currency/rate
  changingSecondValue(){
    this.change();
    this.second_value = this.calculationServie.calculateSecondValue(this.first_value);
  }
  //changing first value based on second value+first currency/rate
  changingFirstValue(){
    this.change();
    this.first_value = this.calculationServie.calculateFirstValue(this.second_value);
  }
}
