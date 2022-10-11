const closeCartButton = 'button[aria-label="Close"]';
const quantityCartButtons = 'button[class*="Quantity_actions"]';
const proceedCheckoutButton = 'a[href="/checkout"]';
const productQuantityInput = '[class*="Quantity_input"]';
const productNameLabel = 'span[class*=CartItem_productName]';

class CartPage {

    getCloseCartButton () {
        return cy.get(closeCartButton);
    }
    
    getIncreaseQuantityButton () {
        return cy.get(quantityCartButtons).last();
    }

    getProceedCheckoutButton () {
        return cy.get(proceedCheckoutButton);
    }

    getProductQuantityInput () {
        return cy.get(productQuantityInput);
    }

    getTotalPrice () {
        return cy.get('[class*=SidebarLayout] span').contains('Total').next();
    }
    
    getProductNameLabel () {
        return cy.get(productNameLabel);
    }

    getProductsSizeLabel () {
        return cy.get('[class*="CartItem_root"]').contains('Size');
    }

    increaseProductQuantitiy = (quantToAdd) => {  
        this.getProductQuantityInput().then($value => {
            let curQuantity = $value.val();
            if (curQuantity < quantToAdd) {
                this.getIncreaseQuantityButton().click();  
                this.increaseProductQuantitiy(quantToAdd);
            } return;
        });  
    }

}

module.exports = new CartPage();