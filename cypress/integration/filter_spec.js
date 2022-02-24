// /cypress/integration/filter.spec.js

/// <reference types="cypress" />
describe('Filter input and output test', () => {
  beforeEach(() => {
    cy.visit('/#/filter');
    cy.window().then(win => {
      cy.spy(win.console, 'warn').as('console')
  })
  });
  const ipTestText = "128.0.0.0,128.0.0.1"
  const ipReturnArrayText = [{ "field": "ip", "mode": "in", "value": ["128.0.0.0", "128.0.0.1"] }]
  const ipReturnStringText = [{ "field": "ip", "mode": "contain", "value": ipTestText }]
  const buReturnArrayText = [{ "field" : "bu", "mode": "in", "value": ["FYT", "INFRA-APP"]}]
  const calendarStart = 'Jan/02/2022'
  const calendarEnd = 'Feb/02/2022'
  const calendarArrayText = [{"field": "last_update_at","mode": "in","value":["2022-01-02","2022-02-02"]}]

  it('With default value, the button should with active class', () => {
    cy.get('.xy-filter--active').click()
    cy.get('.xy-filter__wrapper').should('be.visible')
    cy.get('[data-e2e="xy-filter__cleanAll"]').click()
    cy.get('[data-e2e="xy-filter__item"]').should('not.exist')
    cy.get('#app').click('topRight');
    cy.get('[data-e2e="xy-filter__button"]').should('not.have.class', 'xy-filter--active')
  })

  it('New condittion\'s sort should be "IN"', () => {
    cy.get('[data-e2e="xy-filter__button"]').click()
    cy.get('.xy-filter__wrapper').should('be.visible')
    cy.get('[data-e2e="xy-filter__cleanAll"]').click()
    cy.get('.xy-filter__body-plus-button').click()
    cy.get('.ant-select-selector').contains('IN')
  })
  it('Choose IP, sort is "IN", output should be array. sort is "CONTAIN", output should be string', () => {
    cy.get('[data-e2e="xy-filter__button"]').click()
    cy.get('.xy-filter__wrapper').should('be.visible')
    cy.get('[data-e2e="xy-filter__cleanAll"]').click()
    cy.get('.xy-filter__body-plus-button').click()
    cy.get('.xy-filter__body-menu').click()
    cy.get('.rc-virtual-list').find('.ant-select-item').contains('IP').click()
    cy.get('.xy-filter__body-item-input').type(ipTestText)
    cy.get('@console').should('be.calledWith', JSON.stringify(ipReturnArrayText))
    cy.get('.filter__sort').click();
    cy.get('.rc-virtual-list').find('.ant-select-item').contains('Contains').click()
    cy.get('@console').should('be.calledWith', JSON.stringify(ipReturnStringText))
  })
  it('Choose BU, sort should be "IN", output should be array', () => {
    cy.get('[data-e2e="xy-filter__button"]').click()
    cy.get('.xy-filter__wrapper').should('be.visible')
    cy.get('[data-e2e="xy-filter__cleanAll"]').click()
    cy.get('.xy-filter__body-plus-button').click()
    cy.get('.xy-filter__body-menu').click()
    cy.get('.rc-virtual-list').find('.ant-select-item').contains('BU').click()
    cy.get('.filter__sort').should('have.class', 'ant-select-disabled').contains('IN')
    cy.get('.xy-filter__body-item-select-sub').click()
    cy.get('.rc-virtual-list').find('.ant-select-item').contains('FYT').click({force: true})
    cy.get('.rc-virtual-list').find('.ant-select-item').contains('INFRA-APP').click({force: true})
    cy.get('@console').should('be.calledWith', JSON.stringify(buReturnArrayText))
  })
  it('Choose last update , output should be array', () => {
    cy.get('[data-e2e="xy-filter__button"]').click()
    cy.get('.xy-filter__wrapper').should('be.visible')
    cy.get('[data-e2e="xy-filter__cleanAll"]').click()
    cy.get('.xy-filter__body-plus-button').click()
    cy.get('.xy-filter__body-menu').click()
    cy.get('.rc-virtual-list-holder').find('.ant-select-item').contains('Last Update').click();
    cy.get('.ant-calendar-picker').click()
    cy.get('.ant-calendar-input[placeholder="Start date"]').type(calendarStart)
    cy.get('.ant-calendar-input[placeholder="End date"]').type(calendarEnd)
    cy.get('@console').should('be.calledWith', JSON.stringify(calendarArrayText))
    cy.get('.xy-filter').click('topRight');
  })
});