describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('REABERTURA SMART FIT');
    cy.contains('Qual período quer treinar?');
    cy.contains('Máscara');
    cy.contains('Todos os direitos reservados');
  });

  it('should show units list when click find button', () => {
    cy.visit('/');
    cy.wait(2000);
    cy.get('#find-button').click();
    cy.wait(2000);
    cy.contains('Aberto');
  });

  it('should show open and closed units list when click find button with show closed checkbox is checked', () => {
    cy.visit('/');
    cy.wait(2000);
    cy.get('input[name="showClosed"]').check();
    cy.get('#find-button').click();
    cy.wait(2000);
    cy.contains('Aberto');
    cy.contains('Fechado');
  });

  it('should show 61 units list when click find button with morning is selected', () => {
    const now = new Date(2023, 10, 27);
    cy.clock(now);
    cy.visit('/');
    cy.wait(2000);
    cy.get('input[name="hour"]').check('morning');
    cy.get('#find-button').click();
    cy.wait(2000);
    cy.contains('Resultados encontrados: 61');
  });

  it('should show 70 units list when click find button with afternoon is selected', () => {
    const now = new Date(2023, 10, 27);
    cy.clock(now);
    cy.visit('/');
    cy.wait(2000);
    cy.get('input[name="hour"]').check('afternoon');
    cy.get('#find-button').click();
    cy.wait(2000);
    cy.contains('Resultados encontrados: 70');
  });

  it('should show 1 unit list when click find button with night is selected', () => {
    const now = new Date(2023, 10, 27);
    cy.clock(now);
    cy.visit('/');
    cy.wait(2000);
    cy.get('input[name="hour"]').check('night');
    cy.get('#find-button').click();
    cy.wait(2000);
    cy.contains('Resultados encontrados: 1');
  });

  it('should clear selected when click clear button', () => {
    const now = new Date(2023, 10, 27);
    cy.clock(now);
    cy.visit('/');
    cy.wait(2000);
    cy.get('input[name="showClosed"]').check();
    cy.get('input[name="hour"]').check('night');
    cy.get('#clear-button').click();
    cy.get('input[name="showClosed"]').should('not.be.checked');
    cy.get('input[name="hour"]').should('not.be.checked');
  });
});
