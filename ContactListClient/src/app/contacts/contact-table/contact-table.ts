import { ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ContactModal } from '../contact-modal/contact-modal';
import { Contact } from '../../core/contact.interface'
import { ContactService } from '../../core/contact';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { PhonePipe } from './phone-pipe';

@Component({
  selector: 'app-contact-table',
  imports: [MatTableModule, ContactModal, CommonModule, NgxMaskDirective, PhonePipe, MatTable],
  templateUrl: './contact-table.html',
  styleUrl: './contact-table.css'
})
export class ContactTable implements OnInit, OnChanges {
  contacts: Contact[] = [];
  displayedColumns: string[] = ['name', 'phone', 'fax', 'email', 'lastUpdateDate'];
  dataSource = this.contacts;
  @ViewChild(MatTable) table!: MatTable<Contact>;
  @Input() filterValue: string = '';

    readonly dialog = inject(MatDialog);

  constructor(private ref: ChangeDetectorRef, private contactService: ContactService) {

  }

  ngOnInit() {
    this.contactService.getContacts().subscribe( contacts => {
      this.contacts = contacts;
      this.dataSource = this.contacts;
      this.ref.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Changes");
    if (changes['filterValue']) {
      this.applyFilter();
    }
  }

  onContactAdded() {
    this.renderContactListRows();
  }

  openDialog(contact: Contact): void {
    const dialogRef = this.dialog.open(ContactModal, {
      data: {
        contact,
        isNew: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.renderContactListRows();
      }
    });
  }

  renderContactListRows() {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
      this.dataSource = [...contacts];
      this.table.renderRows();
      this.ref.markForCheck();
    });
  }

  applyFilter() {
    if (!this.filterValue) {
      this.dataSource = [...this.contacts];
    } else {
      const term = this.filterValue.toLowerCase();
      this.dataSource = this.contacts.filter(c =>
        c.name.toLowerCase().includes(term)
      );
    }
  }
}
