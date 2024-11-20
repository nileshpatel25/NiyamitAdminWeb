import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsconfiglistComponent } from './smsconfiglist.component';

describe('SmsconfiglistComponent', () => {
  let component: SmsconfiglistComponent;
  let fixture: ComponentFixture<SmsconfiglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsconfiglistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsconfiglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
