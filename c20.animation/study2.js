const nightSky = document.querySelector(".night-sky");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const STAR_COUNT = 18;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function setRandomFlight(star, firstFlight = false) {
    const travel = Math.max(window.innerWidth, window.innerHeight) * random(0.75, 1.15);

    star.style.setProperty("--start-x", `${random(-30, 90).toFixed(1)}vw`);
    star.style.setProperty("--start-y", `${random(-40, 30).toFixed(1)}vh`);
    star.style.setProperty("--length", `${random(80, 190).toFixed(0)}px`);
    star.style.setProperty("--duration", `${random(1.3, 2.8).toFixed(2)}s`);
    star.style.setProperty("--delay", `${random(firstFlight ? 0 : 1.5, firstFlight ? 8 : 5).toFixed(2)}s`);
    star.style.setProperty("--travel", `${travel.toFixed(0)}px`);

    /* 같은 요소의 애니메이션을 새로운 값으로 다시 시작 */
    star.style.animation = "none";
    void star.offsetWidth;
    star.style.animation = "";
}

function createShootingStars() {
    if (!nightSky) return;

    nightSky.querySelectorAll(".shooting-star").forEach((star) => star.remove());

    if (reduceMotion.matches) return;

    for (let index = 0; index < STAR_COUNT; index += 1) {
        const star = document.createElement("span");
        star.className = "shooting-star";
        setRandomFlight(star, true);
        star.addEventListener("animationend", () => setRandomFlight(star));
        nightSky.appendChild(star);
    }
}

createShootingStars();

/* 구형 브라우저에서도 모션 설정 변경을 감지할 수 있도록 처리 */
if (typeof reduceMotion.addEventListener === "function") {
    reduceMotion.addEventListener("change", createShootingStars);
} else {
    reduceMotion.addListener(createShootingStars);
}
