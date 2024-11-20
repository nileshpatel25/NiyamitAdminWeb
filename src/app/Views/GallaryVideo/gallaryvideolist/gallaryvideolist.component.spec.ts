import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallaryvideolistComponent } from './gallaryvideolist.component';

describe('GallaryvideolistComponent', () => {
  let component: GallaryvideolistComponent;
  let fixture: ComponentFixture<GallaryvideolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallaryvideolistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GallaryvideolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
