/// <reference types="cypress" />
const { faker } = require('@faker-js/faker')

const task = {
    name: `tarefa-${faker.datatype.uuid()}`
}

describe('Tarefas - Mark L', () => {
    beforeEach(() => {
        cy.visit('/')

        cy.api_deleteAllTasks()

    })
    context('Caminho feliz', () => {
        it('Cadastra uma nova tarefa', () => {
            cy.get('#newTask').type(task.name)
            cy.contains('button', 'Create').click()
    
            cy.contains(task.name).should('be.visible')
        })
        it('Conclui uma tarefa', () => {
            cy.api_createTask(task)
            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()
           
            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
        it('Exclui uma tarefa', () => {
            cy.api_createTask(task)
            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDeleteButton]')
                .click()
           
            cy.contains('p', task.name)
                .should('not.exist')
        })
    })
    context('Validação mensagens de erro', () => {
        it('Mensagem de tarefa duplicada', () => {  
            cy.api_createTask(task)

            cy.createTask(task)

            cy.contains('.swal2-popup', 'Task already exists!')
                .should('be.visible')
        })
        it('Mensagem de campo obrigatório', () => {
            cy.contains('button', 'Create').click()
            cy.get('#newTask')
                .invoke('prop', 'validationMessage')
                .should(text => {
                    expect(text).to.eq('This is a required field')
                })
        })
    })
})
