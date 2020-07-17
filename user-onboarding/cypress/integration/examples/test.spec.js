//
describe('form test', () => {
    it('test the form is working', () => {
        cy.visit('/')

        cy.get('button#submit')
        .should('be.disabled')

        cy.get(':nth-child(1) > input')
        .type('Tim Pettit')
            .should('have.value', 'Tim Pettit')
        
        const email = 'tbbcoach@aol.com';
        cy.get(':nth-child(2) > input')
            .type(email)
            .should('have.value', email)
        
        cy.get(':nth-child(3) > input')
            .type('password')
            .should('have.value', 'password')
        
        cy.get('.terms > input')
            .click()
            .should('have.checked', true)
        
        cy.get('button#submit')
        .should('not.be.disabled')
        
        
    })
})