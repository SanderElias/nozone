import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtickBarComponent } from './showtick-bar.component';

describe('ShowtickBarComponent', () => {
  let component: ShowtickBarComponent;
  let fixture: ComponentFixture<ShowtickBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowtickBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowtickBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
