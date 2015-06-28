<?php
    // Parveen Arora - parveen1112@gmail.com
    // Since we have set the Content Type in Order.php as JSON.
    // We need to send errors as well in JSON format.
    // Database layer to connect with mysql
    function readConfigurationFile()
    {
        $string = file_get_contents("config.json");
        return json_decode($string, true);
    }
    function DB(){
        $db = readConfigurationFile();
        // Create connection
        $conn = mysql_connect($db['servername'], $db['username'], $db['password']);
        // Check connection
        if (!$conn) {
            $error = mysql_error();
            echo '{"error" : $error}';
            exit;
        }
        if (!mysql_select_db($db['databasename'], $conn)) {
            echo '{"error" : "Could not select database"}';
            exit;
        }
        return $conn;
    }
    
    function executeQuery($query)
    {
        $result = mysql_query($query);
        if (!$result) {
            $error = mysql_error();
            echo '{"error" : "'.$error.'"}';
            exit;
        }
        return $result;
    }
    
    function getData($query)
    {
        $result = executeQuery($query);
        $rows = array();
        while($r = mysql_fetch_assoc($result)) {
            $rows[] = $r;
        }
        
        return $rows;
    }
?>