window.onload = setup;
// Property variables
var maxInterval = 0.5,
  minInterval = 0.1;
var minWidth = 10,
  maxWidth = 20,
  minHeight = 15,
  maxHeight = 30,
  minRotationY = 360,
  maxRotationY = 1240,
  minRotationX = 300,
  maxRotationX = 1640,
  minDuration = 4,
  maxDuration = 10;
// Global objects
var container, timeline;

function setup() {
  container = document.querySelector("body");
  let claps = new Audio("claps.mp3");
  let text = document.querySelector(".happy-bday");
  let title = document.querySelector("title");
  text.innerHTML = location.href.split("#")[1]
    ? `Parabéns<br/>${decodeURI(location.href.split("#")[1])}!`
    : "Parabéns!";
  title.innerHTML = location.href.split("#")[1]
    ? `Feliz Aniversário, ${capitalize(
        decodeURI(location.href.split("#")[1])
      )}!`
    : "Feliz Aniversário!";
  gsap.registerPlugin(CSSPlugin);
  timeline = gsap.timeline();
  timeline.pause();
  timeline.from(".happy-bday", {
    opacity: 0,
    scale: 0,
    duration: 5,
    ease: "back",
  });
  minDuration = 8;
  for (let i = 0; i < 40; i++) {
    createConffeti(i * minInterval);
  }
  minDuration = 4;
  timeline.play();
  claps.play();
  tick();
}

function createConffeti(insertTime) {
  let confetti = document.createElement("div");
  confetti.className = "confetti";
  container.appendChild(confetti);
  animate(confetti, insertTime);
}

function tick() {
  let interval = Math.random() * (maxInterval - minInterval) + minInterval;
  setTimeout(() => {
    createConffeti(`<${interval}`);
    tick();
  }, interval * 1000);
}

function animate(conffeti, insertTime) {
  let factor = Math.random();
  timeline.fromTo(
    conffeti,
    {
      y:
        Math.random() * (window.innerHeight - maxHeight) +
        minHeight -
        window.innerHeight,
      x: Math.random() * (window.innerWidth - minWidth) + minWidth,
      backgroundColor: `hsl(${Math.random() * 360}, 100%, 55%)`,
      perspective: factor * 400 + 1,
      width: factor * (maxWidth - minWidth) + minWidth,
      height: factor * (maxHeight - minHeight) + minHeight,
      zIndex: factor * 30,
    },
    {
      y: window.innerHeight + 20,
      rotateY: factor * (maxRotationY - minRotationY) + minRotationY,
      rotateX: factor * (maxRotationX - minRotationX) + minRotationX,
      duration: (1 - factor) * (maxDuration - minDuration) + minDuration,
      ease: "linear",
      onComplete: () => conffeti.remove(),
    },
    insertTime
  );
}

function capitalize(str) {
  return str
    .split(" ")
    .map((str) => str[0].toUpperCase() + str.substring(1, str.length))
    .join(" ");
}
