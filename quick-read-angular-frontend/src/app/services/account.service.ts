import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {qrAccount} from "../models/Account";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})

export class AccountService {
  baseUrl: string = "http://obomvu.eastus.cloudapp.azure.com:8090/api/v1";

  constructor(private http: HttpClient){}

  getAll() {
    return this.http.get(this.baseUrl +  '/accounts');
  }

  createAccount(account: qrAccount) {
    let url = this.baseUrl + '/account';
    return this.http.post<any>(url, account)
      .pipe(
        map(account => {
          console.log(account);
          return account;
        })
      );
  }
}
