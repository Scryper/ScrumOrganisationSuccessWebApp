import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySprintComponent } from './modify-sprint.component';

describe('ModifySprintComponent', () => {
  let component: ModifySprintComponent;
  let fixture: ComponentFixture<ModifySprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySprintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
