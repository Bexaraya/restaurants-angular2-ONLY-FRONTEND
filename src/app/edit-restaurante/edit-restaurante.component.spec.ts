import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRestauranteComponent } from './edit-restaurante.component';

describe('EditRestauranteComponent', () => {
  let component: EditRestauranteComponent;
  let fixture: ComponentFixture<EditRestauranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRestauranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
