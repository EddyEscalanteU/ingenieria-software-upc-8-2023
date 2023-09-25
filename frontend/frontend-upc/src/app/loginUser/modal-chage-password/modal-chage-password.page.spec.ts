import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalChagePasswordPage } from './modal-chage-password.page';

describe('ModalChagePasswordPage', () => {
  let component: ModalChagePasswordPage;
  let fixture: ComponentFixture<ModalChagePasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalChagePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
