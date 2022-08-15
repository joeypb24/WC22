"use strict";const clockPlaceholder=document.getElementById("info-line-clock"),timezoneString=getGMTOffset();function padZero(e){return(e<10?"0":"")+e}function getGMTOffset(){const e=(new Date).getTimezoneOffset()/60;return"(GMT"+(e<0?"+":"-")+Math.abs(e)+")"}function HandleClockUpdate(){const e=new Date,t=padZero(e.getDate())+"/"+padZero(e.getMonth()+1)+"/"+e.getFullYear()+" "+e.getHours()+":"+padZero(e.getMinutes())+" "+timezoneString;clockPlaceholder.innerHTML=t}HandleClockUpdate(),setInterval(HandleClockUpdate,1e3);const newsSliderPlaceholder=document.getElementById("info-line-news-slider"),newsForm=document.getElementById("info-line-form");function replicateArray(e){return[...new Array(Math.round(20/e.length))].map((()=>e)).flat(1)}function UpdateNewsContent(e){newsSliderPlaceholder.innerHTML="";for(var t=0;t<e.length;t++){var n=document.createElement("span");n.innerHTML=e[t],n.classList.add("news-item"),n.classList.add("pointer"),n.addEventListener("click",(e=>alert(e.currentTarget.innerText))),newsSliderPlaceholder.appendChild(n)}const r=newsSliderPlaceholder.offsetWidth/70;newsSliderPlaceholder.style.animation="marquee "+r+"s linear infinite"}function HandleNewsUpdate(){const e=new XMLHttpRequest;e.addEventListener("loadend",(e=>{let t=JSON.parse(e.currentTarget.response);t.NewsItems.length>0&&(t.NewsItems.length<20?(t=replicateArray(t.NewsItems),UpdateNewsContent(t)):UpdateNewsContent(t.NewsItems))})),e.open("GET",newsForm.getAttribute("action"),!0),e.send()}HandleNewsUpdate(),setInterval(HandleNewsUpdate,3e5),"menu-item-raf"===selectedSecondaryMenuItem&&(document.getElementById("raf-secondary-menu-text").classList.add("color-secondary-3"),document.getElementById("raf-secondary-menu-mask").classList.add("background-color-secondary-3"));let currentScrollPosition=0;window.onscroll=()=>{const e=document.body.getBoundingClientRect().top,t=document.querySelector(".secondary-menu");e>=-40||e>currentScrollPosition?t.classList.remove("hidden"):t.classList.add("hidden"),currentScrollPosition=e};