"use strict";const games={allgames:[],othergames:[]},bigTiles=[];$("#area-live-casino .tiles .tile").each((function(){const e=$(this);let t=e.attr("id");void 0===t&&(t=`tile-${Math.random().toString(16).slice(2)}`,e.attr(t)),games.allgames.push(t),e.hasClass("big")&&bigTiles.push(t);const a=e.find("[data-table-type]");a.length>0?a.each((function(){const e=$(this).data("table-type");Object.prototype.hasOwnProperty.call(games,e)?games[e].push(t):games[e]=[t]})):games.othergames.push(t)})),$(".filter .filter-item").each((function(){const e=$(this),t=e.text(),a=e.data("filter-type");Object.prototype.hasOwnProperty.call(games,a)&&games[a].length>0?(e.text(`${t} (${games[a].length})`),e.addClass("loaded"),"allgames"===a&&e.addClass("active")):e.remove()})),$(".filter .filter-item").on("click",(function(){const e=$(this),t=e.data("filter-type");e.addClass("active"),e.siblings(".active").removeClass("active");const a=$("#area-live-casino .items-title");a.length>0&&a.text(translationsLiveCasino.itemsTitles[t]),Object.prototype.hasOwnProperty.call(games,t)&&games.allgames.forEach((function(e){const a=$(`#${e}`);games[t].includes(e)?("allgames"!==t?a.removeClass("big"):bigTiles.includes(e)&&a.addClass("big"),a.show()):a.hide()}))}));