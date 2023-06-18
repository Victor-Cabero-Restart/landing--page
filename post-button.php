<?php 

require "template/database.php";
// on envoie un post pré-écrit dans la database des tweets pour qu'il apparaisse comme tweet qand on va appuyer sur le bouton
$insert = $database -> prepare("INSERT INTO tweet (texte) VALUES (:envoie_tweet)");
$insert -> execute(
    [
        "envoie_tweet" => "Ceci est un post fait par un bouton"
    ]
);

header("Location: hptweet.php");
?>