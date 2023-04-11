import moment from 'moment';
import { DATE_FORMAT } from '@constants/format';

const toDate = () => moment();

describe('비로그인 일정 등록 확인', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('비로그인 일정 등록 클릭 시 토스트 메시지 확인', () => {
    cy.dataCy('schedule-register-button').click();
    cy.dataCy('toast-content-wrap').contains('로그인 후 일정 등록이 가능합니다.');
  });
});

describe('일정 등록 모달 유효성 검사', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
    cy.wait(3000);
  });

  it('일정 제목을 2자 미만 입력 시 필드 하단 에러 메시지 노출 확인', () => {
    cy.dataCy('schedule-register-button').click();
    cy.dataCy('schedule-wrap-form').find('input[id=event-title]').type('1');
    cy.dataCy('schedule-wrap-form').find('em').contains('일정 제목은 최소 2글자 이상 입력해주세요.');
  });

  it('일정 제목을 16자 이상 입력 시 필드 하단 에러 메시지 노출 확인', () => {
    cy.dataCy('schedule-register-button').click();
    cy.dataCy('schedule-wrap-form').find('input[id=event-title]').type('1234567890123456789');
    cy.dataCy('schedule-wrap-form').find('em').contains('일정 제목은 최대 16글자 이하로 입력해주세요.');
  });
});

describe('게스트 로그인 일정 등록 확인', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
    cy.wait(3000);
  });

  it('일정 등록 클릭 시 모달 작성 확인', () => {
    cy.dataCy('schedule-register-button').click();

    cy.dataCy('schedule-wrap-form').find('input[id=event-title]').type('일정 테스트1');
    cy.dataCy('schedule-wrap-form').find('input[id=event-start-date]').type(toDate().format(DATE_FORMAT.BASIC_FORMAT));
    cy.dataCy('schedule-wrap-form').find('input[id=event-end-date]').type(toDate().format(DATE_FORMAT.BASIC_FORMAT));
    cy.dataCy('schedule-form-color').eq(3).click();

    cy.dataCy('schedule-wrap-form').submit();
    cy.dataCy('toast-content-wrap').contains('성공적으로 등록되었습니다!');
  });

  it('등록된 일정 수정 확인 ', () => {
    cy.contains('일정 테스트1').click();
    cy.dataCy('schedule-modal-button-group').children().eq(0).click();

    cy.dataCy('schedule-wrap-form').find('input[id=event-title]').clear().type('테스트 일정2');
    cy.dataCy('schedule-form-color').eq(1).click();

    cy.dataCy('schedule-wrap-form').submit();
    cy.dataCy('toast-content-wrap').contains('성공적으로 수정되었습니다!');
  });

  it('등록된 일정 삭제 확인 ', () => {
    cy.contains('테스트 일정2').click();
    cy.dataCy('schedule-modal-button-group').children().eq(1).click();

    cy.dataCy('confirm-modal-button-group').children().eq(1).click();

    cy.contains('테스트 일정2').should('not.exist');

    cy.dataCy('toast-content-wrap').contains('성공적으로 삭제되었습니다!');
  });
});
