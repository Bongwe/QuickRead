import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {qrAccount} from "../models/Account";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})

export class AccountService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient){}

  getAll() {
    return this.http.get(this.baseUrl +  '/api/v1/accounts');
  }

  createAccount(account: qrAccount) {
    let url = this.baseUrl + '/api/v1/account';
    return this.http.post<any>(url, account)
  }

  accountLogin(account: qrAccount) {
    let url = this.baseUrl + '/api/v1/login';
    return this.http.post<any>(url, account)
  }
}
