import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertieComponent } from './propertie.component';

describe('PropertieComponent', () => {
  let component: PropertieComponent;
  let fixture: ComponentFixture<PropertieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
