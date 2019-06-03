import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {qrAccount} from "../models/Account";
import {environment} from "../../environments/environment";
import {Settings} from "../models/Settings";

@Injectable({providedIn: 'root'})

export class SettingsService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient){}

  setSettings(settings: Settings) {
    let url = this.baseUrl + '/api/v1/settings/set';
    return this.http.post<any>(url, settings)
  }
}
