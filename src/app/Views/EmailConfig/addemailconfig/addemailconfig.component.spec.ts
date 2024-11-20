import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddemailconfigComponent } from './addemailconfig.component';

describe('AddemailconfigComponent', () => {
  let component: AddemailconfigComponent;
  let fixture: ComponentFixture<AddemailconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddemailconfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddemailconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
