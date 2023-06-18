 class GameObject {       // on définit les paramètres d'un objet qui sera la base de tous les autres objets
        constructor(x, y, width, height, color) {   // x et y pour la position, width et height pour la taille et color pour la couleur
          // on utilise this pour paramétrer l'objet directement
          this.x = x;
          this.y = y;

          this.width = width;
          this.height = height;

          this.color = color;
        }

        draw(ctx) {     // on utilise draw pour pouvoir dessiner notre objet
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        update(dx, dy) {    // on utilise update pour le déplacement de l'objet, on définit sa position en temps réel 
          this.x += dx;
          this.y += dy;
        }

        collidesWith(obj) {     // on utilise collidesWith pour les collisions entre des objets 
          return (this.x < obj.x + obj.width
               && this.x + this.width > obj.x
               && this.y < obj.y + obj.height 
               && this.y + this.height > obj.y);
        }
      }

      class Bullet extends GameObject {     // Bullet hérite des propriétés et paramètres de GameObject
        constructor(x, y, width, height, color, dy) {
          super(x, y, width, height, color);
          this.dy = dy;     // la balle ne peut se déplacer que sur l'axe y 
        }

        update(dx, dy) {
          this.y += this.dy;      // on modifie le paramètre de déplacement hérité de GameObject pour que la balle parte devant l'objet
        }
      }

      class SpaceShip extends GameObject {        // SpaceShip sert de base pour le joueur et les ennemis et elle hérite des propriétés et paramètres de GameObject
        constructor(x, y, width, height, color, canvasHeight) {
          super(x, y, width, height, color);
          // on va utiliser canvasHeight pour définir une limite des balles tirées
          this.canvasHeight = canvasHeight;
          // on définit la taille des balles 
          this.bulletWidth = 4;
          this.bulletHeight = 8;
          // on définit la couleur des balles
          this.bulletColor = "#ff7800";
          // on définit qu'une balle est tirée par le SpaceShip
          this.bullets = [];
        }

        draw(ctx) {     // on remplace le draw hérédité de GameObject pour dessiner les balles de SpaceShip
          super.draw(ctx);
          // on dessine les balles de SpaceShip
          for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].draw(ctx);
            this.bullets[i].update(0, 0);

            // on vérifie la balle si elle est en dehors de la zone 
            if (this.bullets[i].y < 0 || this.bullets[i].y > this.canvasHeight) {
              // on la supprime si elle l'est
              this.bullets.splice(i, 1);
            }
          }
        }

        shoot(dy) {     // on utilise shoot pour tirer des balles dans la direction donnée
          this.bullets.push(new Bullet(
            this.x + this.width / 2 - this.bulletWidth / 2,
            this.y - this.bulletHeight,
            this.bulletWidth,
            this.bulletHeight,
            this.bulletColor,
            dy
          ));
        }
      }

      class Player extends SpaceShip {      // Player hérite des propriétés et paramètres de SpaceShip et va définir le joueur
        constructor(x, y, width, height, color, canvasHeight, canvasWidth) {
          super(x, y, width, height, color, canvasHeight);
          this.canvasWidth = canvasWidth;     // canvasWidth va définir la largeur du jeu
        }

        update(dx, dy) {      // on change la vérification de la position du joueur qui était défini avec celle hérité de SpaceShip
          super.update(dx, dy);

          // on garde le joueur dans la zone de jeu
          if (this.x < 0) {   // on empêche que le joueur sorte du jeu par la gauche
            this.x = 0;
          } else if (this.x + this.width > game.canvas.width) {      // on empêche que le joueur sorte du jeu par la droite
            this.x = game.canvas.width - this.width;
          }
        }
      }

      class Asteroid {      // on va définir les paramètres des astéroïdes
        constructor(x, y, width, height, color, noParts) {
          this.parts = [];      // on crée une zone vide pour les astéroïdes
          // on crée les parties d'astéroïdes
          for (var i = 0; i < noParts; i++) {   // on utilise la fonction for pour obtenir le nombre de parties d'astéroïdes voulus
            for (var j = 0; j < noParts; j++) {   // même chose avec une autre variable
              this.parts.push(new GameObject(
                x + i * width,    // on définit l'astéroïde sur l'axe x en fonction de son nombre de parties 
                y + j * height,   // on définit l'astéroïde sur l'axe y en fonction de son nombre de parties 
                width,
                height,
                color
              ));
            }
          }
        }

        draw(ctx) {     // on dessine les astéroïdes 
          for (var i = 0; i < this.parts.length; i++) {
            this.parts[i].draw(ctx);
          }
        }

        collidesWith(obj) {       // on vérifie si les astéroïdes ont une collision avec d'autres objets
          for (var i = 0; i < this.parts.length; i++) {
            if (this.parts[i].collidesWith(obj)) {
              return true;      // on renvoie true s'il y a collision
            }
          }
          return false;       // on renvoie false s'il n'y a pas collision
        }

        removeOnCollide(obj) {    // supprime la partie de l'astéroïde où il y a collision
          for (var i = 0; i < this.parts.length; i++) {
            if (this.parts[i].collidesWith(obj)) {
              this.parts.splice(i, 1);
              break;
            }
          }
        }
      }

      var game = {};      // on définit un objet vide qui sera utilisé pour les parmètres de jeu ci-dessous

      game.canvas = document.getElementById('canvas');    // on définit la zone de jeu 
      game.ctx = game.canvas.getContext('2d');        // on définit une zone bi-dimensionnelle

      game.backgroundColor = '#000000';       // on défini une couleur de fond

      game.asteroidsParts = 8;    // on définit le nombre de parties d'astéroïdes 
      game.noOfAsteroids = 8;     // on définit le nombre d'astéroïdes
      game.asteroidsSpace = 85;   // on définit l'espace entre les astéroïdes

      game.enemiesEachLine = 20;  // on définit le nombre d'ennemis pour chaque ligne
      game.enemyLines = 8;        // on définit le nombre de lignes d'ennemis 
      game.enemySpace = 30;       // on définit l'espace entre chaque ennemis
      game.enemyFireRate = 1000;  // on définit la fréquence de tirer pour les ennemis
      game.enemyFireTimer = 0;    // on définit depuis quand un ennemi a tiré
      game.enemyDirection = 1;    // on définit si les ennemis se déplace à gauche(-1) ou à droite(1)
      game.enemyStep = 5;         // on définit la distance des ennemis quand ils avancent vers le joueur

      game.update = function() {    // on définit une fonction pour gérer une boucle de jeu
        game.ctx.fillStyle = game.backgroundColor;    // on définit la couleur de l'arrière plan du jeu
        game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);   // on définit son placement et sa taille

        game.player.draw(game.ctx);   // on dessine le joueur dans le canva

        for (var i = 0; i < game.asteroids.length; i++) {   // on dessine les astéroïdes dans le canva
          game.asteroids[i].draw(game.ctx);
        }

        for (var i = 0; i < game.enemies.length; i++) {   // on dessine les ennemis dans le canva
          game.enemies[i].draw(game.ctx);
          game.enemies[i].update(game.enemyDirection, 0);
        }

        if (game.enemies.length == 0) {     // on vérifie si tous les ennemis ont été détruits par le joueur
          game.restart();     // on redémarre le jeu si la condition est rempli 
        }

        // on vérifie si les ennemis sont en dehors des limites du jeu
        if (game.enemyDirection == 1)     //si les ennemis vont à droite :
        {
          var closestToRightSideEnemy = game.enemies[0];      // on cherche à trouver l'ennemi le plus proche du côté droit des limites du jeu
          for (var i = 1; i < game.enemies.length; i++) {
            if (game.enemies[i].x > closestToRightSideEnemy.x) {
              closestToRightSideEnemy = game.enemies[i];
            }
          }

          if (closestToRightSideEnemy.x +       // on cherche à savoir si cet ennemi à atteint la limite droite du jeu
              closestToRightSideEnemy.width > game.canvas.width) {
            game.enemyDirection = -1;           // si cet ennemi atteint la limite droite, on inverse la direction de déplacement de tous les ennemis
            for (var i = 0; i < game.enemies.length; i++) {   // puis on déplace d'un game.enemyStep vers le bas tous les ennemis
              game.enemies[i].update(0, game.enemyStep);
            }
          }          
        }
        else if (game.enemyDirection == -1)     //si les ennemis vont à gauche :
        {
          var closestToLeftSideEnemy = game.enemies[0];     // on cherche à trouver l'ennemi le plus proche du côté gauche des limites du jeu
          for (var i = 1; i < game.enemies.length; i++) {
            if (game.enemies[i].x < closestToLeftSideEnemy.x) {
              closestToLeftSideEnemy = game.enemies[i];
            }
          }

          if (closestToLeftSideEnemy.x < 0) {       // on cherche à savoir si cet ennemi à atteint la limite gauche du jeu
            game.enemyDirection = 1;          // si cet ennemi atteint la limite gauche, on inverse la direction de déplacement de tous les ennemis
            for (var i = 0; i < game.enemies.length; i++) {     // puis on déplace d'un game.enemyStep vers le bas tous les ennemis
              game.enemies[i].update(0, game.enemyStep);
            }
          }
        }

        // on définit quand l'ennemi peut tirer une nouvelle fois
        game.enemyFireTimer += 10;        // on augmente de 10 le game.enemyFireTimer
        if (game.enemyFireTimer > game.enemyFireRate) {   //  quand le temps depuis le dernier tir ennemi est supérieur à la cadence de tir ennemi
          game.enemyFireTimer = 0;    // on redémarre le game.enemyFireTimer car un ennemi vient de tirer
          game.enemies[Math.floor(Math.random() * game.enemies.length)].shoot(5); // on choisit aléatoirement un ennemis pour tirer
        }

        // on vérifie si l'une des balles du joueur entre en collision avec un astéroïde
        for (var i = 0; i < game.player.bullets.length; i++) {
          for (var j = 0; j < game.asteroids.length; j++) {
            if (game.asteroids[j].collidesWith(game.player.bullets[i])) {
              game.asteroids[j].removeOnCollide(game.player.bullets[i]);
              game.player.bullets.splice(i, 1);
              break;
            }
          }
        }

        // on vérifie si l'une des balles ennemis entre en collision avec un astéroïde
        for (var i = 0; i < game.enemies.length; i++) {
          for (var j = 0; j < game.enemies[i].bullets.length; j++) {
            for (var k = 0; k < game.asteroids.length; k++) {
              if (game.asteroids[k].collidesWith(game.enemies[i].bullets[j])) {
                game.asteroids[k].removeOnCollide(game.enemies[i].bullets[j]);
                game.enemies[i].bullets.splice(j, 1);
                break;
              }
            }
          }
        }

        // on vérifie si l'une des balles du joueur entre en collision avec un ennemi
        for (var i = 0; i < game.player.bullets.length; i++) {
          for (var j = 0; j < game.enemies.length; j++) {
            if (game.enemies[j].collidesWith(game.player.bullets[i])) {
              game.enemies.splice(j, 1);
              game.player.bullets.splice(i, 1);
              break;
            }
          }
        }

        // on vérifie si l'une des balles d'un ennemi entre en collision avec le joueur
        for (var i = 0; i < game.enemies.length; i++) {
          for (var j = 0; j < game.enemies[i].bullets.length; j++) {
            if (game.player.collidesWith(game.enemies[i].bullets[j])) {
              game.restart();   // on redémarre le jeu
              break;
            }
          }
        }

        // on vérifie si un ennemi a atteint la position y du joueur
        for (var i = 0; i < game.enemies.length; i++) {
          if (game.enemies[i].y + game.enemies[i].height > game.player.y) {
            game.restart();   // on redémarre le jeu
            break;
          }
        }
      }

      game.keydown = function(e) {      // on crée une fonction e pour aasigner des touches à des actions
        if (e.keyCode == 37 || e.keyCode == 65) {       // si la flèche de gauche est enfoncée 
          game.player.update(-5, 0);      // le joueur se déplace à gauche
        }
        else if (e.keyCode == 39 || e.keyCode == 68) {      // si la flèche de droite est enfoncée 
          game.player.update(5, 0);     // le joueur se déplace à droite
        }
        else if (e.keyCode == 32) {     // si la barre espace est enfoncée
          game.player.shoot(-5);      // le joueur tire une balle
        }
      }      

      game.init = function() {    // on définit une fonction qui lance la boucle de jeu
        game.interval = setInterval(game.update, 1000 / 60);    // on définit la boucle de jeu

        // on place le joueur
        game.player = new Player(
          game.canvas.width / 2 - 50,   // on le place sur l'axe x
          game.canvas.height - 50,      // on le place sur l'axe y
          20,           // on définit sa largeur
          20,           // on définit sa hauteur
          '#0099CC',    // on définit sa couleur
          
        );

        // on place les astéroïdes
        game.asteroids = [];
        for (var i = 0; i < game.noOfAsteroids; i++) {
          game.asteroids.push(new Asteroid(
            game.asteroidsSpace + i * game.asteroidsSpace,    // on le place sur l'axe x
            game.canvas.height - 180,     // on le place sur l'axe y
            5,            // on définit sa largeur
            5,            // on définit sa hauteur
            '#ffffff',    // on définit sa couleur
            game.asteroidsParts   // on place les parties d'astéroïdes
          ));
        }

        // on place les ennemis
        game.enemies = [];
        for (var i = 0; i < game.enemyLines; i++) {
          for (var j = 0; j < game.enemiesEachLine; j++) {
            game.enemies.push(new SpaceShip(
              game.enemySpace + j * game.enemySpace,    // on le place sur l'axe x
              game.enemySpace + i * game.enemySpace,    // on le place sur l'axe y
              20,         // on définit sa largeur
              20,         // on définit sa hauteur
              '#FF0000'   // on définit sa couleur
            ));
          }
        }
      }

      // on définit une fonction pour arrêter la boucle de jeu
      game.stop = function() {
        clearInterval(game.interval);
      }

      // on définit une fonction pour redémarrer le jeu
      game.restart = function() {
        game.stop();    // le jeu s'arrête
        game.init();    // le jeu recommence
      }

      //le jeu démarre quand on charge la page
      window.onload = game.init;

      window.onkeydown = game.keydown;  // pour traiter les évènements correspondant aux touches enfoncées