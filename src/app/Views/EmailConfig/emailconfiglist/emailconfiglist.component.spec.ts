import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailconfiglistComponent } from './emailconfiglist.component';

describe('EmailconfiglistComponent', () => {
  let component: EmailconfiglistComponent;
  let fixture: ComponentFixture<EmailconfiglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailconfiglistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailconfiglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
