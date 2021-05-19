/// <reference types="cypress" />

/**
 * Picks only immutable (mostly) properties from the deck, like
 * when it was created (as UTC string), description, etc.
 * @param {object} dataset
 * @returns object
 */
const pickDeckProperties = (dataset) =>
  Cypress._.pick(dataset, [
    'createdAt',
    'description',
    'slug',
    'url',
    'username',
    'visibility',
  ])

describe('Bahmutov slides', () => {
  before(() => {
    cy.visit('/')
  })

  beforeEach(() => {
    // there are a log of slide decks
    cy.get('.decks.visible .deck.public')
      .should('have.length.gt', 100)
      .as('decks')
  })

  it('has decks', () => {
    cy.get('@decks')
      .first()
      .invoke('prop', 'dataset')
      .then(pickDeckProperties)
      .then((props) => cy.log(JSON.stringify(props)))
  })

  it('has deck dataset', () => {
    const decks = []
    cy.get('@decks')
      .each((deck$) => {
        const dataset = deck$.prop('dataset')
        const deckProps = pickDeckProperties(dataset)
        decks.push(deckProps)
      })
      .then(() => {
        cy.writeFile('decks.json', decks)
      })
  })
})
