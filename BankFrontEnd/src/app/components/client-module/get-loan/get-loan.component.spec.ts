import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetLoanComponent } from './get-loan.component';

describe('GetLoanComponent', () => {
  let component: GetLoanComponent;
  let fixture: ComponentFixture<GetLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
