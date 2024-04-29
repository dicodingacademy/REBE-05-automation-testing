describe('user can deposit balances', () => {
  it('should deposit correctly', () => {
    cy.visit('http://localhost:5173');

    // make sure that current balance is Rp 0,00
    cy.get('.decimal-display__value').contains('Rp 0,00').should('be.visible');

    // type 20000 in input
    cy.get('input').type('20000');
    // click "Deposit" button
    cy.get('button').contains('Deposit').click();

    // make sure that current balance is Rp 20.000,00
    cy.get('.decimal-display__value').contains('Rp 20.000,00').should('be.visible');
  });
});
