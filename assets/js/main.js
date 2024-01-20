let menubtn = document.querySelector(".menu")

let menulist = document.querySelector(".list")
let closebtn = document.querySelector(".close")
menubtn.addEventListener("click", () => {
    menulist.classList.add("active")
})
closebtn.addEventListener("click", () => {
    menulist.classList.remove("active")
})
let cards = document.querySelector(".cards")
let allData = []
function allCards(data) {
    fetch(" http://localhost:3000/favorite")
        .then(res => res.json())
        .then(favs => {
            data.forEach(element => {
                let isfavorite = favs.find(item => item.id === element.id);
                let heartIcon = isfavorite ? "bi bi-heart-fill" : "bi bi-heart"
                cards.innerHTML += `   <div class="card">
        <div class="img"><img src="${element.img}" alt=""></div>
        <div class="info">
        <p><i class="${heartIcon}" onclick="addfavorite(${element.id})"></i></p>
            <p class="name">${element.name}</p>
           
            <p class="info1"> ${element.info}</p>
            <div class="button">
            <a href="deteies.html?id=${element.id}"> <button>View</button></a>
                <button onclick="addBasket(${element.id})">add to card</button>
            </div>
        </div>
    </div>`
            });
        })
}
function getAll() {
    fetch("http://localhost:3000/all")
        .then(res => res.json())
        .then(data => {
            allData = allData.concat(data)
            allCards(data)
        })
}
getAll()
function addBasket(id) {
    axios.get(`http://localhost:3000/all/${id}`)
        .then(res => {
            console.log(res.data);
            axios.post("http://localhost:3000/basket", res.data)
        })
}
function addfavorite(id) {
    axios.get(`http://localhost:3000/all/${id}`)
        .then(res => {
            axios.get("http://localhost:3000/favorite")
                .then(favs => {
                    let id1 = favs.data.find(item => item.id === res.data.id)
                    if (!id1) {
                        axios.post("http://localhost:3000/favorite", res.data)
                    } else {
                        axios.delete(`http://localhost:3000/favorite/${id1.id}`);
                    }
                    allCards(allData)
                })
        })
}
