export {};

Cypress.Commands.add('dataCy', (value: string) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('login', (username?: string, password?: string, validate: boolean = false) => {
  if (!username || !password) {
    username = Cypress.env().GUEST_ID;
    password = Cypress.env().GUEST_PW;
  }

  cy.dataCy('login-path-button').click();
  // 사용자 로그인 하기 클릭
  cy.dataCy('login-form-button-group').children().eq(1).click();
  // username, password 입력
  cy.dataCy('login-wrap-form').find('input[id=username]').type(username!);
  cy.dataCy('login-wrap-form').find('input[id=password]').type(password!);
  // submit 버튼 클릭
  if (!validate) {
    cy.dataCy('login-wrap-form').find('button[type=submit]').click();
  }
});
