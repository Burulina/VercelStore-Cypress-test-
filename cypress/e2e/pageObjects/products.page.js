const addToCartButton = 'button[aria-label="Add to Cart"]';
const sizeMButton = 'button[aria-label="size m"]';
const featuredNavbarLink = 'a[class*=Navbar][href="/search/featured"]';
const newArrivalsNavbarLink = 'a[class*=Navbar][href="/search/clothes"]';
const productName = 'h3[class*="ProductCard_name"]';
const productPrice = 'div[class*="ProductTag_price"]';

class ProductsPage {

    getAddToCartButton () {
        return cy.get(addToCartButton);
    }

    getSizeMButton () {
        return cy.get(sizeMButton);
    }

    getFeaturedNavbarLink () {
        return cy.get(featuredNavbarLink);
    }

    getNewArrivalsNavbarLink () {
        return cy.get(newArrivalsNavbarLink);
    }

    getProductName (name) {
        return cy.get(productName, {timeout: 6000}).contains(name);
    }
   
    getProductPrice () {
        return cy.get(productPrice)
        .invoke('text')
        .then((text) => text.replace('$', ''))
        .then(parseFloat);
    }

}

module.exports = new ProductsPage();