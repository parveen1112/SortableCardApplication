<?php
    // Parveen Arora - parveen1112@gmail.com
    // Order.php is the controller to handle GET and POST requests

    header('content-type: application/json; charset=utf-8');
    require("database.php");
    DB();
    function isAjax() {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }
    if (isAjax())
    {
        if (isset($_GET['data']))
        {
            $rows = getData("SELECT * FROM Orders;");
            echo json_encode($rows);
        }
        if (isset($_POST['add']))
        {
            $obj = $_POST['add'];
            $number = intval($obj['OrderNumber']);
            $quantity = intval($obj['Quantity']);
            $address = $obj['Address'];
            $payment = floatval($obj['Payment']);
            $phoneNumber = $obj['PhoneNumber'];
            $result = getData("SELECT * FROM Orders WHERE OrderNumber = $number");
            if (empty($result))
            {
                $res = executeQuery("INSERT INTO Orders VALUES ($number,$quantity,'$address','$phoneNumber',$payment)");
            }
            else
            {
                $sql = "UPDATE Orders ".
                        "SET Address='$address', Quantity=$quantity, Payment=$payment, PhoneNumber='$phoneNumber' ".
                        "WHERE OrderNumber = $number" ;
                $res = executeQuery($sql);
            }
            $converted_res = ($res) ? 'true' : 'false';
            echo '{"result":"'.$converted_res.'"}';
        }
        else if (isset($_POST['remove']))
        {
            $obj = $_POST['remove'];
            $b = intval($obj['OrderNumber']);
            $result = executeQuery("DELETE FROM Orders WHERE OrderNumber = ".$b."");
            $converted_res = ($result) ? 'true' : 'false';
            echo '{"result":"'.$converted_res.'"}';
        }
    }
?>