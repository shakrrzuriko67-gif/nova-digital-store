// Edit these sample listings. Add a hosted checkout URL only for products you are authorized to sell.
const products = [
 {name:"Digital Product One",mark:"N",description:"Add a short, accurate description of what the customer receives.",features:["Digital product","Clear usage instructions","Customer support"],price:"$4.00",checkoutUrl:""},
 {name:"Digital Product Two",mark:"F",description:"Explain exactly what files, features, and formats are included.",features:["Digital product","Simple setup","Customer support"],price:"$4.00",checkoutUrl:""}
];
const root=document.getElementById("products");
for(const p of products){
 const card=document.createElement("article");card.className="product";
 const art=document.createElement("div");art.className="art";art.textContent=p.mark;
 const info=document.createElement("div");const h=document.createElement("h3");h.textContent=p.name;
 const desc=document.createElement("p");desc.textContent=p.description;const ul=document.createElement("ul");
 p.features.forEach(f=>{const li=document.createElement("li");li.textContent=f;ul.appendChild(li)});
 info.append(h,desc,ul);
 const bottom=document.createElement("div");bottom.className="bottom";
 const price=document.createElement("span");price.className="price";price.textContent=p.price;
 const btn=document.createElement("button");btn.className="buy";btn.textContent=p.checkoutUrl?"Buy now":"Checkout not set up";btn.disabled=!p.checkoutUrl;
 btn.addEventListener("click",()=>{if(p.checkoutUrl)location.href=p.checkoutUrl});
 bottom.append(price,btn);card.append(art,info,bottom);root.appendChild(card);
}
document.getElementById("year").textContent=new Date().getFullYear();
