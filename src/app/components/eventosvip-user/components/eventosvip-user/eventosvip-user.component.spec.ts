import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosvipUserComponent } from './eventosvip-user.component';

describe('EventosvipUserComponent', () => {
  let component: EventosvipUserComponent;
  let fixture: ComponentFixture<EventosvipUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosvipUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosvipUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
