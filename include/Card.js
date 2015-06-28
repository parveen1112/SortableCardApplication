// Parveen Arora  - parveen1112@gmail.com
// It involves jQuery functions as well so make sure one should include this file along with jQuery.
// It also involves CSS tags and images defined in styles/styles.css and styles/images folder.
function OrderNumberList()
{
    this.orderNumberList = [];
}

OrderNumberList.prototype.add = function(orderNumber)
{
    var index = this.get(orderNumber);
    if (index <= -1)
    { 
        this.orderNumberList.push(orderNumber);
        return true;
    }
    return false;
}

OrderNumberList.prototype.remove = function(orderNumber)
{
    var index = this.get(orderNumber);
    if (index > -1)
    {
        this.orderNumberList.splice(index);
    }
}

OrderNumberList.prototype.get = function(orderNumber)
{
    return this.orderNumberList.indexOf(orderNumber);
}

oNumList = new OrderNumberList();

function Card(OrderNumber, OrderQuantity, Address, PhoneNumber, Payment)
{
    this.card = document.createElement("div");
    this.card.setAttribute("class", "sortable");
    this.card.style.height = "120px";
    this.removeImage = document.createElement("img");
    this.removeImage.setAttribute("class", "remove");
    this.removeImage.setAttribute("src", "styles/images/icn_remove.png");
    this.removeImage.setAttribute("title", "Remove Card");
    $(this.removeImage).click(this.removeCard.bind(this));
    this.editMode = false;
    this.orderNumber = document.createElement("div");
    var orderNumberLabel = document.createElement("label");
    var orderNumberTextarea = document.createElement("input");
    orderNumberTextarea.type = "text";
    orderNumberTextarea.style.height = "20px";
    orderNumberTextarea.setAttribute("placeholder", "Order Number");
    orderNumberTextarea.required = true;
    this.orderNumber.setAttribute("class", "prefLabel");
    
    this.orderNumber.appendChild(orderNumberLabel);
    this.orderNumber.appendChild(orderNumberTextarea);
    this.dataBinding(orderNumberTextarea, orderNumberLabel, "Order Number");

    this.orderQuantity = document.createElement("div");
    var orderQuantityLabel = document.createElement("label");
    var orderQuantityTextarea = document.createElement("input");
    orderQuantityTextarea.type = "text";
    orderQuantityTextarea.setAttribute("placeholder", "Order Quantity");
    orderQuantityTextarea.style.height = "20px";
    this.orderQuantity.setAttribute("class", "prefLabel");
    this.orderQuantity.appendChild(orderQuantityLabel);
    this.orderQuantity.appendChild(orderQuantityTextarea);
    this.dataBinding(orderQuantityTextarea, orderQuantityLabel, "Order Quantity");

    this.address = document.createElement("div");
    var addressLabel = document.createElement("label");
    
    var addressTextarea = document.createElement("input");
    addressTextarea.type = "text";
    addressTextarea.setAttribute("placeholder", "Address");
    addressTextarea.style.height = "20px";
    this.address.setAttribute("class", "prefLabel");
    this.address.appendChild(addressLabel);
    this.address.appendChild(addressTextarea);
    this.dataBinding(addressTextarea, addressLabel, "Address");

    this.payment = document.createElement("div");
    var paymentLabel = document.createElement("label");
    var paymentTextarea = document.createElement("input");
    paymentTextarea.type = "text";
    paymentTextarea.setAttribute("placeholder", "Payment");
    paymentTextarea.style.height = "20px";
    this.payment.setAttribute("class", "prefLabel");
    this.payment.appendChild(paymentLabel);
    this.payment.appendChild(paymentTextarea);
    this.dataBinding(paymentTextarea, paymentLabel, "Payment");

    this.phoneNumber = document.createElement("div");
    var phoneNumberLabel = document.createElement("label");
    var phoneNumberTextarea = document.createElement("input");
    phoneNumberTextarea.type = "text";
    phoneNumberTextarea.setAttribute("placeholder", "Phone Number");
    phoneNumberTextarea.style.height = "20px";
    this.phoneNumber.setAttribute("class", "prefLabel");
    this.phoneNumber.appendChild(phoneNumberLabel);
    this.phoneNumber.appendChild(phoneNumberTextarea);
    this.dataBinding(phoneNumberTextarea, phoneNumberLabel, "Phone Number");

    this.button = document.createElement("button");
    this.button.innerHTML = "SAVE";
    this.button.style.marginTop = "10px";
    this.button.style.marginLeft = "100px";
    $(this.button).button();
    $(this.button).click(this.save.bind(this));

    this.editImage = document.createElement("img");
    this.editImage.setAttribute("class", "edit");
    this.editImage.setAttribute("src", "styles/images/icn_edit.png");
    $(this.editImage).click(this.editCard.bind(this));
    this.editImage.setAttribute("title", "Edit Card");

    this.card.appendChild(this.editImage);
    this.card.appendChild(this.removeImage);
    this.card.appendChild(this.orderNumber);
    this.card.appendChild(this.orderQuantity);
    this.card.appendChild(this.address);
    this.card.appendChild(this.payment);
    this.card.appendChild(this.phoneNumber);
    this.card.appendChild(this.button);

    if (OrderNumber != undefined)
    {
        this.hideEditableCard();
        oNumList.add(OrderNumber);
        $(orderNumberTextarea).val(OrderNumber);
        $(orderQuantityTextarea).val(OrderQuantity);
        $(addressTextarea).val(Address);
        $(phoneNumberTextarea).val(PhoneNumber);
        $(paymentTextarea).val(Payment);
        $(orderNumberLabel).text("Order Number : " + OrderNumber);
        $(orderQuantityLabel).text("Order Quantity : " + OrderQuantity);
        $(addressLabel).text("Address : " + Address);
        $(phoneNumberLabel).text("Phone Number : " + PhoneNumber);
        $(paymentLabel).text("Payment : " + Payment);
    }
    else
    {
        this.showEditableCard();
    }

    return this.card;
}
// One can use form and HTML5 Form Validation constraints
Card.prototype.validateCard = function()
{
    var orderNumber = $(this.orderNumber).find('input').val().trim()
    var orderQuantity = $(this.orderQuantity).find('input').val().trim()
    var address = $(this.address).find('input').val().trim();
    var payment = $(this.payment).find('input').val().trim();
    var phoneNumber = $(this.phoneNumber).find('input').val().trim();
    var paymentPattern = /^\d+(\.\d{1,2})?$/;
    var phoneNumberPattern = /^\d{10}$/;
    if (orderNumber == "" || orderQuantity == "" || address == "" || payment == "" || phoneNumber == "")
    {
        alert("Please fill all the fields");
        return false;
    }
    if (!parseInt(orderNumber))
    {
        alert("Please Enter Integers in Order Number");
        return false;
    }
    if (oNumList.get(orderNumber) > -1)
    {
        alert("Order Number already exists. It should be unique better edit the order.");
        return false;
    }
    if (!parseInt(orderQuantity))
    {
        alert("Please Enter Integers in Order Quantity");
        return false;
    }
    if (!(paymentPattern.test(payment)))
    {
        alert("Please Enter Float upto two decimal in Payment");
        return false;
    }
    if (!(phoneNumberPattern.test(phoneNumber)))
    {
        alert("Please Enter 10 digit Phone Number only");
        return false;
    }
    return true;
}

Card.prototype.editCard = function()
{
    this.editMode = true;
    var orderNumber = $(this.orderNumber).find('input').val();
    oNumList.remove(orderNumber);
    this.showEditableCard();
}

Card.prototype.showEditableCard = function()
{
    this.card.style.height = "120px";
    $(this.card).find('label').hide();
    $(this.card).find('input[type=text]').show();
    $(this.button).show();
}

Card.prototype.hideEditableCard = function()
{
    this.card.style.height = "100px";
    $(this.card).find('input[type=text]').hide();
    $(this.card).find('label').show();
    $(this.button).hide();
}

Card.prototype.removeCard = function()
{
    var orderNumber = $(this.orderNumber).find('input').val();
    var json = {remove : {"OrderNumber" : orderNumber,
        "Quantity" : $(this.orderQuantity).find('input').val(),
        "Address" : $(this.address).find('input').val(),
        "Payment" : $(this.payment).find('input').val(),
        "PhoneNumber" : $(this.phoneNumber).find('input').val()}
    };
    this.sendPostAjax(json);
    oNumList.remove(orderNumber);
    $(this.card).remove();
}

Card.prototype.sendPostAjax = function(postData)
{
    $.ajax({
        type: "POST",
        url: "include/Order.php",
        data: postData,
        success: function (data) {
                console.log(JSON.stringify(data));
            }
    });
}

Card.prototype.save = function()
{
    if (this.validateCard())
    {
        var orderNumber = $(this.orderNumber).find('input').val();
         var json = {add : {"OrderNumber" : orderNumber,
            "Quantity" : $(this.orderQuantity).find('input').val(),
            "Address" : $(this.address).find('input').val(),
            "Payment" : $(this.payment).find('input').val(),
            "PhoneNumber" : $(this.phoneNumber).find('input').val()}
        };
        this.sendPostAjax(json);
        oNumList.add(orderNumber);
        this.hideEditableCard();
    }
}

Card.prototype.dataBinding = function (elementBind, elementReflectOn, prependText)
{
    $(elementBind).on('input propertychange paste', function(){
        $(elementReflectOn).text(prependText + " : " + $(this).val());
    });
}