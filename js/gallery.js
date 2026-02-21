fetch("gallery.txt")
  .then(response => response.text())
  .then(data => {
    const images = data.split("\n").filter(img => img.trim() !== "");
    const gallery = document.getElementById("gallery");

    images.forEach(img => {
      const div = document.createElement("div");
      div.className = "rounded-xl shadow hover:shadow-lg bg-white p-3";

      div.innerHTML = `
        <img src="images/${img.trim()}" 
        class="w-full object-contain hover:scale-105 transition duration-300">
      `;

      gallery.appendChild(div);
    });
  });