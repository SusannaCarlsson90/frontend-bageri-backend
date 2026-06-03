import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sortiment } from './sortiment';

describe('Sortiment', () => {
  let component: Sortiment;
  let fixture: ComponentFixture<Sortiment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sortiment],
    }).compileComponents();

    fixture = TestBed.createComponent(Sortiment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
