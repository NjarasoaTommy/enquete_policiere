import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCrimeComponent } from './list-crime.component';

describe('ListCrimeComponent', () => {
  let component: ListCrimeComponent;
  let fixture: ComponentFixture<ListCrimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCrimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
