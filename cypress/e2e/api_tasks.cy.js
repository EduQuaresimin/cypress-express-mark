/// <reference types="cypress" />

const { faker } = require('@faker-js/faker')

describe('Chamadas de API - Mark L', () => {
    
    it('Cria uma tarefa via api', () => {
        const task = {
            name: `tarefa-${faker.datatype.uuid()}`
        }

        cy.api({
            method: 'POST',
            url: `${Cypress.env('apiUrl')}/tasks`,
            body: {
                name: task.name,
                is_done: false
            }
        }).then(res => {
            expect(res.status).to.eq(201)
        })
    })

    it('Busca todas as tarefas', () => {
        cy.api({
            method: 'GET',
            url: `${Cypress.env('apiUrl')}/tasks`
        }).then(res => {
            expect(res.status).to.eq(200)
        })
    })

    it('Deleta todas as tarefas', () => {
        cy.api_getTasks().then(res => {
            res.body.forEach(task => {
                cy.api({
                    method: 'DELETE',
                    url: `${Cypress.env('apiUrl')}/tasks/${task.id}`
                }).then(res => {
                    expect(res.status).to.eq(204)
                })
            })
        })
    })
})