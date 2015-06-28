<?php
    // Parveen Arora - parveen1112@gmail.com
    // View : to display the cards
?>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>CARDS</title>

    <link rel="stylesheet" href="js-client/css/jquery-ui.min.css">
    <link rel="stylesheet" href="styles/styles.css">

    <script src="js-client/jquery.min.js"></script>
    <script src="include/Card.js"></script>
    <script src="js-client/jquery-ui.min.js"></script>
    
</head>
<script type="text/javascript">

$(function(){
    $.ajax({
        type: "GET",
        url: "include/Order.php?data=true",
        success: function (data) {
            if (typeof data == "object" && data[0] != undefined)
            {
                populateData(data);
            }
            else
            {
                console.log(JSON.stringify(data));
            }
        }
    });
    $('#psP').sortable({
        placeholder: "ui-state-highlight",
        helper:'clone',
        items:'.sortable'
    });
    $('#psP').draggable({cursor: "move"});
});

function populateData(array)
{
    for (i=0; i<array.length; i++)
    {
        addCard(array[i].OrderNumber, array[i].Quantity, array[i].Address, array[i].PhoneNumber, array[i].Payment);
    }
}

function addCard(OrderNumber, OrderQuantity, Address, PhoneNumber, Payment)
{
    $("#psP").append(new Card(OrderNumber, OrderQuantity, Address, PhoneNumber, Payment));
}

</script>
<body>

<div id="psP" class="cardContainer">
    <img src="styles/images/icn_add.png" title="Add New Card" class="addButton" onclick="addCard()"></img>
</div>

</body>
</html>