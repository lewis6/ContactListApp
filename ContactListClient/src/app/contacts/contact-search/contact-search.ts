import { Component, EventEmitter, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-contact-search',
  imports: [MatIconModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './contact-search.html',
  styleUrl: './contact-search.css'
})
export class ContactSearch {
  value: string = "";
  @Output() search = new EventEmitter<any>();

  clearValue(): void {
    this.value = "";
  }

  onSearch(): void {
    console.log("Value =", this.value);
    this.search.emit(this.value);
  }
}



