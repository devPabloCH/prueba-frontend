import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeRunnerPage } from './home-runner.page';

describe('HomeRunnerPage', () => {
  let component: HomeRunnerPage;
  let fixture: ComponentFixture<HomeRunnerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRunnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
