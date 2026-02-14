import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckForm } from './deck-form';

describe('DeckForm', () => {
  let component: DeckForm;
  let fixture: ComponentFixture<DeckForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
