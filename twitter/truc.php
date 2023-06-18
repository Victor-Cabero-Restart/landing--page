<?php 

require "template/database.php";
// on récupère le dernier post
$requete = $database->prepare("SELECT * From tweet ORDER BY publish_date DESC LIMIT 1");
$requete->execute();
$lastTweet = $requete->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($lastTweet)
?>