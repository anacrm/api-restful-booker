/// <reference types="cypress"/>
const utils = require('../../support/utils')

describe('Get Booking By ID - GET (/booking/{id})', () => {
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
        context('When I get the bookin informing the id', () => {
            beforeEach(() => {
                cy.get('@postBookingResponse').then((response) => {
                    cy.request({
                        method: 'GET',
                        url: `/booking/${response.body.bookingid}`,
                        headers: {
                            accept: "application/json"
                        }
                    }).as('getBooking')
                })

            })
            it('Then I should get a status code 200', () => {
                cy.get('@getBooking').then((response) => {
                    expect(response.status).deep.equal(200)
                })
            })

            it('Then should get the booking for the specific ID', () => {
                cy.get('@getBooking').then((response) => {
                    cy.get('@postBookingResponse').then((postResponse) => {

                        expect(response.body.firstname).deep.equal(postResponse.body.booking.firstname)
                        expect(response.body.lastname).deep.equal(postResponse.body.booking.lastname)
                        expect(response.body.totalprice).deep.equal(postResponse.body.booking.totalprice)
                        expect(response.body.depositpaid).deep.equal(postResponse.body.booking.depositpaid)
                        expect(response.body.bookingdates.checkin).deep.equal(postResponse.body.booking.bookingdates.checkin)
                        expect(response.body.bookingdates.checkout).deep.equal(postResponse.body.booking.bookingdates.checkout)
                        expect(response.body.additionalneeds).deep.equal(postResponse.body.booking.additionalneeds)

                    })
                })
            })

        })
    })
})