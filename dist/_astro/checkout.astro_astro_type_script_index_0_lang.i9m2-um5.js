import{r as m,b as c,u as g}from"./cart.BrqaTR9r.js";const n=[{id:"1",slug:"premium-dog-bed",name:"Premium Dog Bed",description:"Orthopedic comfort for calm naps and restful evenings.",category:"beds",price:89,oldPrice:119,badge:"Best Seller",image:"https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",rating:4.9,reviews:124,isNew:!0,stock:12},{id:"2",slug:"salmon-bites",name:"Salmon Bites",description:"Protein-rich treats for dogs that love active play.",category:"food",price:18,image:"https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?auto=format&fit=crop&w=900&q=80",rating:4.7,reviews:84,stock:30},{id:"3",slug:"cat-tree-climber",name:"Cat Tree Climber",description:"A playful vertical playground for curious cats.",category:"cats",price:129,oldPrice:159,badge:"New",image:"https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80",rating:4.8,reviews:67,stock:8},{id:"4",slug:"bird-safe-perch",name:"Bird Safe Perch",description:"Comfortable perch with gentle grip and elegant finish.",category:"birds",price:27,image:"https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&w=900&q=80",rating:4.6,reviews:33,stock:20},{id:"5",slug:"aquarium-filter-kit",name:"Aquarium Filter Kit",description:"Quiet, efficient filtration for freshwater tanks.",category:"fish",price:54,oldPrice:69,badge:"Popular",image:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",rating:4.9,reviews:49,stock:15},{id:"6",slug:"rabbit-hut",name:"Cozy Rabbit Hut",description:"A snug hideaway for small pets and indoor play.",category:"small-animals",price:45,image:"https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=80",rating:4.5,reviews:21,stock:18},{id:"7",slug:"travel-leash-set",name:"Travel Leash Set",description:"Everyday essentials for safe walks and quick outings.",category:"accessories",price:32,image:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",rating:4.8,reviews:58,stock:24},{id:"8",slug:"gentle-grooming-kit",name:"Gentle Grooming Kit",description:"Soft tools designed for smooth grooming sessions.",category:"grooming",price:39,oldPrice:49,badge:"Eco",image:"https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80",rating:4.7,reviews:42,stock:16}];n.filter(e=>e.isNew);const d=()=>{const e=document.getElementById("cart-summary");if(!e)return;const r=()=>{const i=c(n),o=i.reduce((t,a)=>t+a.price*a.quantity,0);if(i.length===0){e.innerHTML='<p class="text-slate-500">Your cart is empty.</p>';return}e.innerHTML=`
        <div class="space-y-4">
          ${i.map(t=>`
            <div class="rounded-2xl border border-slate-200 p-3">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="font-medium text-slate-900">${t.name}</p>
                  <p class="mt-1 text-sm text-slate-500">$${t.price.toFixed(2)} each</p>
                </div>
                <button data-remove-item data-slug="${t.slug}" class="text-sm font-medium text-rose-600 transition duration-200 hover:-translate-y-0.5 hover:text-rose-700 active:scale-95">Remove</button>
              </div>
              <div class="mt-3 flex items-center justify-between">
                <div class="flex items-center rounded-full border border-slate-200">
                  <button data-adjust-quantity data-slug="${t.slug}" data-change="-1" class="px-3 py-1 text-lg text-slate-600 transition duration-200 hover:-translate-y-0.5 hover:text-slate-900 active:scale-95">−</button>
                  <span class="min-w-8 text-center text-sm font-semibold text-slate-900">${t.quantity}</span>
                  <button data-adjust-quantity data-slug="${t.slug}" data-change="1" class="px-3 py-1 text-lg text-slate-600 transition duration-200 hover:-translate-y-0.5 hover:text-slate-900 active:scale-95">+</button>
                </div>
                <p class="font-semibold text-slate-900">$${(t.price*t.quantity).toFixed(2)}</p>
              </div>
            </div>
          `).join("")}
          <div class="flex justify-between"><span>Shipping</span><span>Free</span></div>
          <div class="flex justify-between border-t border-slate-200 pt-4 text-base font-semibold text-slate-900"><span>Total</span><span>$${o.toFixed(2)}</span></div>
        </div>
      `};e.addEventListener("click",i=>{const o=i.target,t=o.closest("[data-remove-item]"),a=o.closest("[data-adjust-quantity]");if(t){const s=t.getAttribute("data-slug");s&&m(s),r();return}if(a){const s=a.getAttribute("data-slug"),l=Number(a.getAttribute("data-change")||"0");if(!s)return;const u=(c(n).find(p=>p.slug===s)?.quantity||0)+l;g(s,u),r()}}),window.addEventListener("cart:updated",r),r()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",d,{once:!0}):d();
