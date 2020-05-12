import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatNativeDateModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ScoutLibraryLoginComponent } from './scout-library-login.component';


describe('ScoutLibraryLoginComponent', () => {
  let component: ScoutLibraryLoginComponent;
  let fixture: ComponentFixture<ScoutLibraryLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatNativeDateModule,
      ],
      declarations: [ScoutLibraryLoginComponent]
    }).compileComponents();
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
