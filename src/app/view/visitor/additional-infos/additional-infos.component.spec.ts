import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInfosComponent } from './additional-infos.component';

describe('AdditionalInfosComponent', () => {
  let component: AdditionalInfosComponent;
  let fixture: ComponentFixture<AdditionalInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalInfosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
