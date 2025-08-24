import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccusationModalComponent } from './manage-accusation-modal.component';

describe('ManageAccusationModalComponent', () => {
  let component: ManageAccusationModalComponent;
  let fixture: ComponentFixture<ManageAccusationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAccusationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAccusationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
