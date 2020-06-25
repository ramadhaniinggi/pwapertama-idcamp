// mendaftarkan service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function () {
        console.log("pendaftaran serviceworker berhasil");
      })
      .catch(function () {
        console.log("pendaftaran serviceworker gagal");
      });
  });
} else {
  console.log("serviceworker belum didukung browser ini");
}
