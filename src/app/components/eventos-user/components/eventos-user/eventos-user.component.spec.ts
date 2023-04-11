import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosUserComponent } from './eventos-user.component';

describe('EventosUserComponent', () => {
  let component: EventosUserComponent;
  let fixture: ComponentFixture<EventosUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
