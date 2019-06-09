import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BookShelf} from "../models/BookShelf";
import {Observable} from "rxjs";
import {BookSection} from "../models/BookSection";
import {SelectedOpponent} from "../models/SelectedOpponent";

@Injectable({providedIn: 'root'})

export class SectionService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient){}

  updateSection(bookSection: BookSection): Observable<BookSection> {
    let url = this.baseUrl + '/api/v1/section/update';
    return this.http.post<any>(url, bookSection)
  }

  updateOpponent(bookSection: SelectedOpponent): Observable<BookSection> {
    let url = this.baseUrl + '/api/v1/section/opponent';
    return this.http.post<any>(url, bookSection)
  }
}
