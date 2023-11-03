console.log("Let's get this party started!");

const TOKEN = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";

async function getGif(q, api_key) {
    const result = await axios.get("https://api.giphy.com/v1/gifs/search", { params: { q, api_key } });
    const randomIdx = Math.floor(Math.random() * result.data.data.length);

    return result.data.data[randomIdx].images.original.url;
}

async function addGif(term, token, func) {
    const searchTerm = await func(term, token);
    $("#imagesContainer").append(`<img src="${searchTerm}" class="img-thumbnail">`);
}

$("form").on("click", ".btn-primary", function (e) {
    e.preventDefault();

    if (!this.previousElementSibling.value) return;

    addGif(this.previousElementSibling.value, TOKEN, getGif);
    this.previousElementSibling.value = "";
});

$("form").on("click", "#btn-danger", function (e) {
    e.preventDefault();
    $("#imagesContainer").html("");
});