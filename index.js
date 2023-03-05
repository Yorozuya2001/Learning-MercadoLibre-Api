const URL = "https://api.mercadolibre.com/sites/MLA/search?q=";
const $input = document.getElementById("input");
const $query = document.getElementById("search");
const $results = document.getElementById("results");

const $template = document.getElementById("template").content;
const $fragment = document.createDocumentFragment();

const $image = $template.querySelector(".product-image");
const $title = $template.querySelector(".product-title");
const $seller = $template.querySelector(".seller");
const $price = $template.querySelector(".price");
const $button = $template.querySelector(".button");

$query.addEventListener("click", () => getData());

const getData = () => {
  const query = $input.value;

  fetch(`${URL}${query}`)
    .then((res) => res.json())
    .then((json) => {
      $results.innerHTML = "";
      if (!json.results.length) {
        renderNoResult();
      } else {
        json.results.forEach((result) => {
          render(result);
        });
        $results.appendChild($fragment);
      }
    })
    .catch((err) => console.log(err));
};

const render = ({
  title,
  seller,
  price,
  thumbnail,
  installments,
  permalink,
}) => {
  $input.value = "";
  $image.src = thumbnail;
  $image.alt = title;

  $title.textContent = title;
  $seller.textContent = seller.nickname;
  $price.textContent = `$ ${price} ${installments.currency_id}`;
  $button.href = permalink;

  let $clone = document.importNode($template, true);
  $fragment.appendChild($clone);
};

const renderNoResult = () => {
  const $noResult = document.createElement("div");
  $noResult.className = "noResult";
  $noResult.innerHTML = `
  <h2>No hay publicaciones que coincidan con tu búsqueda.</h2>
  <ul>
  <li>Revisá la ortografía de la palabra</li>
  <li>Utilizá palabras más genéricas o menos palabras.</li>
  </ul>`;
  $results.appendChild($noResult);
};
