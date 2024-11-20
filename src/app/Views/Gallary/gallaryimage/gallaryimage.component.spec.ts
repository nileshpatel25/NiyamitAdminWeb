import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallaryimageComponent } from './gallaryimage.component';

describe('GallaryimageComponent', () => {
  let component: GallaryimageComponent;
  let fixture: ComponentFixture<GallaryimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallaryimageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GallaryimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
