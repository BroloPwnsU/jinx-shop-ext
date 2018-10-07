import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSwipeComponent } from './shop-swipe.component';

describe('ShopSwipeComponent', () => {
  let component: ShopSwipeComponent;
  let fixture: ComponentFixture<ShopSwipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopSwipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSwipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
