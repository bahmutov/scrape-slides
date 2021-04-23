/// <reference types="cypress" />

const pickDeckProperties = (dataset) =>
  Cypress._.pick(dataset, [
    'createdAt',
    'description',
    'slug',
    'url',
    'username',
    'viewCount',
    'visibility',
  ])

const convertTypesForDeckProperties = (dataset) => {
  dataset.viewCount = parseInt(dataset.viewCount)

  return dataset
}

const getDeckProperties = (deck$) => {
  const dataset = deck$.prop('dataset')
  return convertTypesForDeckProperties(pickDeckProperties(dataset))
}

describe('Bahmutov slides', () => {
  it('has multiple public decks', () => {
    cy.visit('/')
    // there are a log of slide decks
    cy.get('.decks.visible .deck.public').should('have.length.gt', 100)
  })

  it('has deck dataset', () => {
    cy.visit('/')
    // there are a log of slide decks
    cy.get('.decks.visible .deck.public')
      .should('have.length.gt', 100)
      .first()
      .then(getDeckProperties)
      .then((props) => cy.log(JSON.stringify(props)))
  })

  it('saves all deck props', () => {
    cy.visit('/')
    const decks = []
    cy.get('.decks.visible .deck.public')
      .should('have.length.gt', 100)
      .each((deck$) => {
        const deckProps = getDeckProperties(deck$)
        decks.push(deckProps)
      })
      .then(() => {
        cy.writeFile('decks.json', decks)
      })
  })
})
