import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccusationComponent } from './add-accusation.component';

describe('AddAccusationComponent', () => {
  let component: AddAccusationComponent;
  let fixture: ComponentFixture<AddAccusationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAccusationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAccusationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
