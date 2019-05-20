import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})

export class BookService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient){}

  getAll() {
    return this.http.get(this.baseUrl +  '/api/v1/books');
  }
}
