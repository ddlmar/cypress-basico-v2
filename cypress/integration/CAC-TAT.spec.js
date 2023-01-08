/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach(function() {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia formulário', function() {
    
    cy.get('#firstName').type('Nome')
    cy.get('#lastName').type('sobreNome')
    cy.get('#email').type('teste@email.com')
    cy.get('#phone').type('000000000')
    cy.get('#open-text-area').type('ótimo curso, boa')
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    cy.get('#firstName').type('Nome')
    cy.get('#lastName').type('sobreNome')
    cy.get('#email').type('emailInvalido.com')
    cy.get('#phone').type('000000000')
    cy.get('#open-text-area').type('ótimo curso, boa')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('exibe mensagem se campo de telefone tem somente números', function(){
    cy.get('#phone').type('asddsdsd').should('not.have.text')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Nome')
    cy.get('#lastName').type('sobreNome')
    cy.get('#email').type('teste@email.com', {delay: 100})
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('ótimo curso, boa')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    const nome = 'Nome do usuario'
    const sobreNome = 'sobreNome do usuario'
    const phone = '000000'
    const email = 'email@email.com'
    cy.get('#firstName').type(nome).should('have.value', nome).clear().should('have.value', '')
    cy.get('#lastName').type(sobreNome).should('have.value', sobreNome).clear().should('have.value', '')
    cy.get('#email').type(email).should('have.value', email).clear().should('have.value', '')
    cy.get('#phone').type(phone).should('have.value', phone).clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function(){
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', ()=> {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', ()=> {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', ()=> {
    cy.get('#product').select([1]).should('have.value', 'blog')
  })


  it('marca o tipo de atendimento "Feedback"', ()=> {
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', ()=> {
    cy.get('input[type="radio"]')
      .each((input)=>  
        cy.get(input)
          .check()
            .should('be.checked'))
  })

   it('marca ambos checkboxes, depois desmarca o último', ()=> {
    cy.get('input[type="checkbox"]')
      .each((input)=>  
        cy.get(input)
          .check()
            .should('be.checked'))
              .last().uncheck().should('not.be.checked')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=> {
    cy.get('#phone-checkbox')
          .check()
    cy.get('.button').click()
    cy.get('.error').should('be.visible')     
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=> {
    cy.contains('a', 'Política de Privacidade').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=> {
    cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click()
    cy.get('#title').should('be.visible')
  })
  
  it('testar se mensagem desaparece', ()=> {
    cy.clock()
    cy.contains('button', 'Enviar').click()
    cy.tick(3000)
    cy.get('.error').should('be.hidden')
  })

  it('testar se requição retorna 200', ()=> {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').should((response)=> {
      const {status, statusText, body} = response
      expect(status).to.equal(200)
      expect(statusText).to.equal('OK')
      expect(body).to.include('CAC TAT')

    })
  })

  it.only('encontrando o gato', ()=> {
    cy.get('#cat').invoke('show').should('be.visible')
  })
})