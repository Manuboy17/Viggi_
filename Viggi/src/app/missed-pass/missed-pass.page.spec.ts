import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MissedPassPage } from './missed-pass.page';

describe('MissedPassPage', () => {
  let component: MissedPassPage;
  let fixture: ComponentFixture<MissedPassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MissedPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
