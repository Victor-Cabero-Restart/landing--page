<?php

require "template/database.php";

$search = $database->prepare("SELECT * FROM `tweet` WHERE `texte` LIKE '%".$_GET['recherche']."%' ORDER BY publish_date DESC");
$search->execute();
$searchTweet = $search->fetchAll(PDO::FETCH_ASSOC);

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
    
    <div class="ALLtweet">
        <?php foreach ($searchTweet as $twit) { ?>
            <div class="texte">
                <p class="contenu"><?= $twit['texte'] ?></p>
                <p><?=$twit['publish_date']?></p>
                <form action="delete.php" method="POST">
                    <input type="hidden" name="supp" value="<?= $twit['id'] ?>">
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