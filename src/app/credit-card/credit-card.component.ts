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
        this.form.reset();
      }

rowData: any = [];

columnDefs = [
             { field: 'name' },
             { field: 'cardNumber' },
             { field: 'balance' },
             { field: 'cardLimit' }
         ];


async onSubmit(): Promise<any> {
     this.submitted = true;
     if (this.form.invalid) {
           return;
     }
     console.log(JSON.stringify(this.form.value, null, 2));
     console.log(JSON.stringify(this.creditCardModel));
     let result = await this.creditCardService.create(JSON.stringify(this.form.value))
     this.message = result ? 'Card Number ' + result + ' added successfully!' : 'Something went wrong';
     console.log(this.message);
     this.retrieveAll()
 }

 async retrieveAll(): Promise<any> {
      this.rowData = await this.creditCardService.getAll();
 }

 changeValue(){
  return this.form.value.cardNumber.replace(/\d{4}(?=.)/g, '$& ');
 }

}





