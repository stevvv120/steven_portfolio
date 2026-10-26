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


/* =========================================
   PROJECT GALLERY
========================================= */

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const imageList = (gallery.dataset.images || "")
    .split("|")
    .map((src) => src.trim())
    .filter(Boolean)
    .map((src) => encodeURI(decodeURI(src)));

  const title = gallery.dataset.title || "Project";

  const stageImage = gallery.querySelector(".gallery-stage img");
  const counter = gallery.querySelector(".gallery-counter");
  const caption = gallery.querySelector(".gallery-caption");
  const thumbnailsContainer = gallery.querySelector(".gallery-thumbnails");
  const previousButton = gallery.querySelector(".gallery-prev");
  const nextButton = gallery.querySelector(".gallery-next");
  const expandButton = gallery.querySelector(".gallery-expand");

  if (
    !imageList.length ||
    !stageImage ||
    !counter ||
    !caption ||
    !thumbnailsContainer
  ) {
    return;
  }

  let currentIndex = 0;

 
function getImageLabel(src, index) {
  const filename = decodeURIComponent(
    src.split("/").pop().replace(/\.[^/.]+$/, "")
  );

  const labels = {
    home: "Halaman Utama",
    homepage: "Halaman Utama",
    dashboard: "Dashboard",
    "admin-dashboard": "Admin Dashboard",
    "product-detail": "Detail Produk",
    products: "Daftar Produk",
    "data-management": "Pengelolaan Data",
    cashier: "Kasir",
    reports: "Laporan",
    report: "Laporan",
    login: "Login",
    cart: "Keranjang Belanja",
    upload: "Upload Gambar",
    result: "Hasil Klasifikasi",
    overview: "Overview Penelitian",
    preprocessing: "Data Preprocessing",
    training: "Model Training",
    evaluation: "Model Evaluation",
    events: "Kegiatan",
    profile: "Profil",

    "Screenshot (22)": "Halaman Utama",
    "Screenshot (23)": "Halaman Utama",
    "Screenshot (24)": "Halaman Produk",
    "Screenshot (31)": "Menu Ringkasan",
    "Screenshot (32)": "Menu Produk",
    "Screenshot (33)": "Menu Kategori",
    "Screenshot (34)": "Menu Pesanan",
    "Screenshot (35)": "Menu Pesanan",
    "Screenshot (36)": "Menu Pelanggan",
    "Screenshot (39)": "Alamat Pengiriman",
    "Screenshot (40)": "Tampilan Pesanan",
    "Screenshot (41)": "Pengiriman Pelanggan",
    "Screenshot (42)": "Invoice Pesanan",
    "Screenshot (43)": "Menu Ulasan",
    "Screenshot (44)": "Menu Log Aktivitas",

    "Screenshot (8)": "Dashboard",
    "Screenshot (10)": "Kasir",
    "Screenshot (11)": "Kasir",
    "Screenshot (12)": "Riwayat Penjualan",
    "Screenshot (13)": "Daftar Produk",
    "Screenshot (14)": "Kategori Produk",
    "Screenshot (15)": "Manajemen Stok",
    "Screenshot (16)": "Operasional Gudang & Stok",
    "Screenshot (17)": "Operasional Pesanan & Pengiriman",
    "Screenshot (18)": "Operasional Procurement",
    "Screenshot (19)": "Operasionnal Audit Log",
    "Screenshot (20)": "Statistik Laporan Penjualan",
    "Screenshot (21)": "Produk Terlaris",

    "ukrida1": "Halaman Login",
    "ukrida2": "Halaman Login Role Dosen",
    "ukrida3": "Halaman Login Role Mahasiswa",
    "ukrida4": "Halaman Register",
    "ukrida5": "Halaman Register Role Dosen",
    "ukrida6": "Halaman Register Role Mahasiswa",
    "ukrida7": "Halaman Form Dokumentasi Kegiatan (1)",
    "ukrida8": "Halaman From Dokumentasi Kegiatan (2)",
    "ukrida9": "Halaman Form Dokumentasi Kegiatan (3)",
    "ukrida10": "Halaman Form Dokumentasi Kegiatan (4)",
    "ukrida11": "Halaman Form Evaluasi Kegiatan (1)",
    "ukrida12": "Halaman Form Evaluasi Kegiatan (2)",
    "ukrida13": "Halaman Form Evaluasi Kegiatan (3)",
    "ukrida14": "Halaman Rekapitulasi Kegiatan (1)",
    "ukrida15": "Halaman Rekapitulasi Kegiatan (2)",
    "ukrida16": "Halaman Rekapitulasi Kegiatan (3)",
    "ukrida17": "Halaman Rekapitulasi Kegiatan (4)",

    "xray1": "Dashboard Halaman Utama Website Klasifikasi Gambar X-Ray",
    "xray2": "Halaman Analisis Gambar X-Ray", 
    "xray3": "Halaman Edukasi Kesehatan Paru",
    "xray4": "Halaman Distribusi Kelas Dataset",
    "xray5": "Halaman Galeri Hasil Prediksi",
    "xray6": "Halaman About Website Klasifikasi Gambar X-Ray",
  };

  // Cocokkan nama file tanpa membedakan huruf besar dan kecil.
  const normalizedFilename = filename.toLowerCase();

  const normalizedLabels = Object.fromEntries(
    Object.entries(labels).map(([key, value]) => [
      key.toLowerCase(),
      value
    ])
  );

  if (normalizedLabels[normalizedFilename]) {
    return normalizedLabels[normalizedFilename];
  }

  // Caption otomatis jika nama file tidak ada dalam daftar.
  return (
    filename
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase()) ||
    `Gambar ${index + 1}`
  );
}


  const imageLabels = imageList.map(getImageLabel);

  // Buat thumbnail dari daftar gambar.
  imageList.forEach((src, index) => {
    const thumbnail = document.createElement("button");

    thumbnail.type = "button";
    thumbnail.className = "gallery-thumb";
    thumbnail.setAttribute(
      "aria-label",
      `Tampilkan ${imageLabels[index]}`
    );

    const thumbnailImage = document.createElement("img");
    thumbnailImage.src = src;
    thumbnailImage.alt = "";
    thumbnailImage.loading = "lazy";

    thumbnail.appendChild(thumbnailImage);
    thumbnailsContainer.appendChild(thumbnail);

    thumbnail.addEventListener("click", () => {
      showImage(index);
    });
  });

  const thumbnails = Array.from(
    thumbnailsContainer.querySelectorAll(".gallery-thumb")
  );

  // Buat lightbox untuk setiap gallery.
  const lightbox = document.createElement("dialog");
  lightbox.className = "project-lightbox";
  lightbox.setAttribute("aria-label", `Pratinjau ${title}`);

  lightbox.innerHTML = `
    <button class="lightbox-close" type="button"
      aria-label="Tutup pratinjau">×</button>

    <button class="lightbox-prev" type="button"
      aria-label="Gambar sebelumnya">←</button>

    <figure>
      <img src="" alt="">
      <figcaption></figcaption>
    </figure>

    <button class="lightbox-next" type="button"
      aria-label="Gambar berikutnya">→</button>

    <span class="lightbox-counter"></span>
  `;

  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector("figure img");
  const lightboxCaption = lightbox.querySelector("figcaption");
  const lightboxCounter = lightbox.querySelector(".lightbox-counter");

  const lightboxClose = lightbox.querySelector(".lightbox-close");
  const lightboxPrevious = lightbox.querySelector(".lightbox-prev");
  const lightboxNext = lightbox.querySelector(".lightbox-next");

  // Perbarui gambar utama dan thumbnail aktif.
  function showImage(index) {
    currentIndex = (index + imageList.length) % imageList.length;

    const src = imageList[currentIndex];
    const label = imageLabels[currentIndex];

    stageImage.src = src;
    stageImage.alt = `${title} - ${label}`;

    counter.textContent =
      `${String(currentIndex + 1).padStart(2, "0")} / ` +
      `${String(imageList.length).padStart(2, "0")}`;

    caption.textContent = label;

    thumbnails.forEach((thumbnail, thumbnailIndex) => {
      const active = thumbnailIndex === currentIndex;

      thumbnail.classList.toggle("is-active", active);

      if (active) {
        thumbnail.setAttribute("aria-current", "true");
      } else {
        thumbnail.removeAttribute("aria-current");
      }
    });

    if (lightbox.open) {
      lightboxImage.src = src;
      lightboxImage.alt = `${title} - ${label}`;
      lightboxCaption.textContent = `${title} — ${label}`;

      lightboxCounter.textContent =
        `${currentIndex + 1} / ${imageList.length}`;

      lightboxPrevious.disabled = imageList.length < 2;
      lightboxNext.disabled = imageList.length < 2;
    }
  }

  function openLightbox() {
    showImage(currentIndex);

    if (typeof lightbox.showModal === "function") {
      lightbox.showModal();
    }
  }

  function closeLightbox() {
    if (lightbox.open) {
      lightbox.close();
    }
  }

  // Navigasi gallery utama.
  if (previousButton) {
    previousButton.addEventListener("click", () => {
      showImage(currentIndex - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showImage(currentIndex + 1);
    });
  }

  // Buka lightbox dengan tombol atau klik gambar.
  if (expandButton) {
    expandButton.addEventListener("click", openLightbox);
  }

  stageImage.addEventListener("click", openLightbox);

  // Navigasi di dalam lightbox.
  lightboxPrevious.addEventListener("click", () => {
    showImage(currentIndex - 1);
  });

  lightboxNext.addEventListener("click", () => {
    showImage(currentIndex + 1);
  });

  lightboxClose.addEventListener("click", closeLightbox);

  // Tutup ketika pengguna mengklik area luar dialog.
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Navigasi keyboard hanya ketika lightbox sedang terbuka.
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showImage(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showImage(currentIndex + 1);
    }
  });

  // Inisialisasi gambar pertama.
  showImage(0);
});