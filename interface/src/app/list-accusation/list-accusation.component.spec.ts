import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccusationComponent } from './list-accusation.component';

describe('ListAccusationComponent', () => {
  let component: ListAccusationComponent;
  let fixture: ComponentFixture<ListAccusationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAccusationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAccusationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
