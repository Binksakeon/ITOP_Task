import { Component, OnInit } from '@angular/core';
import { CurrencyRate } from './currency_rate';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  rates_to_uah! :{rate:number,cc:string}[];
  //list of currencies needed to convert
  currencies: string[] = ['CAD','KZT','SEK','CHF','PLN','TRY','RUB'];
  //list of currencies needed to convert to
  currencies_to: string[] = ['UAH','USD','EUR','GBP','JPY'];
  //list of objects with currencies needed to convert to
  rates_of_currencies_to!: {rate:number,cc:string}[];

  rates:CurrencyRate[]=[];
  async ngOnInit() {
    let data= await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    this.rates_to_uah = await data.json();
    //filling list of objects with currencies needed to convert to
    this.rates_of_currencies_to = this.rates_to_uah.filter((elem)=>{
      return this.currencies_to.includes(elem.cc,0)
    });
    
    this.currencies.forEach((currency_name)=>{
      //list of objects with currencies needed to convert
      let needed_to_convert = this.rates_to_uah.find((elem)=>{return elem.cc===currency_name});
      if(needed_to_convert!==undefined)
        //list of objects of the CurrencyRate class
        this.rates.push(new CurrencyRate(needed_to_convert,this.rates_of_currencies_to));
    });
  }


}
