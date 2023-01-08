Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
  cy.get('#firstName').type('Nome')
  cy.get('#lastName').type('sobreNome')
  cy.get('#email').type('teste@email.com')
  cy.get('#phone').type('000000000')
  cy.get('#open-text-area').type('ótimo curso, boa')
  cy.contains('button', 'Enviar').click()
})