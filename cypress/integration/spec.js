/// <reference types="cypress" />

describe('Bahmutov slides', () => {
  it('has multiple public decks', () => {
    cy.visit('/')
    // there are a log of slide decks
    cy.get('.decks.visible .deck.public').should('have.length.gt', 100)
  })
})
