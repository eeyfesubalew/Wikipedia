"use strict";
const box = document.querySelector(".box");
const input = document.querySelector(".input");
const boxContainer = document.querySelector(".box-container");
let results = [];
let query = "";
const getData = async function () {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&origin=*&pilicense=any&prop=pageimages&pithumbsize=250&format=json&gsrlimit=100&generator=search&gsrsearch="${query}"`
    );
    const data = await res.json();
    Object.entries(data.query.pages).forEach(function (el) {
      el[1].thumbnail ? results.push(el[1]) : "";
    });
    results.forEach(function (el) {
      const markup = `
      
      <div class="img-cont">
      <img src="${el.thumbnail.source}" alt="img" class="image" />
        </div>
        <div class="txt-container">
      <p class="txt">${el.title}</p>
    </div>
        `;

      boxContainer.insertAdjacentHTML("afterbegin", markup);
    });
  } catch (error) {
    console.log(`${error.message}`);
  }
};

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    query = input.value;
    getData(query);
    input.value = "";
  }
});
