import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoutLibraryTableDeplibComponent } from './scout-library-table-deplib.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';

describe('ScoutLibraryTableDeplibComponent', () => {
  let component: ScoutLibraryTableDeplibComponent;
  let fixture: ComponentFixture<ScoutLibraryTableDeplibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule
      ],
      declarations: [ScoutLibraryTableDeplibComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutLibraryTableDeplibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
  });
});
