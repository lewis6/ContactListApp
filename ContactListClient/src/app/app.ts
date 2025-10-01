import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactListComponent } from './contacts/contact-list/contact-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContactListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ContactListClient');
}
