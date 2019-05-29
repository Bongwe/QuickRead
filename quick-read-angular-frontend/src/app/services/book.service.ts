import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BookShelf} from "../models/BookShelf";

@Injectable({providedIn: 'root'})

export class BookService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient){}

  getAll() {
    return this.http.get(this.baseUrl +  '/api/v1/books');
  }

  postSuggestedBook(bookShelf: BookShelf) {
    let url = this.baseUrl + '/api/v1/bookshelf/add';
    return this.http.post<any>(url, bookShelf)
  }

}
