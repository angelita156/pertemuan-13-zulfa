const apiUrl = "https://pertemuan-13-zulfa.vercel.app/articles";

function goToAddPage() {
  window.location.href = "artikel.html";
}

async function loadArticlesHome() {
  const response = await fetch(apiUrl);
  const articles = await response.json();

  const list = document.getElementById("article-list");

  if (!list) return;

  list.innerHTML = "";

  articles.forEach((article) => {
    list.innerHTML += `
    <div class="article-card">

      <h2 class="judul-artikel">${article.title}</h2>

      <div class="article-body">

        ${
          article.image
            ? `<img src="${article.image}" class="article-image">`
            : ""
        }

        <div class="article-desc">

          <p class="tanggal">
            <strong>Tanggal :</strong>
            ${new Date(article.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <hr>

          <p class="isi-artikel">
            ${article.content}
          </p>

        </div>

      </div>

    </div>
  `;
  });
}

window.onload = function () {
  loadArticlesHome();
};
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      document.getElementById("status").innerHTML =
        `Latitude: ${lat}<br>Longitude: ${lng}`;

      const map = L.map("map").setView([lat, lng], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
      }).addTo(map);

      L.marker([lat, lng]).addTo(map).bindPopup("Lokasi Anda").openPopup();
    },
    function (error) {
      document.getElementById("status").innerHTML =
        "Lokasi tidak dapat diakses.";
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
} else {
  document.getElementById("status").innerHTML =
    "Browser tidak mendukung Geolocation.";
}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}
if ("Notification" in window) {
  Notification.requestPermission();
}
Notification.requestPermission().then((permission) => {
  console.log(permission);
});
