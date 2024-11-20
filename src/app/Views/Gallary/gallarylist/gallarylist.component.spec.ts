import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallarylistComponent } from './gallarylist.component';

describe('GallarylistComponent', () => {
  let component: GallarylistComponent;
  let fixture: ComponentFixture<GallarylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallarylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GallarylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
