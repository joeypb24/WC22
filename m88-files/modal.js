"use strict";const hiddenModals=[];require(["jquery"],(function(o){function t(t,e=!0){o("html").css("overflow","auto"),t.removeClass("active"),t.addClass("fading-out");const n=t.find("form");n.length>0&&(n.validate().resetForm(),disableButton(n.find(o(":submit"))),n.find(o(".error")).removeClass("error"),n.find(o(".valid")).removeClass("valid"));const a=t.find('input[data-clear="true"]');a.length>0&&a.val(""),e&&window.location.href.includes("register")&&(window.location.href="/")}function e(){hiddenModals.forEach((function(e){t(o(`#${e}`))})),hiddenModals.length=0}window.closeModal=t,window.hideModal=function(o){hiddenModals.push(o.attr("id")),o.removeClass("active")},window.showModal=function(t){if(hiddenModals.includes(t)){o(`#${t}`).addClass("active");const e=hiddenModals.indexOf(t);e>-1&&hiddenModals.splice(e,1)}},o("body").on("click",".modal-close",(function(){const n=o(this).closest(".modal-overlay");n.length&&(t(n),e())})),o("body").on("click",".cancel-button",(function(){t(o(this).closest(".modal-overlay")),e()})),o("body").on("click",".modal-overlay",(function(n){const a=o(n.target);if(!a.hasClass("modal-register")&&!a.hasClass("modal-overlay-no-autoclose")&&a.hasClass("modal-overlay")){const n=o(this).closest(".modal-overlay");if(n.is("#modal-bonus-journey"))return;t(n),e()}})),document.addEventListener("animationend",(function(o){"fade-out"===o.animationName&&o.target.classList.remove("fading-out")})),o("body").on("click",".modal-content .pw-toggle",(function(){const t=o(this).closest(".input"),e=t.find("input"),n=t.find(".pw-toggle");"password"===e.attr("type")?(e.attr("type","text"),n.addClass("toggled")):(e.attr("type","password"),n.removeClass("toggled"))}))}));