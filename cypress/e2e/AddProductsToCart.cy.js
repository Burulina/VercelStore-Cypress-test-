/// <reference types="cypress" />
const { faker } = require('@faker-js/faker');
const cartPage = require ("./pageObjects/cart.page");
const productsPage = require ("./pageObjects/products.page");

//Generate random data for shipping form
const email = faker.internet.email();
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const address = faker.address.street();
const city = faker.address.cityName();
const postalCode = faker.address.zipCode('#####');

//Products for add to cart according test assingment
const products = [{name: "ACME Cup", quantToAdd: 5}, {name: "Quarter Zip", quantToAdd: 1}];

describe('E-commerce VercelStore testing', () => {
  it('Should check ability to add products to cart and proceed to payment', function () {
    cy.visit('https://demo.vercel.store/');
    cy.url().should('contain', 'demo.vercel.store/');
    productsPage.getNewArrivalsNavbarLink().click();
    productsPage.getProductName(products[0].name).click();
    productsPage.getProductPrice().as('product1Price');
    productsPage.getAddToCartButton().click();
    cartPage.increaseProductQuantitiy(products[0].quantToAdd);
    cartPage.getTotalPrice().then(($Total) => {
      let expectedPrice = '$' + (this.product1Price * products[0].quantToAdd); 
      cy.wrap($Total).should('be.visible').and('contain.text', expectedPrice);
    })
    cartPage.getCloseCartButton().click();
    productsPage.getFeaturedNavbarLink().click();
    productsPage.getProductName(products[1].name).click();
    productsPage.getSizeMButton().click();
    productsPage.getProductPrice().as('product2Price');
    productsPage.getAddToCartButton().click();
    cartPage.getProductNameLabel().should ($items => {
      expect($items).to.have.length(2);
      expect($items.eq(0)).to.contain(products[1].name);
      expect($items.eq(1)).to.contain(products[0].name);
    })
    cartPage.getProductsSizeLabel().should('be.visible').and('have.text', 'SizeM');
    cartPage.getTotalPrice().then(($Total) => {
      let expectedPrice = '$' + (this.product1Price * products[0].quantToAdd + this.product2Price);
      cy.wrap($Total).should('be.visible').and('contain.text', expectedPrice);
    })
    cartPage.getProceedCheckoutButton().click();
    // here is no way to import a function into cy.origin, so this code without using pageObjects 
    cy.origin('https://next-js-store.myshopify.com/', { args: { email, firstName, lastName, address, city, postalCode } }, 
    ({ email, firstName, lastName, address, city, postalCode }) => {
    cy.url().should('contain', 'next-js-store.myshopify.com/');
    cy.get('#main-header').should('be.visible').and('contain.text', 'Contact information');
    cy.get('#checkout_email_or_phone').type(email);
    cy.get('#checkout_shipping_address_first_name').type(firstName);
    cy.get('#checkout_shipping_address_last_name').type(lastName);
    cy.get('#checkout_shipping_address_address1').type(address);
    cy.get('#checkout_shipping_address_city').type(city);
    cy.get('#checkout_shipping_address_zip').type(postalCode);
    cy.get('#continue_button').click();
    cy.get('#main-header').should('be.visible').and('contain.text', 'Shipping method');
    cy.get('#checkout_shipping_rate_id_usps-prioritymailinternational-58_26').check();
    cy.get('#continue_button').click();
    cy.get('#main-header').should('be.visible').and('contain.text', 'Payment');
    cy.get('.section--payment-method p').should('be.visible').and('contain.text', 'This store can’t accept payments right now.');
    })

  })

})
