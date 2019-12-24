import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutLibraryGraphComponent } from './scout-library-graph.component';

describe('ScoutLibraryGraphComponent', () => {
  let component: ScoutLibraryGraphComponent;
  let fixture: ComponentFixture<ScoutLibraryGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoutLibraryGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutLibraryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
