import { ChangeDetectorRef, Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../../core/contact.interface'
import { ContactService } from '../../core/contact';
import { MatSnackBar} from '@angular/material/snack-bar';
import { NgxMaskDirective } from 'ngx-mask';
import { AuthService } from '../../auth/auth';

@Component({
  selector: 'app-contact-modal',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    DragDropModule,
    ReactiveFormsModule,
    NgxMaskDirective
],
  templateUrl: './contact-modal.html',
  styleUrl: './contact-modal.css'
})
export class ContactModal {
  private snackBar = inject(MatSnackBar);
  isNew: boolean;
  contact: Contact;
  contactForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ContactModal>, 
    private fb: FormBuilder, private contactService: ContactService, private ref: ChangeDetectorRef,
    private auth: AuthService) {
    // If data is passed (editing), use it; otherwise, create a blank contact (adding)
    this.contact = data.contact
      ? { ...data.contact }
      : { contactID: 0, name: '', phone: '', fax: '', email: '', notes: '', lastUpdateDate: '', lastUpdateUserName: '' };
      this.isNew = data.isNew;
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.email]],
      fax: ['', [Validators.pattern(/^\d{10}$/)]],
      notes: ['', []]
    });

    if (data) {
      this.contactForm.patchValue(this.contact);
    }
  }

  get name() {
    return this.contactForm.get('name');
  }

  get phone() {
    return this.contactForm.get('phone');
  }

  get fax() {
    return this.contactForm.get('fax');
  }

  get email() {
    return this.contactForm.get('email');
  }

  onSave(): void {
    if (this.contactForm.valid) {
      const contactData: Contact = {...this.contact, ...this.contactForm.value,
        lastUpdateDate: new Date().toISOString(), lastUpdateUserName: this.auth.getUsername()}
      if (this.isNew) {
        this.contactService.createContact(contactData).subscribe({
          next: (result) => {
            this.dialogRef.close(result)
            this.snackBar.open("User created", "OK", { duration: 3000 });
          },
          error: (err) => {
            console.log("Error creating contact", err);
          }
        });
      } else {
        this.contactService.updateContact(this.contact.contactID, contactData).subscribe({
          next: (result) => {
            this.dialogRef.close(result)
            this.snackBar.open("User updated", "OK", { duration: 3000 });
          },
          error: (err) => {
            console.log("Error updating contact", err);
          }
        });
      }
      this.ref.markForCheck();
      
    } else {
      // mark all fields as touched so errors show up
      this.contactForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
