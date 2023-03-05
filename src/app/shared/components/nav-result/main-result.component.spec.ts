import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavResultComponent } from './nav-result.component';

describe('NavResultComponent', () => {
  let component: NavResultComponent;
  let fixture: ComponentFixture<NavResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
