const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup navigasi" : "Buka navigasi");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) {
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-label", "Buka navigasi");
    }
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Tambahkan file CV PDF milik Anda ke folder ini, lalu ubah href tombol CV
// di index.html menjadi href="Steven-CV.pdf" dan hapus id="cvLink".
document.getElementById("cvLink")?.addEventListener("click", (event) => {
  event.preventDefault();
  alert("Tambahkan file CV PDF Anda ke folder website, lalu hubungkan tombol Unduh CV ke file tersebut.");
});
