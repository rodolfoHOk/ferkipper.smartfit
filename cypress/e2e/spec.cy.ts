describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('REABERTURA SMART FIT');
    cy.contains('Qual período quer treinar?');
    cy.contains('Máscara');
    cy.contains('Todos os direitos reservados');
  });

  // it('should show units list when click find button', () => {
  //   cy.visit('/').as('home');
  //   cy.get('#find-button').click();
  //   cy.wait(2000);
  //   cy.contains('Aberto');
  // });
});
