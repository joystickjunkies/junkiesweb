import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipeoComponent } from './chipeo.component';

describe('ChipeoComponent', () => {
  let component: ChipeoComponent;
  let fixture: ComponentFixture<ChipeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipeoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChipeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
