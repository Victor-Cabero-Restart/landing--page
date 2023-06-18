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

        <main class="mainSUB">
<!-- zone de remplissage pour l'inscription -->
        <form class="form" method="POST" action="insert-sub.php">
            <div>
                <input type="text" name="nom" placeholder="Ecris ton nom" required>
            </div>
            <div>
                <input type="text" name="pseudo" placeholder="Nom d'utilisateur" required>
            </div>
            <div>
                <input type="email" name="mail" placeholder="Mail" required>
            </div>
            <div>
                <input type="password" name="mdp" placeholder="Mot de passe" required>
            </div>
            <div>
                <input type="url" name="photo" placeholder="Photo de profil" required>
            </div>
            <button type="submit" class="Bouton"><a href="hptweet.php" style="text-decoration:none">Envoyer</a></button>
        </form>
        </main>
    </body>
</html>