import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpickuplocationComponent } from './addpickuplocation.component';

describe('AddpickuplocationComponent', () => {
  let component: AddpickuplocationComponent;
  let fixture: ComponentFixture<AddpickuplocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpickuplocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpickuplocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
