<?php

try {
    $database = new PDO(
        "mysql:host=localhost;dbname=twitter",
        "root",
        ""
    );
} catch(PDOException $error) {
    die("RIP : $error");
}

?>