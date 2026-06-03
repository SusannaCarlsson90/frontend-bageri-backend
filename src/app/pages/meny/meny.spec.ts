import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Meny } from './meny';

describe('Meny', () => {
  let component: Meny;
  let fixture: ComponentFixture<Meny>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Meny],
    }).compileComponents();

    fixture = TestBed.createComponent(Meny);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
