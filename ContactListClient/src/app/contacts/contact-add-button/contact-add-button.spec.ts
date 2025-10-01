import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddButton } from './contact-add-button';

describe('ContactAddButton', () => {
  let component: ContactAddButton;
  let fixture: ComponentFixture<ContactAddButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactAddButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactAddButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
