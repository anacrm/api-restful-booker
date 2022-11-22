/// <reference types="cypress"/>
const utils = require('../../support/utils')

describe('Updates a current booking with a partial payload - PATCH (/booking/{id})', () => {
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
        context('When the user tries to update the current booking', () => {
            let newFirstname = utils.randomString()
            let newLastname = utils.randomString()
            let newDate = utils.getTomorrow()

            beforeEach(() => {
                cy.get('@postBookingResponse').then((response) => {
                    const bookingId = response.body.bookingid
                    cy.get('@authResponse').then((response) => {
                        const token = response.body.token
                        cy.request({
                            method: 'PATCH',
                            url: `/booking/${bookingId}`,
                            headers: {
                                accept: "application/json",
                                Cookie: `token=${token}`
                            },
                            body: {
                                "firstname": newFirstname,
                                "lastname": newLastname,
                                "totalprice": value,
                                "depositpaid": false,
                                "bookingdates": {
                                    "checkin": newDate,
                                    "checkout": newDate
                                },
                                "additionalneeds": "Lunch"
                            }
                        }).as('patchBookingResponse')
                    })
                })
            })
            it('Then the booking should be updated', () => {
                cy.get('@patchBookingResponse').should(({ status, body }) => {
                    expect(status).to.deep.equal(200)
                    expect(body.firstname).to.deep.equal(newFirstname)
                    expect(body.lastname).to.deep.equal(newLastname)
                    expect(body.totalprice).to.deep.equal(value)
                    expect(body.depositpaid).to.deep.equal(false)
                    expect(body.bookingdates.checkin).to.deep.equal(newDate)
                    expect(body.bookingdates.checkout).to.deep.equal(newDate)
                    expect(body.additionalneeds).to.deep.equal('Lunch')
                })
            })
        })

    })

    context('Given that a booking is created and a invalid token is being used', () => {
        beforeEach(() => {
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
        context('When the user tries to update the current booking with invalid token', () => {
            let newFirstname = utils.randomString()
            let newLastname = utils.randomString()
            let newDate = utils.getTomorrow()
            const token = 'invalid'

            beforeEach(() => {
                cy.get('@postBookingResponse').then((response) => {
                    const bookingId = response.body.bookingid

                    cy.request({
                        method: 'PATCH',
                        url: `/booking/${bookingId}`,
                        failOnStatusCode: false,
                        headers: {
                            accept: "application/json",
                            Cookie: `token=${token}`
                        },
                        body: {
                            "firstname": newFirstname,
                            "lastname": newLastname,
                            "totalprice": value,
                            "depositpaid": false,
                            "bookingdates": {
                                "checkin": newDate,
                                "checkout": newDate
                            },
                            "additionalneeds": "Lunch"
                        }
                    }).as('patchBookingResponse')

                })
            })
            it.only('Then request should not be done', () => {
                cy.get('@patchBookingResponse').should(({ status, body }) => {
                    expect(status).to.deep.equal(403)
                    expect(body).to.deep.equal('Forbidden')
                })
            })
        })
    })


})

