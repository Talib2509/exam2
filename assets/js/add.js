let menubtn = document.querySelector(".menu")

let menulist = document.querySelector(".list")
let closebtn = document.querySelector(".close")
menubtn.addEventListener("click", () => {
    menulist.classList.add("active")
})
closebtn.addEventListener("click", () => {
    menulist.classList.remove("active")
})
let table=document.querySelector("table")
console.log(table);
function getAll(){
    fetch("http://localhost:3000/all")
    .then(res=>res.json())
    .then(data=>{
       data.forEach(element => {
        table.innerHTML+=`
        <tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td><button onclick=""delete(${element.id})> Delete</button></td>
        </tr>`
       });
    })
}
getAll()