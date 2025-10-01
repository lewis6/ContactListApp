import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactToolbar } from './contact-toolbar';

describe('ContactToolbar', () => {
  let component: ContactToolbar;
  let fixture: ComponentFixture<ContactToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactToolbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactToolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
