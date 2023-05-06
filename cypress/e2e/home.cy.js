/// <reference types="cypress" />

describe('Home', () => {
  it('Webapp deve estar online', () => {
    cy.visit('/')

    cy.title().should('eq', 'Gerencie suas tarefas com Mark L')
  })
})