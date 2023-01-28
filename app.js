// Initialize user ship
var userShip = {
    element: document.getElementById("user-ship"),
    x: 0,
    y: 0,
    width: 150,
    height: 150,
    shooting: false
  };
  
  // Initialize enemy ships
  var enemyShips = [];
  var enemyShipsContainer = document.getElementById("enemy-ships");
  
  function moveUserShip(e) {
    userShip.x = e.clientX - 75;
    userShip.y = e.clientY - 75;
    userShip.element.style.left = userShip.x + "px";
    userShip.element.style.top = userShip.y + "px";
  }
  
  function createEnemyShip() {
    var enemy = {
      element: document.createElement("div"),
      data: {
        x: Math.random() * window.innerWidth,
        y: -50,
        width: 40,
        height: 40,
        speed: Math.random() * 5 + 1,
        size: Math.random()*(2-1)+1
      }
    };
    enemy.element.innerHTML = `<img src="bug.png">`
    enemy.element.classList.add("enemy-ship");
    enemyShipsContainer.appendChild(enemy.element);
    enemyShips.push(enemy);
  }

  var point = 0;
  var squash = document.querySelector(".squash");
  var splash = document.querySelector(".splash");
  const score = document.querySelector(".score");
  var winnerText = document.querySelector("h1");
  var winBoard = document.querySelector(".winner");
  var close = document.querySelector(".close");
  var gameContainer = document.getElementById("game-container");

  function kill(){
    splash.innerHTML = `<img src="effect.png">`;
    splash.style.left =userShip.x + 'px';
    splash.style.top =userShip.y + 'px';
}
  
  function update() {
    for (var i = 0; i < enemyShips.length; i++) {
      const enemy = enemyShips[i];
      enemy.data.y += enemy.data.speed;
      enemy.element.style.left = enemy.data.x + "px";
      enemy.element.style.top = enemy.data.y + "px";
      enemy.element.style.transform = `scale(${enemy.data.size})`;
      // Check if user is shooting
      if (userShip.shooting) {
        if (userShip.x < enemy.data.x + enemy.data.width &&
            userShip.x + userShip.width > enemy.data.x &&
            userShip.y < enemy.data.y + enemy.data.height &&
            userShip.height + userShip.y > enemy.data.y) {
          // remove enemy ship from the DOM
          enemyShipsContainer.removeChild(enemy.element);
          // remove enemy ship from the game
          enemyShips.splice(i, 1);
          kill();
          point++;
          score.innerHTML=point
          if(point == 25){
            winBoard.classList.add("show");
            gameContainer.classList.add("hide");
            winnerText.textContent = 'You win a coil';
          }else if(point == 50){
            winBoard.classList.add("show");
            gameContainer.classList.add("hide");
            winnerText.textContent = 'You win a Bat';
          }else if(point == 75){
            winBoard.classList.add("show");
            gameContainer.classList.add("hide");
            winnerText.textContent = 'Goodnight';
          }else if(point == 100){
            winBoard.classList.add("show");
            gameContainer.classList.add("hide");
            winnerText.textContent = 'God level';
          }
          break;
        }
      }
    }
      userShip.shooting = false;
      setTimeout(update, 10);
    }

  // Event Listeners
  close.addEventListener("click",()=>{
    winBoard.classList.remove("show");
    gameContainer.classList.remove("hide");
  })
  document.addEventListener("mousemove", moveUserShip);
  document.addEventListener("mousedown", function() {
    userShip.shooting = true;
    squash.play();
  });
  setInterval(createEnemyShip, 700);
  update();
  