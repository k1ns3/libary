import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutLibraryLoginComponent } from './scout-library-login.component';

describe('ScoutLibraryLoginComponent', () => {
  let component: ScoutLibraryLoginComponent;
  let fixture: ComponentFixture<ScoutLibraryLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoutLibraryLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutLibraryLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
