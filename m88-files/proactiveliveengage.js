"use strict";require(["jquery"],(function(e){e((function(){e(".prochat-live-engage-floating").on("DOMNodeInserted",(function(){const t=e(this),o=sessionStorage.getItem("closedProchat");if(null!==o){const e=window.location.href;if(JSON.parse(o).includes(e))return}t.addClass("loaded"),e(".live-engage-floating").addClass("hidden")})),e(".prochat-live-engage-floating").on("DOMNodeRemoved",(function(){e(this).removeClass("loaded")})),e(".prochat-live-engage-floating").on("click",".close",(function(t){const o=e(this).closest(".prochat-live-engage-floating");t.preventDefault(),t.stopPropagation();const n=window.location.href,s=sessionStorage.getItem("closedProchat");if(null===s){const e=[n];sessionStorage.setItem("closedProchat",JSON.stringify(e))}else{const e=JSON.parse(s);e.includes(n)||(e.push(n),sessionStorage.setItem("closedProchat",JSON.stringify(e)))}o.removeClass("loaded"),e(".live-engage-floating").removeClass("hidden")})),e(".prochat-live-engage-floating").on("click",(function(t){t.preventDefault(),t.stopPropagation();const o=e(t.target);if(o.hasClass("live-engage-button-prochat"))return void sendLEAttributes();let n=null;n=o.hasClass("prochat-live-engage-floating")?o:o.closest(".prochat-live-engage-floating"),n.find(".live-engage-button-prochat")[0].click()}))}))}));