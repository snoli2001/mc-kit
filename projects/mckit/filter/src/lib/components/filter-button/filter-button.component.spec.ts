import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCFilterButtonComponent } from './filter-button.component';

describe('FilterButtonComponent', () => {
  let component: MCFilterButtonComponent;
  let fixture: ComponentFixture<MCFilterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCFilterButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCFilterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
