/// <reference types="cypress"/>
const utils = require('../../support/utils')

describe('Updates a current booking - DELETE (/booking/{id})', () => {
    const username = 'admin'
    const password = 'password123'
    let firstname = utils.randomString()
    let lastname = utils.randomString()
    let date = utils.currentDate()
    let value = utils.randomNumber()

    context('Given that a valid token is being used and there is a booking created', () => {
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
            }).as('authResponse')

            cy.request({
                method: 'POST',
                url: '/booking',
                headers: {
                    accept: "application/json"
                },
                body: {
                    "firstname": firstname,
                    "lastname": lastname,
                    "totalprice": value,
                    "depositpaid": true,
                    "bookingdates": {
                        "checkin": date,
                        "checkout": date
                    },
                    "additionalneeds": "Breakfast"
                }
            }).as('postBookingResponse')
        })
        context('When the user tries to delete the booking', () => {
            let bookingId
            beforeEach(() => {
                cy.get('@postBookingResponse').then((response) => {
                    bookingId = response.body.bookingid
                    cy.get('@authResponse').then((response) => {
                        const token = response.body.token
                        cy.request({
                            method: 'DELETE',
                            url: `/booking/${bookingId}`,
                            headers: {
                                accept: "application/json",
                                Cookie: `token=${token}`
                            }
                        }).as('deleteBookingResponse')
                    })
                })
            })
            it('Then the booking should be deleted', () => {
                cy.get('@deleteBookingResponse').should(({ status, body }) => {
                    expect(status).to.deep.equal(201)
                    expect(body).to.deep.equal('Created')

                })
            })
            it('Then should not be possible to find the deleted booking', () => {
                cy.request({
                    method: 'GET',
                    url: `/booking/${bookingId}`,
                    failOnStatusCode: false,
                    headers: {
                        accept: "application/json"
                    }
                }).should(({ status, body }) => {
                    expect(status).to.deep.equal(404)
                    expect(body).to.deep.equal('Not Found')
                })
            })
        })
    })
})