#Features of Card Application:

1. User can add Cards, remove card and edit cards.
2. All the fields are need to be filled. According to the Format.{Validation is applied}
3. Cards positioned can be changed but only inside the container.
4. Card Container can be moved anywhere on the page.
5. User cannot add new card with same Order Number.

#Requirements:
MySQL (All the MySQL Commands are used not MySQLi(improved MySQL))
PHP
Web Server which support php

#ABOUT Application:

1. include/database.php : This file is used to interact with the MySQL. [Database Layer]
2. include/Order.php : This file acts as a Controller. It Handles GET and POST Request related to Orders table.
3. index.php : This file acts as a View.
4. include/Card.js - Reusable Card Class to create the Cards and handle its elements functionality.
4. js-client - Jquery UI,Jquery and its required images have been added along with the Card Application.
5. style/styles.css and style/images: Custom CSS and Custom Images.
6. include/config.json - This file contains the database connection parameters. Database name, Server, Username, password parameters.
7. If interested in UI only. Then Copy index.php in the same folder and rename it to index.html, Click it and see it.
Important: Please maintain the directory Structure.


#How to host the Application:
1. CardDatabase.sql is provided with the package. MySQL Script. [Engine: InnoDB]
2. Copy the Card Folder in the Hosting configured directory. [Default DocumentRoot "C:/xampp/htdocs" on Windows, /var/www/ on Ubuntu]
3. include/config.json - Please add the necessary parameters in this file.
    Servername - MysqlServerHost:Port
    username - MySQL Username
    password - MySQL Password
    Database name. If use have used CardDatabase.sql. Then database name will mydb.
4. <Server:port>/Card/index.php 
    [<Folder> where Card folder resides is the configured directory for taking requests]

If you are still not able to run it or wish to contribute. Then mail me
    Parveen Arora - <a href="mailto:parveen1112@gmail.com">parveen1112@gmail.com</a>