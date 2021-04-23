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

const getDeckProperties = (deck$) => {
  const dataset = deck$.prop('dataset')
  return pickDeckProperties(dataset)
}

describe('Bahmutov slides', () => {
  before(() => {
    cy.visit('/')
  })

  // grab all decks before each test because the aliases
  // are reset before every test
  beforeEach(() => {
    // there are a log of slide decks
    cy.get('.decks.visible .deck.public')
      .should('have.length.gt', 100)
      .as('decks')
  })

  it('has deck dataset', () => {
    // there are a log of slide decks
    cy.get('@decks')
      .first()
      .then(getDeckProperties)
      .then((props) => cy.log(JSON.stringify(props)))
  })

  it('saves all deck props', () => {
    const decks = []
    cy.get('@decks')
      .each((deck$) => {
        const deckProps = getDeckProperties(deck$)
        decks.push(deckProps)
      })
      .then(() => {
        cy.writeFile('decks.json', decks)
      })
  })
})
