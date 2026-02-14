import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckStats } from './deck-stats';

describe('DeckStats', () => {
  let component: DeckStats;
  let fixture: ComponentFixture<DeckStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
