import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RunnerFormPage } from './runner-form.page';

describe('RunnerFormPage', () => {
  let component: RunnerFormPage;
  let fixture: ComponentFixture<RunnerFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RunnerFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
