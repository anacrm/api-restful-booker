/// <reference types="cypress"/>

describe('Authentication - POST (/auth)', () => {
    context('Given that I use valid crendentials', () => {
        const username = 'admin'
        const password = 'password123'

        context('when I request an Auth token', () => {

            beforeEach(() => {
                cy.request({
                    method: 'POST',
                    url: '/auth',
                    headers: {
                        accept: "application/json"
                    },
                    body: {
                        username,
                        password,
                    },
                }).as('authRequest')
            })

            it('Then I should get a token', () => {
                cy.get('@authRequest').then((response) => {
                    expect(response.body).to.have.property('token')
                })
            })
            it('Then I should get a status code 200', () => {
                cy.get('@authRequest').then((response) => {
                    expect(response.status).deep.equal(200)
                })
            })
        })

    })
})