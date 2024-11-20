import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactuslistComponent } from './contactuslist.component';

describe('ContactuslistComponent', () => {
  let component: ContactuslistComponent;
  let fixture: ComponentFixture<ContactuslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactuslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactuslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
