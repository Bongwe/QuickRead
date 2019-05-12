import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {qrAccount} from "../models/Account";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})

export class AccountService {

  constructor(private http: HttpClient){}

  getAll() {
    return this.http.get('http://localhost:8080/api/v1/accounts');
  }

  createAccount(account: qrAccount) {
    let url = 'http://localhost:8080/api/v1/account';
    return this.http.post<any>(url, account)
      .pipe(
        map(account => {
          console.log(account);
          return account;
        })
      );
  }
}
