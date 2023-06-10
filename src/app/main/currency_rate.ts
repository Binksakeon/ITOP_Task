export class CurrencyRate {
    currency_name!: string;
    currencies_to: {rate:number,cc:string}[]=[];
    actual_currency_rate!:number;

    value: number = 1;
    convert_to_name: string = 'UAH'; //default value
    
    constructor(currency_rate:{rate:number,cc:string},currencies_to_convert:{rate:number,cc:string}[]) { 
        this.currency_name=currency_rate.cc;
        this.actual_currency_rate = currency_rate.rate;
        this.currencies_to = currencies_to_convert;
        // :)
        if(currency_rate.cc==='RUB') this.actual_currency_rate = 0;
    }
    //converting function
    convertTo(){
        if(this.convert_to_name==='UAH')
            return +(this.value*this.actual_currency_rate).toFixed(6);
        let rate_of_convert_to = this.currencies_to.find((elem)=>{return elem.cc===this.convert_to_name})?.rate;
        if(rate_of_convert_to!==undefined)
            return +(this.value*(this.actual_currency_rate/rate_of_convert_to)).toFixed(6);
        else return 0;
    }
}