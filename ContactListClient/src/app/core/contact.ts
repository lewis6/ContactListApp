import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Contact } from './contact.interface'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }
  
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiURL}/contacts`);
  }

  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiURL}/contacts/${id}`);
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiURL}/contacts/`, contact);
  }

  updateContact(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiURL}/contacts/${id}`, contact);
  }

  deleteContact(id: number): Observable<Contact> {
    return this.http.delete<Contact>(`${this.apiURL}/contacts/${id}`);
  }


}
