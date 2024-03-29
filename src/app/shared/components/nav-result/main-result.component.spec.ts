import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainResultComponent } from '../nav-result/main-result.component';

describe('NavResultComponent', () => {
  let component: MainResultComponent;
  let fixture: ComponentFixture<MainResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
