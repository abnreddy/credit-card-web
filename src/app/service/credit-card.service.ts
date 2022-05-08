import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreditCardModel } from '../model/credit-card.model';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:8080/api/credit-card';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(public http: HttpClient) { }

  create(data: any) {
      return this.http.post<CreditCardModel>(baseUrl+'/add', data, {
        headers: {'Content-Type': 'application/json'}
      }).toPromise();
    }

  getAll() {
      return this.http.get<CreditCardModel[]>(baseUrl+'/get-all').toPromise();
  }

  get(id: any): Observable<CreditCardModel> {
      return this.http.get(`${baseUrl}/${id}`);
  }

}
