Cypress.Commands.add('createTask', task => {
    cy.get('#newTask').type(task.name)
    cy.contains('button', 'Create').click()
})