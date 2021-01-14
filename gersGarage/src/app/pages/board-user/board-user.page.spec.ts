import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoardUserPage } from './board-user.page';

describe('BoardUserPage', () => {
  let component: BoardUserPage;
  let fixture: ComponentFixture<BoardUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
