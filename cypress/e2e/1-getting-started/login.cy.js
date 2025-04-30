describe('login test', () => {
    it('logging in', () => {
        cy.visit('/login');
        cy.get('input[name="email"]').type('dp@test.si');
        cy.get('input[name="password"]').type('Random1234!');
        cy.get('button[type="submit"]').click();
        cy.location('pathname').should('eq', '/dashboard');
    });
});
