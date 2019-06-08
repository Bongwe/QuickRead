import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AccountDTO} from "../models/dto/AccountDTO";
import {qrAccount} from "../models/Account";

@Injectable({providedIn: 'root'})

export class AccountService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient){}

  getAll() {
    const objectObservable = this.http.get(this.baseUrl +  '/api/v1/accounts');
    return objectObservable;
  }

  createAccount(account: qrAccount) {
    let url = this.baseUrl + '/api/v1/account';
    return this.http.post<any>(url, account)
  }

  updateAccount(account: qrAccount) {
    let url = this.baseUrl + '/api/v1/account/update';
    return this.http.post<any>(url, account)
  }

  accountLogin(account: qrAccount) {
    let url = this.baseUrl + '/api/v1/login';
    return this.http.post<any>(url, account)
  }
}
