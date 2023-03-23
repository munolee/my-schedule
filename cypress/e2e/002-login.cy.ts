export {};

describe('로그인/로그아웃 버튼 확인', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('로그인 버튼 클릭 확인', () => {
    cy.dataCy('login-path-button').click();
    cy.url().should('include', '/login');
  });
});

describe('username 유효성 검사', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('사용자 이름을 4자 미만 입력 시 필드 하단 에러 메시지 노출 확인', () => {
    cy.login('123', 'testtest', true);
    cy.dataCy('login-wrap-form').find('em').contains('사용자 이름은 최소 4글자 이상 입력해주세요.');
  });

  it('사용자 이름을 20자 이상 입력 시 필드 하단 에러 메시지 노출 확인', () => {
    cy.login('123456789012345678901', 'testtest', true);
    cy.dataCy('login-wrap-form').find('em').contains('사용자 이름은 최대 20글자 이하로 입력해주세요.');
  });
});

describe('password 유효성 검사', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('비밀번호를 5자 미만 입력 시 필드 하단 에러 메시지 노출 확인', () => {
    cy.login('test', '123', true);
    cy.dataCy('login-wrap-form').find('em').contains('비밀번호는 최소 5글자 이상 입력해주세요.');
  });

  it('비밀번호를 16자 이상 입력 시 필드 하단 에러 메시지 노출 확인', () => {
    cy.login('test', '1234567890123456780', true);
    cy.dataCy('login-wrap-form').find('em').contains('비밀번호는 최대 16글자 이하로 입력해주세요.');
  });
});

describe('게스트 로그인 확인', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('게스트 계정 로그인 확인', () => {
    cy.login();

    cy.dataCy('login-header-sidebar-button').click();
    cy.dataCy('login-sidebar-user-info').contains('게스트 계정');
  });
});
