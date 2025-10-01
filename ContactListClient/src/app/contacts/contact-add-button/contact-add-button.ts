import { Component, inject, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContactModal } from '../contact-modal/contact-modal';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-contact-add-button',
  imports: [MatButtonModule, MatIconModule, ContactModal],
  templateUrl: './contact-add-button.html',
  styleUrl: './contact-add-button.css'
})
export class ContactAddButton {
  readonly dialog = inject(MatDialog);
  @Output() contactAdded = new EventEmitter<any>();


  openDialog() {
    const dialogRef = this.dialog.open(ContactModal, {
      data: {
        contact: null,
        isNew: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("New contact dialog closed", result);
      if (result) {
        this.contactAdded.emit(result);
      }
    });
  }
}
