import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutLibraryComponent } from './scout-library.component';

describe('ScoutLibraryComponent', () => {
  let component: ScoutLibraryComponent;
  let fixture: ComponentFixture<ScoutLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoutLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
