import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import Validation from '../utils/validation';
import { CreditCardService } from '../service/credit-card.service'
import { CreditCardModel } from '../model/credit-card.model'



@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

   creditCardModel = new CreditCardModel()
   message: any;

   form: FormGroup = new FormGroup({
      name: new FormControl(''),
      cardNumber: new FormControl(''),
      cardLimit: new FormControl('')
    });

    submitted = false;

    constructor(public formBuilder: FormBuilder, public creditCardService: CreditCardService) {}

    ngOnInit() {
      this.message = null;
      this.retrieveAll()
      this.form = this.formBuilder.group(
        {
          name: ['', Validators.required],
          cardLimit: ['', Validators.required],
          cardNumber: ['', [Validators.required]]
        },
        {
          validators: [Validation.validate('cardNumber')]
        }
      );
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

   onReset(): void {
     this.submitted = false;
     this.message = null
     this.form.reset();
   }

 rowData: any = [];

columnDefs = [
             { field: 'name', filter: true, width:300 },
             { field: 'cardNumber', filter: true, width: 300 },
             { field: 'balance', filter: true, },
             { field: 'cardLimit', filter: true, }
         ];


async onSubmit(): Promise<any> {
     this.message = null;
     this.submitted = true;
     if (this.form.invalid) {
           return;
     }
     this.form.value.cardNumber = this.form.value.cardNumber.replace(/\s/g, "")
     console.log(JSON.stringify(this.form.value, null, 2));
     console.log(JSON.stringify(this.creditCardModel));
     let result = await this.creditCardService.create(JSON.stringify(this.form.value))
     this.message = result ? 'Card Number ' + result + ' added successfully!' : 'Something went wrong';
     console.log(this.message);
     this.retrieveAll()
 }

 async retrieveAll(): Promise<any> {
      let results = await this.creditCardService.getAll();
      if(results!==undefined){
       results.forEach((data: CreditCardModel, index: any) => {
        if(results!==undefined){
             results[index].balance = "£" + data.balance
             results[index].cardLimit = "£" + data.cardLimit
             results[index].cardNumber = this.changeValue(data.cardNumber)
         }
       })
      }
      this.rowData = results

 }

 changeValue(cardNumber: any) {
  return cardNumber.toString().replace(/\d{4}(?=.)/g, '$& ');
 }

}





