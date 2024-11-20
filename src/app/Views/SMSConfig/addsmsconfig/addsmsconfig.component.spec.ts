import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsmsconfigComponent } from './addsmsconfig.component';

describe('AddsmsconfigComponent', () => {
  let component: AddsmsconfigComponent;
  let fixture: ComponentFixture<AddsmsconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsmsconfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsmsconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
