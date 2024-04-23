import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingViewPage } from './training-view.page';

describe('TrainingViewPage', () => {
  let component: TrainingViewPage;
  let fixture: ComponentFixture<TrainingViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
