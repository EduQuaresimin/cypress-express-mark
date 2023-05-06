Cypress.Commands.add('api_createTask', task => {
    cy.api({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/tasks`,
        body: {
            name: task.name,
	        is_done: false
        }
    })
})

Cypress.Commands.add('api_getTasks', () => {
    cy.api({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/tasks`
    })
})

Cypress.Commands.add('api_deleteAllTasks', () => {
    cy.api_getTasks().then(res => {
        res.body.forEach(task => {
            cy.api({
                method: 'DELETE',
                url: `${Cypress.env('apiUrl')}/tasks/${task.id}`
            })
        })
    })
})
