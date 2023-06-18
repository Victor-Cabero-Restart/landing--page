
<?php 

require 'template/database.php';

$insert = $database -> prepare("INSERT INTO tweet (texte) VALUES (:envoie_tweet)");
$insert -> execute(
    [
        "envoie_tweet" => $_POST['texte']
    ]
);

header("Location: hptweet.php");
?>