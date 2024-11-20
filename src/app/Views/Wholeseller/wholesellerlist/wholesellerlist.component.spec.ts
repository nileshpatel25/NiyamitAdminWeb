import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesellerlistComponent } from './wholesellerlist.component';

describe('WholesellerlistComponent', () => {
  let component: WholesellerlistComponent;
  let fixture: ComponentFixture<WholesellerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WholesellerlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WholesellerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
