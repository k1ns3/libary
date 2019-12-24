import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutLibraryTableComponent } from './scout-library-table.component';

describe('ScoutLibraryTableComponent', () => {
  let component: ScoutLibraryTableComponent;
  let fixture: ComponentFixture<ScoutLibraryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoutLibraryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutLibraryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
