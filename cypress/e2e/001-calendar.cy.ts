import moment from 'moment';
import { DATE_FORMAT } from '@constants/format';

const toDate = () => moment();

describe('달력 홈 확인', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('날짜 영역 정상적으로 노출되는 지 확인', () => {
    cy.dataCy('calendar-title-date').children('h2').contains(toDate().format(DATE_FORMAT.TITLE_FORMAT));
  });

  it('달(월) 이동 버튼 영역 확인', () => {
    const prevMonth = toDate().clone().subtract(1, 'month').format(DATE_FORMAT.TITLE_FORMAT);
    cy.dataCy('calendar-month-button-group').children().eq(0).click();
    cy.dataCy('calendar-title-date').children('h2').contains(prevMonth);

    const nextMonth = toDate().endOf('month').format(DATE_FORMAT.TITLE_FORMAT);
    cy.dataCy('calendar-month-button-group').children().eq(2).click();
    cy.dataCy('calendar-title-date').children('h2').contains(nextMonth);

    cy.dataCy('calendar-month-button-group').children().eq(1).click();
    cy.dataCy('calendar-date-td').should('have.css', 'background-color', 'rgb(207, 232, 232)');
  });

  it('날(일) 클릭 시 모달 노출되는 지 확인', () => {
    cy.dataCy('calendar-date-td').click();
    cy.dataCy('calendar-modal-title-date').contains(toDate().format(DATE_FORMAT.MODAL_TITLE_FORMAT));
  });
});
