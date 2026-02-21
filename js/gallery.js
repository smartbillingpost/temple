fetch("gallery.txt")
  .then(response => response.text())
  .then(data => {
    const images = data.split("\n").filter(img => img.trim() !== "");
    const gallery = document.getElementById("gallery");

    images.forEach(img => {
      const div = document.createElement("div");
      div.className = "overflow-hidden rounded-xl shadow hover:shadow-lg";

      div.innerHTML = `
        <img src="images/${img.trim()}" 
class="w-full h-64 object-contain hover:scale-105 transition duration-300 bg-white";

      gallery.appendChild(div);
    });
  });