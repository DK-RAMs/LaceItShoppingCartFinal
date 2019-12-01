// Color class Javascript file
// Dikabelo Ramashala
// 28th November 2019


/*** ColorVal class that stores colorName, price and discount **/

class ColorVal {
    
    constructor(id, colorName, price, discount){
        this.id = id;
        this.colorName = colorName;
        this.price = parseFloat(price);
        this.discount = parseFloat(discount)/100;
    }
    
    /** Returns the price of the product, less discount **/
    getPrice(){
        return (this.price - (this.price*this.discount)).toFixed(2);
    }
}

class CartItem{
    constructor(item, numToBuy){
        this.item = item;
        this.numToBuy = numToBuy;
    }
    
    updateItem(num){
        this.numToBuy = this.numToBuy + num;
    }
    
    getTotal(){
        return (this.item.getPrice()*this.numToBuy);
    }
}

class Cart {
    
    /*** In case there is an already pre-existing cart that is being saved somewhere :shrug: ***/
    items;
    
    stuff;
    
    constructor(items){
        this.items = items;
    }
    
    
    add(item, numToBuy){
        // Assume that it isn't in the cart
        let inCart = false;
        
        // Checks if item exists in cart
        for(let i = 0; i < this.items.length; i++){
            if(item.id == this.items[i].item.id){
                inCart = true;
                this.items[i].updateItem(numToBuy);
                break;
            }
        }
        if(!inCart){
            this.items.push(new CartItem(item, numToBuy));
        }
    }
    
    getTotal(){
        let totalCost = 0;
        for(let i = 0; i < this.items.length; i++){
            totalCost = totalCost + this.items[i].getTotal();
        }
        return totalCost;
    }
    
    size(){
        let numItems = 0;
        for(let i = 0; i < this.items.length; i++){
            numItems = numItems + this.items[i].numToBuy;
        }
        return numItems;
    }
    
    clear(){
        this.cart.clear();
    }
}