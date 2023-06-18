<?php 

require 'template/database.php';

$insert = $database -> prepare("INSERT INTO twittos (nom, mail, mdp, pseudo, photo) VALUES (:envoie_nom, :envoie_mail, :envoie_mdp, :envoie_pseudo, :envoie_photo)");
$insert -> execute(
    [
        "envoie_nom" => $_POST['nom'],
        "envoie_mail" => $_POST['mail'],
        "envoie_mdp" => $_POST['mdp'],
        "envoie_pseudo" => $_POST['pseudo'],
        "envoie_photo" => $_POST['photo']
    ]
);

header("Location: inscription.php");
?>