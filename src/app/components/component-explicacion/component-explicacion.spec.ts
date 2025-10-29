import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentExplicacion } from './component-explicacion';

describe('ComponentExplicacion', () => {
  let component: ComponentExplicacion;
  let fixture: ComponentFixture<ComponentExplicacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentExplicacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentExplicacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
