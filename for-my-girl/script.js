const entrance = document.getElementById("entrance");
const loading = document.getElementById("loading");
const mainContent = document.getElementById("mainContent");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const envelope = document.getElementById("envelope");
const letterContent = document.getElementById("letterContent");

// TOMBOL NO KABUR
function escapeButton() {
  const padding = 15;

  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  noBtn.style.position = "fixed";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

noBtn.addEventListener("pointerenter", escapeButton);
noBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  escapeButton();
});

// PESAN JIKA TOMBOL NO DIKLIK
noBtn.addEventListener("click", () => {
  alert("Eitsss! Kok mau kabur sih? 😭💗");
});

// TOMBOL YES

yesBtn.addEventListener("click", () => {
  console.log("YES diklik!");

  // Putar musik langsung saat klik
  bgMusic.volume = 0.7;

  const musicPromise = bgMusic.play();

  if (musicPromise !== undefined) {
    musicPromise
      .then(() => {
        console.log("Musik berhasil diputar!");
        musicBtn.textContent = "⏸ Pause Music";
      })
      .catch((error) => {
        console.error("Musik gagal diputar:", error);
        alert("Musiknya belum berhasil diputar: " + error.message);
      });
  }

  // Pindah halaman
  entrance.classList.add("hidden");
  loading.classList.remove("hidden");

  setTimeout(() => {
    loading.classList.add("hidden");
    mainContent.classList.remove("hidden");
    musicBtn.classList.remove("hidden");
    window.scrollTo(0, 0);
  }, 2500);
});

// MUSIK
musicBtn.addEventListener("click", async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      musicBtn.textContent = "⏸ Pause Music";
    } catch (error) {
      alert("Musik belum bisa diputar. Coba lagi ya!");
    }
  } else {
    bgMusic.pause();
    musicBtn.textContent = "🎵 Play Music";
  }
});

// BUKA SURAT
envelope.addEventListener("click", () => {
  letterContent.classList.toggle("hidden");

  if (!letterContent.classList.contains("hidden")) {
    envelope.querySelector("p").textContent =
      "Your letter is waiting for you ♡";
  }
});
