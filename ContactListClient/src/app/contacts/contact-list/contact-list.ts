import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ContactToolbar } from '../contact-toolbar/contact-toolbar';
import { ContactSearch } from '../contact-search/contact-search';
import { ContactAddButton } from '../contact-add-button/contact-add-button';
import { ContactTable } from "../contact-table/contact-table";
import { Contact } from '../../core/contact.interface';
import { ContactService } from '../../core/contact';
import { AuthService } from '../../auth/auth';

@Component({
  selector: 'app-contact-list',
  imports: [ContactToolbar, ContactSearch, ContactAddButton, ContactTable],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactListComponent implements OnInit {

@ViewChild('contactTable') contactTable!: ContactTable;
filterValue = "";


  constructor(private contactService: ContactService, private ref: ChangeDetectorRef, private auth: AuthService) {

  }

  ngOnInit() {

  }

  onContactAdded(event: any) {
    this.contactTable.onContactAdded();
  }

  onSearch(event: any) {
    console.log("Parent received: ", event);
    this.filterValue = event;
  }
}
