describe('Register', () => {
    it('registers a new user successfully', () => {
        cy.visit('/register');

        const randomEmail = `user_${Date.now()}@test.si`;

        cy.get('input[name="name"]').type('Test User');
        cy.get('input[name="email"]').type(randomEmail);
        cy.get('input[name="password"]').type('Random1234!');
        cy.get('input[name="password_confirmation"]').type('Random1234!');

        cy.get('button[type="submit"]').click();

        // After successful registration, expect to be redirected
        cy.location('pathname').should('eq', '/dashboard');
    });
});
