/// <reference types="cypress"/>
const utils = require('../../support/utils')

describe('Creates a new booking in the API - POST (/booking)', () => {
    context('Given the user is giving all the valid information ', () => {
        let firstname = utils.randomString()
        let lastname = utils.randomString()
        let date = utils.currentDate()
        let value = utils.randomNumber()
        context('When I Create a new booking', () => {
            beforeEach(() => {
                cy.request({
                    method: 'POST',
                    url: '/booking',
                    failOnStatusCode: false,
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
            it('Then I should get a status code 200', () => {
                cy.get('@postBookingResponse').then((response) => {
                    expect(response.status).deep.equal(200)
                })
            })
            it('Then I should have the corresponding information in the response body', () => {
                cy.get('@postBookingResponse').then((response) => {
                    expect(response.body.booking.firstname).deep.equal(firstname)
                    expect(response.body.booking.lastname).deep.equal(lastname)
                    expect(response.body.booking.depositpaid).deep.equal(true)
                    expect(response.body.booking.bookingdates.checkin).deep.equal(date)
                    expect(response.body.booking.bookingdates.checkout).deep.equal(date)
                    expect(response.body.booking.additionalneeds).deep.equal("Breakfast")
                })
            })
            it('Then I should receive a bookingid number in teh response body', () => {

                cy.get('@postBookingResponse').then((response) => {
                    expect(response.body.bookingid).to.be.a('number')
                })
            })
        })
    })
    context('Given the user is missing information', () => {
        let firstname = utils.randomString()
        let lastname = utils.randomString()
        let date = utils.currentDate()
        let value = utils.randomNumber()
        context('When the user creates a bookings without inform firstname', () => {
            beforeEach(() => {
                cy.request({
                    method: 'POST',
                    url: '/booking',
                    failOnStatusCode: false,
                    headers: {
                        accept: "application/json"
                    },
                    body: {
                        "firstname": null,
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
            it('It should give response status code 400', () => {
                //this test will fail the API does not have fields validation 
                cy.get('@postBookingResponse').then((response) => {
                    expect(response.status).deep.equal(400)
                })
            })

        })
        context('When the user creates a bookings without inform lastname', () => {
            beforeEach(() => {
                cy.request({
                    method: 'POST',
                    url: '/booking',
                    failOnStatusCode: false,
                    headers: {
                        accept: "application/json"
                    },
                    body: {
                        "firstname": firstname,
                        "lastname": null,
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
            it('It should give response status code 400', () => {
                //this test will fail the API does not have fields validation 
                cy.get('@postBookingResponse').then((response) => {
                    expect(response.status).deep.equal(400)
                })
            })
        })
        context('When the user creates a bookings without inform totalprice', () => {
            beforeEach(() => {
                cy.request({
                    method: 'POST',
                    url: '/booking',
                    failOnStatusCode: false,
                    headers: {
                        accept: "application/json"
                    },
                    body: {
                        "firstname": firstname,
                        "lastname": lastname,
                        "totalprice": null,
                        "depositpaid": true,
                        "bookingdates": {
                            "checkin": date,
                            "checkout": date
                        },
                        "additionalneeds": "Breakfast"
                    }
                }).as('postBookingResponse')
            })
            it('It should give response status code 400', () => {
                //this test will fail the API does not have fields validation 
                cy.get('@postBookingResponse').then((response) => {
                    expect(response.status).deep.equal(400)
                })
            })
        })
        context('When the user creates a bookings without inform depositpaid', () => {
            beforeEach(() => {
                cy.request({
                    method: 'POST',
                    url: '/booking',
                    failOnStatusCode: false,
                    headers: {
                        accept: "application/json"
                    },
                    body: {
                        "firstname": firstname,
                        "lastname": lastname,
                        "totalprice": value,
                        "depositpaid": null,
                        "bookingdates": {
                            "checkin": date,
                            "checkout": date
                        },
                        "additionalneeds": "Breakfast"
                    }
                }).as('postBookingResponse')
            })
            it('It should give response status code 400', () => {
                //this test will fail the API does not have fields validation 
                cy.get('@postBookingResponse').then((response) => {
                    expect(response.status).deep.equal(400)
                })
            })
        })
        context('When the user creates a bookings without inform checkin date', () => {
            beforeEach(() => {
                cy.request({
                    method: 'POST',
                    url: '/booking',
                    failOnStatusCode: false,
                    headers: {
                        accept: "application/json"
                    },
                    body: {
                        "firstname": firstname,
                        "lastname": lastname,
                        "totalprice": value,
                        "depositpaid": true,
                        "bookingdates": {
                            "checkin": null,
                            "checkout": date
                        },
                        "additionalneeds": "Breakfast"
                    }
                }).as('postBookingResponse')
            })
            it('It should give response status code 400', () => {
                //this test will fail the API does not have fields validation 
                cy.get('@postBookingResponse').then((response) => {
                    expect(response.status).deep.equal(400)
                })
            })
        })
        context('When the user creates a bookings without inform checkout date', () => {
            beforeEach(() => {
                cy.request({
                    method: 'POST',
                    failOnStatusCode: false,
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
                            "checkout": null
                        },
                        "additionalneeds": "Breakfast"
                    }
                }).as('postBookingResponse')
            })
            it('It should give response status code 400', () => {
                //this test will fail the API does not have fields validation 
                cy.get('@postBookingResponse').then((response) => {
                    expect(response.status).deep.equal(400)
                })
            })
        })
        context('When the user creates a bookings without inform additionalneeds', () => {
            beforeEach(() => {
                cy.request({
                    method: 'POST',
                    url: '/booking',
                    failOnStatusCode: false,
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
                        "additionalneeds": null
                    }
                }).as('postBookingResponse')
            })
            it('It should give response status code 400', () => {
                //Im considering additionalneeds not required field
                cy.get('@postBookingResponse').then((response) => {
                    expect(response.status).deep.equal(200)
                })
            })
        })
    })
    context('Given the user provides invalid information', () => {
        context('', () => {

        })

    })
})