// Shopping Cart Javascript file
// Dikabelo Ramashala
// 20th November 2019

/**** Available colors array. Will be replaced with a server query which collects the available colors on the system.

For now, being hard coded.***/

var colorDetails = ["Orange, 11.99, 25", "Yellow, 8.99, 25", "Slate Blue, 7.99, 25", "Steel Blue, 8.99, 25", "Dark Salmon, 6.99, 25", "Deep Sky Blue, 10.59, 25", "Lawn Green, 12.49, 25", "White, 10.99, 10", "Deep Pink, 6.99, 69", "Light Salmon, 7.49, 25", "Medium Sea Green, 12.49, 25", "Gray, 9.99, 25", "Brown, 4.99, 25", "Turquoise, 12.49, 25", "Light Gray, 5.49, 25", "Crimson, 4.20, 25", "Blue Violet, 9.69, 25", "Black, 10.99, 10"];

var availableColors = [];

/*********** HTML code that is added to document on the fly ******************/

/* HTML that displays the number of items that the customer wants to buy */
var correctEntryAddToCartModalBodyHTML = 
    '<p id="num-items-spec">How many are you buying?</p>' + 
    '<div id="num-items-controller-div" class="text-center">' +
        '<p id="selected-color-modlar" class="d-inline">N/A</p>' +
        '<div id="editStuffystuffstyff" class="d-inline">' +
            '<button id="decrementItemInCart" type="button" class="btn">' +
                '-' +
            '</button>' +
            '<span><strong id="number-of-items-to-buy">1</strong></span>' +
            '<button id="incrementItemInCart" type="button" class="btn">' +
                '+' +
            '</button>' +
        '</div>' + 
    '</div>';

var correctEntryAddToCartModalFooterHTML = '<button type="button" id="cancelAdd2CartModalButton" data-dismiss="modal" class="btn hick-modal-btn-cancel d-inline">'+
                                'Cancel' +
                            '</button>' +
                            '<button type="button" id="acceptAdd2CartModalButton" class="btn hick-modal-btn-accept d-inline" data-dismiss="modal">' +
                                'Accept' +
                            '</button>';

var incorrectEntryAddToCartModalBodyHTML = 
    '<p>You didn\'t select anything to add to the cart! Try choosing something and then coming back here ^^</p>';
var incorrectEntryAddToCartModalBodyFooterHTML = '<button type="button" id="incorrectAdd2CartModalButton" data-dismiss="modal" class="btn hick-modal-btn-cancel d-inline">'+
                                'OK' +
                            '</button>'

/************** All HTML code that is injected via Javascript using inserts etc **************/

var colorWheel = document.getElementById("colorselector");

var colorCart = document.getElementById("selected-items");

var checkoutBody = document.getElementById("checkoutTableBody");

var checkoutTable = document.getElementById("checkoutTable");

var currentIndex = -1;

var numItemsToBuy = 1;

var maxCounter = 50;

var created = false;

/*** Array of items in cart that is pre-saved on servers ***/

var cartArr = [];

var cart;

/************* Add to cart button functions ***********/

var checkSpecToCart = function(){
    document.getElementById("add2CartModalBody").innerHTML = "";
    document.getElementById("add2CartModalFooter").innerHTML = "";
    document.getElementById("add2CartModalBody").style.visibility = "visible";
    document.getElementById("add2CartModalFooter").style.visibility = "visible";
    if(currentIndex < 0){
        /***** Do all functions and code here*/
        document.getElementById("add2cartModalLongTitle").innerHTML= "Oops";
        
        frag = createDiv(incorrectEntryAddToCartModalBodyHTML);
        document.getElementById("add2CartModalBody").appendChild(frag);
        
        frag = createDiv(incorrectEntryAddToCartModalBodyFooterHTML);
        document.getElementById("add2CartModalFooter").appendChild(frag);
    }
    else{
        document.getElementById("add2cartModalLongTitle").innerHTML= "Add to cart";
        
        let frag = createDiv(correctEntryAddToCartModalBodyHTML); /** will do this later **/
        document.getElementById("add2CartModalBody").appendChild(frag); /** will do later **/
        document.getElementById("selected-color-modlar").innerHTML = availableColors[currentIndex].colorName;
        
        frag = createDiv(correctEntryAddToCartModalFooterHTML);
        document.getElementById("add2CartModalFooter").appendChild(frag);
        
        createAddToCartOnClickEvents();
    }
}

var makeCartModal = function(){
    checkoutBody.innerHTML = "";
    for(let i = 0; i < cart.items.length; i++){
        var row = checkoutTable.insertRow(i);
        var numCell = row.insertCell(0);
        var colCell = row.insertCell(1);
        var nameCell = row.insertCell(2);
        var totalCell = row.insertCell(3);
        
        /*
        let tableEntryCode = '<th scope="row"><span id="CartCountItem1">' + cart.items[i].numToBuy + 'x</span></th>' +
        '<td><div class="cartcolorblock d-inline" id="carttableColorItem' + i + '"></div></td>'+
        '<td>'+ cart.items[i].item.colorName +'</td>' +
        '<td>$' + cart.items[i].getTotal() + '</td>'
        ;
        let tableEntry = createHTMLFragment(tableEntryCode, "tr");
        checkoutBody.appendChild(tableEntry);*/
        
    }
    alert(cart.getTotal());
}

var makeCartItemHTML = function(cartItem){
    
}
/********* Modal Functions ************/ 

// Adds all relevant items to cart in modal
var addItemsToCart = function(){
    let col = availableColors[currentIndex];
    cart.add(col, numItemsToBuy);
    colorCart.innerHTML = "";
    // Change this
    
    for(let i = 0; i < cart.items.length; i++){
        let currentCartEntry = cart.items[i];
        for(let j = 0; j < currentCartEntry.numToBuy; j++){
            let coldiv = '<div id="cartcolor ' + currentCartEntry.item.colorName + j + '" class="cartcolorblock d-inline-block"></div>';
            let frag = createDiv(coldiv);
            colorCart.appendChild(frag);
            document.getElementById("cartcolor " + currentCartEntry.item.colorName + j).style.backgroundColor = convertToColor(currentCartEntry.item.id);
            
            
        }
    }
    document.getElementById("quantity-div").innerHTML = cart.size();
    document.getElementById("checkoutbutton").style.display = "block";
}

var resetBuyCounter = function(){
    numItemsToBuy = 1;
    document.getElementById("number-of-items-to-buy").innerHTML = 1;
}

var incrementBuyCounter = function(){
    if(numItemsToBuy < maxCounter){
        numItemsToBuy++;
        document.getElementById("number-of-items-to-buy").innerHTML = numItemsToBuy;
    }
}

var decrementBuyCounter = function(){
    if(numItemsToBuy > 1){
        numItemsToBuy--;
        document.getElementById("number-of-items-to-buy").innerHTML = numItemsToBuy;
    }
}

/** Cart Buttons **/
var checkOut = function(elementID){
    
}

var clearCart = function(){
    
    
    
    
    document.getElementById("checkoutbutton").style.display = "none";
}

var createAddToCartOnClickEvents = function(){
    // Add to cart Modal onClick events
    acceptAdd2CartModalButton.addEventListener("click", function(){
        addItemsToCart();
        resetBuyCounter();
    });
    cancelAdd2CartModalButton.addEventListener("click", function(){
        resetBuyCounter();
        document.getElementById("add2CartModalBody").style.visibility = "hidden";
    });
    incrementItemInCart.addEventListener("click", function(){
        incrementBuyCounter();
    });
    decrementItemInCart.addEventListener("click", function(){
        decrementBuyCounter();
    });
}

var hoverStarRating = function(a){
    for(let i = 0; i < a; i++){
        let starval = "star" + (i+1);
        document.getElementById(starval).style.opacity = 1;
    }
}

/*** fixes issue with recreating fade border when item is clicked***/
var checkSelection = function(a){
    if(document.getElementById("color " + a).style.borderColor == "black"){
         return null;
    }
    else{
        return document.getElementById("color " + a).style.borderColor = "white";
    }
}

var resetonHover = function(a){
    if(document.getElementById("color " + a).style.borderColor == "black"){
        return null;
    }
    else{
        return document.getElementById("color " + a).style.borderColor = "lightgrey";
    }
}

var resetSelection = function(a){
    document.getElementById("color " + a).style.borderColor = "white";
    document.getElementById("color " + a).onmouseover = function(){
        resetonHover(a);
    }
    document.getElementById("color " + a).onmouseout = function(){
        checkSelection(a);
    }
}

var setcolor = function(a){
    if(a < 0){
        document.getElementById("selected-color").innerHTML = "-";
        document.getElementById("netpriceval").innerHTML = "-";
        document.getElementById("netpriceval").style.display = "hidden";
        document.getElementById("basepriceval").innerHTML = "-";
        document.getElementById("discrateval").innerHTML = "-";
        
    }
    else{
        if(currentIndex >= 0){
            resetSelection(currentIndex);
        }
        document.getElementById("selected-color").innerHTML = availableColors[a].colorName;
        document.getElementById("netpriceval").innerHTML = availableColors[a].getPrice();
        document.getElementById("basepriceval").innerHTML = availableColors[a].price.toFixed(2);
        document.getElementById("discrateval").innerHTML = availableColors[a].discount*100;
        document.getElementById("color " + a).style.borderColor = "black";
        document.getElementById("color " + a).style.borderStyle = "solid";
        currentIndex = a;
    }
    
}

var readyCart = function(){
    cart = new Cart([]);
    for(let i = 0; i < cartArr.length; i++){
        cart.addToCart(cartArr[i]);
    }
}

/*** Creates a div with nested "a" string in it (Used to make HTML code on the fly via Javascript)****/
var createDiv = function(a){
    let fragment = document.createDocumentFragment();
    let temp = document.createElement("div");
    temp.innerHTML= "<div>" + a + "</div>";
    while(temp.firstChild){
        fragment.appendChild(temp.firstChild);
    }
    return fragment;
}

var createHTMLFragment = function(htmlcode, elementType){
    let fragment = document.createDocumentFragment();
    let temp = document.createElement("TR");
    let str = "<div>" + htmlcode + "</div>"
    alert(str);
    temp.innerHTML= str;
    alert(temp.innerHTML);
    while(temp.firstChild){
        fragment.appendChild(temp.firstChild);
    }
    return fragment;
}

/**** Converts a specific color string to css color values ****/
var convertToColor = function(a){
    let v = availableColors[a].colorName;
    let w = v.split(" ");
    let finalstring = "";
    for(let x = 0; x < w.length; x++){
        finalstring = finalstring + w[x];
    }
    return finalstring;
}

/***** Creates onClick events for the whole document *****/
var createButtonOnClickEvents = function(){
    add2cartbutton.addEventListener("click", function(){
        checkSpecToCart();
    });
    checkoutbutton.addEventListener("click", function(){
        makeCartModal();
    });
}

var initializeColorSelector = function(){
    // In case there are no colors available for te specific product (query to server returns an array with no objects)
    if(availableColors.length == 0){
        let frag = createDiv('<p id="no-colors-available">None available</p>');
        document.getElementById("colorselector").appendChild(frag);
        document.getElementById("checkout-stuff").style.visibility = "hidden";
    }
    // Generates the color selector buttons for each available color
    else{
        for(let i = 0; i < availableColors.length; i++){
            // div created here
            let frag = createDiv('<div id="color ' + i + '" class="colorblock d-inline" data-toggle="tooltip" data-placement="top" title="' + availableColors[i].colorName + '"></div>');
            // frag div added here
            colorWheel.appendChild(frag);
            document.getElementById("color " + i).style.color = convertToColor(i);
            document.getElementById("color " + i).style.backgroundColor = convertToColor(i);
            document.getElementById("color " + i).addEventListener("click", function(){ setcolor(i)});
        }
    }
}

// Creates all color objects from the 
var initializeObjects = function(){
    for(let i = 0; i < colorDetails.length; i++){
        var a = colorDetails[i].split(",");
        // For now, id will be the current position of the color. In future, will be a value that is pulled from the database through a DB query (can be SQL or NO-SQL).
        availableColors.push(new ColorVal(i, a[0], a[1], a[2]));
    }
    cart = new Cart([]);
}

// Readies all hover events required on site
var readyHover = function(){
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });
    for(let i = 0; i < 5; i++){
        let starval = "star" + (i+1);
        document.getElementById(starval).addEventListener("hover", hoverStarRating(i));
    }
}

var readyDocument = function(){
    readyHover();
}

// Main function that is called once to initialize initiate script
var main = function() {
    createButtonOnClickEvents();
    initializeObjects();
    setcolor(currentIndex);
    initializeColorSelector();
    readyDocument();
}



main();