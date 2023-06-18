<?php 

require "template/database.php";

$requete = $database->prepare("SELECT * From tweet ORDER BY publish_date DESC");
$requete->execute();
$allTweet = $requete->fetchAll(PDO::FETCH_ASSOC);


?>


<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cercle Elden</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/418817eca6.js" crossorigin="anonymous"></script>
</head>

<body>
    <div class="titre">
     <h1><a href="hptweet.php" style="text-decoration:none">Le cercle d'Elden</a></h1>
    </div>

    <div class="racine">
        <button class="bouton-racine" onclick="window.location.href = 'inscription.php';" style="text-decoration:none"> 
            Inscription 
        </button>
    </div>

    <div class="texteB">
        <p>Le cercle d'Elden va vous permettre de parler avec d'autres personnes en fonction de filtres choisis comme la proximité, une passion, un métier...</p>
    </div>

    <div class= "option">
        <form class="forme" method="GET" action="search.php">
            <div>
                <input type="text" name="recherche" placeholder="Ecris ta recherche">
            </div>
            <button type="submit" class="Bouton">Rechercher </button>

        </form>

        <form class="forme" method="POST" action="insert-tweet.php">
            <div>
                <input type="text" name="texte" placeholder="Ecris ton tweet">
            </div>
            <button type="submit" class="Bouton">Envoyer </button>
        </form>

        <div class="SpaceInvaders_link">
            <button class="Bouton"> 
                <a href="index.html" style="text-decoration:none"> Space Invaders </a>
            </button>
        </div>
    </div>

    <div class="ALLtweet">
        <?php foreach($allTweet as $tweets) {  ?>
            <div class="texte">
                <p class="contenu"><?=$tweets['texte']?></p>
                <p><?=$tweets['publish_date']?></p>
                <form action="delete.php" method="POST">
                    <input type="hidden" name="supp" value="<?= $tweets['id'] ?>">
                    <button type="submit" class="Bouton">Supprimer</button>
                </form>
            </div>
        <?php } ?> 
    </div>
    
    <footer>
     <ul>
      <li> <a href="https://www.instagram.com/"> <i class="fa-brands fa-instagram"></i> </a> </li>
      <li> <a href="https://twitter.com/"> <i class="fa-brands fa-twitter"></i> </a> </li>
      <li> <a href="https://www.tiktok.com/fr/"> <i class="fa-brands fa-tiktok"></i> </a> </li>
      <li> <a href="https://www.facebook.com/login/"> <i class="fa-brands fa-facebook"></i> </a> </li>
     </ul>
    </footer>
</body>
</html>