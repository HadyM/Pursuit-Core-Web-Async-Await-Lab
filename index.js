document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();

  async function deckLoader() {
    const cardsShuffle = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    let cardsId = cardsShuffle.data.deck_id;

    const button = document.querySelector("button");
    button.addEventListener("click", loadCards);

    async function loadCards() {
      const div = document.querySelector("div");
      div.innerHTML = "";

      const numOfCards = document.querySelector("select").value;
      const result = await axios.get(
        `https://deckofcardsapi.com/api/deck/${cardsId}/draw/?count=${numOfCards}`
      );

      for (const card of result.data.cards) {
        const img = document.createElement("img");
        img.className = "card";
        img.src = card.image;
        div.appendChild(img);
      }
      const cardsLeft = document.querySelector("#card-left");
      cardsLeft.textContent = result.data.remaining;
    }
  }
  deckLoader();
});
