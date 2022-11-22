/// <reference types="cypress"/>
const utils = require('../../support/utils')


describe('Get Booking Ids - GET (/booking)', () => {
    context('Given that there are bookings stored on the system', () => {
        let firstname = utils.randomString()
        let lastname = utils.randomString()
        let date = utils.currentDate()
        let value = utils.randomNumber()
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
        context('When I get the bookings without query params', () => {
            beforeEach(() => {
                cy.request({
                    method: 'GET',
                    url: '/booking',
                    headers: {
                        accept: "application/json"
                    }
                }).as('getBookings')
            })
            it('Then should get all bookings ids that exist within the API', () => {
                cy.get('@getBookings').then((response) => {
                    expect(response.body).to.not.have.lengthOf(0)
                })
            })
            it('Then I should get status code 200', () => {
                cy.get('@getBookings').then((response) => {
                    expect(response.status).deep.equal(200)
                })
            })
            it('Then I should get bookingid field in all elements', () => {
                cy.get('@getBookings').then((response) => {
                    cy.wrap(response.body).each(($el) => {
                        expect($el).have.property('bookingid')
                    })
                })
            })
        })
        context('When I get the bookings using first name query param', () => {
            beforeEach(() => {
                cy.request({
                    method: 'GET',
                    url: '/booking',
                    headers: {
                        accept: "application/json"
                    },
                    qs: {
                        firstname
                    }
                }).as('getBookingsByFirstName')
            })
            it('Then should return the specific booking Id', () => {
                cy.get('@getBookingsByFirstName').then((response) => {
                    cy.get('@postBookingResponse').then((postResponse) => {
                        expect(response.body).to.deep.include({ bookingid: postResponse.body.bookingid })

                    })

                })
            })
        })
        context('When I get the bookings using last name query param', () => {
            beforeEach(() => {
                cy.request({
                    method: 'GET',
                    url: '/booking',
                    headers: {
                        accept: "application/json"
                    },
                    qs: {
                        lastname
                    }
                }).as('getBookingsByLastName')
            })
            it('Then should return the specific booking Id', () => {
                cy.get('@getBookingsByLastName').then((response) => {
                    cy.get('@postBookingResponse').then((postResponse) => {
                        expect(response.body).to.deep.include({ bookingid: postResponse.body.bookingid })

                    })

                })
            })
        })
        context('When I get the bookings using checkin date query param', () => {
            beforeEach(() => {
                cy.request({
                    method: 'GET',
                    url: '/booking',
                    headers: {
                        accept: "application/json"
                    },
                    qs: {
                        checkin: date
                    }
                }).as('getBookingsByCheckin')
            })
            it('Then should return the specific booking Id', () => {
                /*This test will fail  the documentation informs that it should return 
                bookings that have a checkin date greater than or equal to the set checkin date 
                but is returning just greater */

                cy.get('@getBookingsByCheckin').then((response) => {
                    cy.get('@postBookingResponse').then((postResponse) => {
                        cy.log(postResponse.body)
                        expect(response.body).to.deep.include({ bookingid: postResponse.body.bookingid })

                    })

                })
            })
        })
        context('When I get the bookings using checkout date query param', () => {
            beforeEach(() => {
                cy.request({
                    method: 'GET',
                    url: '/booking',
                    headers: {
                        accept: "application/json"
                    },
                    qs: {
                        checkout: date
                    }
                }).as('getBookingsByCheckout')
            })
            it.only('Then should return the specific booking Id', () => {

                cy.get('@getBookingsByCheckout').then((response) => {
                    cy.get('@postBookingResponse').then((postResponse) => {
                        cy.log(postResponse.body)
                        expect(response.body).to.deep.include({ bookingid: postResponse.body.bookingid })

                    })

                })
            })
        })

    })
})
