!function(e){"use strict";var t=function(t,s){this.$element=e(t),this.options=e.extend({},e.fn.typeahead.defaults,s),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.select=this.options.select||this.select,this.autoSelect="boolean"!=typeof this.options.autoSelect||this.options.autoSelect,this.highlighter=this.options.highlighter||this.highlighter,this.updater=this.options.updater||this.updater,this.source=this.options.source,this.$menu=e(this.options.menu),this.shown=!1,this.listen(),this.showHintOnFocus="boolean"==typeof this.options.showHintOnFocus&&this.options.showHintOnFocus};t.prototype={constructor:t,select:function(){var e=this.$menu.find(".active").data("value");return(this.autoSelect||e)&&this.$element.val(this.updater(e)).change(),this.hide()},updater:function(e){return e},setSource:function(e){this.source=e},show:function(){var t,s=e.extend({},this.$element.position(),{height:this.$element[0].offsetHeight});return t="function"==typeof this.options.scrollHeight?this.options.scrollHeight.call():this.options.scrollHeight,this.$menu.insertAfter(this.$element).css({top:s.top+s.height+t,left:s.left}).show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(t){var s;return this.query=null!=t?t:this.$element.val()||"",this.query.length<this.options.minLength?this.shown?this.hide():this:(s=e.isFunction(this.source)?this.source(this.query,e.proxy(this.process,this)):this.source)?this.process(s):this},process:function(t){var s=this;return t=e.grep(t,(function(e){return s.matcher(e)})),(t=this.sorter(t)).length?"all"==this.options.items||0===this.options.minLength&&!this.$element.val()?this.render(t).show():this.render(t.slice(0,this.options.items)).show():this.shown?this.hide():this},matcher:function(e){return~e.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(e){for(var t,s=[],i=[],o=[];t=e.shift();)t.toLowerCase().indexOf(this.query.toLowerCase())?~t.indexOf(this.query)?i.push(t):o.push(t):s.push(t);return s.concat(i,o)},highlighter:function(e){var t=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return e.replace(new RegExp("("+t+")","ig"),(function(e,t){return"<strong>"+t+"</strong>"}))},render:function(t){var s=this;return t=e(t).map((function(t,i){return(t=e(s.options.item).data("value",i)).find("a").html(s.highlighter(i)),t[0]})),this.autoSelect&&t.first().addClass("active"),this.$menu.html(t),this},next:function(){var t=this.$menu.find(".active").removeClass("active").next();t.length||(t=e(this.$menu.find("li")[0])),t.addClass("active")},prev:function(){var e=this.$menu.find(".active").removeClass("active").prev();e.length||(e=this.$menu.find("li").last()),e.addClass("active")},listen:function(){this.$element.on("focus",e.proxy(this.focus,this)).on("blur",e.proxy(this.blur,this)).on("keypress",e.proxy(this.keypress,this)).on("keyup",e.proxy(this.keyup,this)),this.eventSupported("keydown")&&this.$element.on("keydown",e.proxy(this.keydown,this)),this.$menu.on("click",e.proxy(this.click,this)).on("mouseenter","li",e.proxy(this.mouseenter,this)).on("mouseleave","li",e.proxy(this.mouseleave,this))},destroy:function(){this.$element.data("typeahead",null),this.$element.off("focus").off("blur").off("keypress").off("keyup"),this.eventSupported("keydown")&&this.$element.off("keydown"),this.$menu.remove()},eventSupported:function(e){var t=e in this.$element;return t||(this.$element.setAttribute(e,"return;"),t="function"==typeof this.$element[e]),t},move:function(e){if(this.shown){switch(e.keyCode){case 9:case 13:case 27:e.preventDefault();break;case 38:e.preventDefault(),this.prev();break;case 40:e.preventDefault(),this.next()}e.stopPropagation()}},keydown:function(t){this.suppressKeyPressRepeat=~e.inArray(t.keyCode,[40,38,9,13,27]),this.shown||40!=t.keyCode?this.move(t):this.lookup("")},keypress:function(e){this.suppressKeyPressRepeat||this.move(e)},keyup:function(e){switch(e.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}e.stopPropagation(),e.preventDefault()},focus:function(){this.focused||(this.focused=!0,(0===this.options.minLength&&!this.$element.val()||this.options.showHintOnFocus)&&this.lookup())},blur:function(){this.focused=!1,!this.mousedover&&this.shown&&this.hide()},click:function(e){e.stopPropagation(),e.preventDefault(),this.select(),this.$element.focus()},mouseenter:function(t){this.mousedover=!0,this.$menu.find(".active").removeClass("active"),e(t.currentTarget).addClass("active")},mouseleave:function(){this.mousedover=!1,!this.focused&&this.shown&&this.hide()}};var s=e.fn.typeahead;e.fn.typeahead=function(s){var i=arguments;return this.each((function(){var o=e(this),n=o.data("typeahead"),a="object"==typeof s&&s;n||o.data("typeahead",n=new t(this,a)),"string"==typeof s&&(i.length>1?n[s].apply(n,Array.prototype.slice.call(i,1)):n[s]())}))},e.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1,scrollHeight:0,autoSelect:!0},e.fn.typeahead.Constructor=t,e.fn.typeahead.noConflict=function(){return e.fn.typeahead=s,this},e(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',(function(){var t=e(this);t.data("typeahead")||t.typeahead(t.data())}))}(window.jQuery);var apiRoot="https://api.github.com/";function extractUsernameFromUrl(e){var t=e.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9-_.]+)/);return t&&t.length>1?t[1]:""}function getQueryVariable(e){for(var t=window.location.search.substring(1).split("&"),s=0;s<t.length;s++){var i=t[s].split("=");if(i[0]==e)return i[1]}return""}function getQueryVariable(e){for(var t=window.location.search.substring(1).split("&"),s=0;s<t.length;s++){var i=t[s].split("=");if(i[0]==e)return i[1]}return""}function validateInput(){$("#username").val().length>0&&$("#repository").val().length>0?$("#get-stats-button").prop("disabled",!1):$("#get-stats-button").prop("disabled",!0)}function getUserRepos(){var e=$("#username").val(),t=$("#datalist-options").typeahead(),s=[];if(e.startsWith("https://github.com/")){var i=extractUsernameFromUrl(e);""!==i&&(e=i)}var o=apiRoot+"users/"+e+"/repos";$.getJSON(o,(function(e){$.each(e,(function(e,t){s.push(t.name)}));var i="";s.forEach((function(e){i+='<option value="'+e+'">'})),$("#datalist-options").html(i),t.data("typeahead").source=s}))}function showStats(e){var t=!1,s="";404==e.status&&(t=!0,s="The project does not exist!"),403==e.status&&(t=!0,s="You've exceeded GitHub's rate limiting. Try later"),0==e.length&&(t=!0,s="There are no releases for this project");var i="";if(t)i='<div class="alert alert-primary d-flex" role="alert"> <div class="alert-icon"> <i class="ci-bell"></i> </div> <div>'+s+"</div></div>";else{i+="<div class='container'>";var o=!0,n=0;if(document.title=$("#username").val()+"/"+$("#repository").val()+" - "+document.title,e.sort((function(e,t){return e.created_at<t.created_at?1:-1})),$.each(e,(function(e,t){var s=t.tag_name,a=(t.html_url,t.assets),r=0!=a.length,l=t.author,h=null!=l,c=t.published_at.split("T")[0],u=0;if(o?(i+="<div class='row justify-content-center'><div class='card text-success bg-faded-success border-success'><div class='card-header border-success'> Latest Release: "+s+"</div><div class='card-body'><h5 class='card-title text-success'>",o=!1,color="text-success"):(i+="<div class='card text-danger bg-faded-danger border-danger'><div class='card-header border-danger'> Past Release: "+s+"</div><div class='card-body'><h5 class='card-title text-danger'>",color="text-danger"),r){var d="<h5 class='card-title "+color+"'> Download Info: </h5><p class='card-text fs-sm'>";d+="<ul style='list-style: none;'>",i+="",$.each(a,(function(e,t){var s=(t.size/1048576).toLocaleString(void 0,{maximumFractionDigits:2}),i=t.updated_at.split("T")[0];d+='<li><i class="ci-cloud-download"/>&nbsp&nbsp<a href="'+t.browser_download_url+'">'+t.name+"</a> ("+s+" MiB)<br><i>Last updated on "+i+" &mdash; Downloaded "+t.download_count.toLocaleString(),1==t.download_count?d+=" time</i></li>":d+=" times</i></li>",n+=t.download_count,u+=t.download_count}))}else d="<center><i>This release has no download assets available!</i></center>";i+="Release Info:</h5>",i+='<ul style="list-style: none;">',i+="<li><i class='ci-time'/>&nbsp&nbspPublished on: "+c+"</li>",h&&(i+="<li><i class='ci-user'/>&nbsp&nbspRelease Author: <a href='"+l.html_url+"'>"+l.login+"</a><br></li>"),r&&(i+="<li><i class='ci-download'/>&nbsp&nbspDownloads: "+u.toLocaleString()+"</li>"),i+="</ul>",i+="<p class='card-text fs-sm'>"+d+"</p>",i+="</div></div>"})),n>0){var a='<div class="container"> <div class="card border-0 shadow" style="display: flex !important"> <div class="card-content">';a+="<span><strong><i class='ci-download'/> Total Downloads: </strong></span>",a+="<span>"+(n=n.toLocaleString())+"</span>",i=(a+="</div></div></div>")+i}i+="</div>"}var r=$("#stats-result");r.hide(),r.html(i),$("#loader-gif").hide(),r.slideDown()}function getStats(){var e=$("#username").val(),t=$("#repository").val(),s=apiRoot+"repos/"+e+"/"+t+"/releases";$.getJSON(s,showStats).fail(showStats)}function handleSearch(){var e=document.getElementById("username"),t=document.getElementById("repository"),s=e.value.trim(),i=t.value.trim();""!==s&&addSearchToHistory(s,i),e.value="",t.value=""}function addSearchToHistory(e,t){var s=document.getElementById("search-history"),i="<a href='?username="+e+"&repository="+t+"' class='dropdown-item'>"+e+" and "+t+"</a>",o=document.createElement("div");o.innerHTML=i;var n=o.firstChild;s.appendChild(n);var a=localStorage.getItem("searchHistory");if(a)(r=JSON.parse(a)).push({username:e,repository:t}),localStorage.setItem("searchHistory",JSON.stringify(r));else{var r=[{username:e,repository:t}];localStorage.setItem("searchHistory",JSON.stringify(r))}}function loadSearchHistory(){var e=document.getElementById("search-history");e.innerHTML="";var t=localStorage.getItem("searchHistory");if(t){var s=JSON.parse(t);if(0===s.length)(d=document.createElement("i")).textContent="No history available",d.classList.add("dropdown-item"),e.appendChild(d);else{for(var i=[],o=s.length-1;o>=0;o--){var n=s[o],a=n.username,r=n.repository;if(r){var l=a+"/"+r;if(!i.includes(l)){i.push(l);var h="<a href='?username="+a+"&repository="+r+"' class='dropdown-item'>"+l+"</a>",c=document.createElement("div");c.innerHTML=h;var u=c.firstChild;e.appendChild(u)}}}0===i.length&&((d=document.createElement("i")).textContent="No history available",d.classList.add("dropdown-item"),e.appendChild(d))}}else{var d;(d=document.createElement("i")).textContent="No history available",d.classList.add("dropdown-item"),e.appendChild(d)}}$(document).ready((function(){$("#username").val()||$("#username").focus()})),$("#get-stats-button").click((function(){var e=$("#username").val(),t=extractUsernameFromUrl(e);""===t&&(t=e),$("#username").val(t),window.location="?username="+t+"&repository="+$("#repository").val(),addSearchToHistory(t)})),$((function(){$("#loader-gif").hide(),validateInput(),$("#username, #repository").keyup(validateInput),$("#username").change(getUserRepos),$("#get-stats-button").click((function(){window.location="?username="+$("#username").val()+"&repository="+$("#repository").val()})),$("#repository").on("keypress",(function(e){13==e.which&&(window.location="?username="+$("#username").val()+"&repository="+$("#repository").val())}));var e=getQueryVariable("username"),t=extractUsernameFromUrl(e),s=getQueryVariable("repository");""===t&&(t=e),""!=t&&""!=s&&($("#username").val(t),$("#repository").val(s),validateInput(),getUserRepos(),$(".output").hide(),$("#description").hide(),$(window).on("load",(function(){$("#loader-gif").hide(),$("#unloader-gif").show()})),$(window).on("beforeunload",(function(){$("#unloader-gif").hide(),$("#loader-gif").show()})),getStats())}));var searchButton=document.getElementById("get-stats-button");function deleteData(){for(var e=document.cookie.split(";"),t=0;t<e.length;t++){var s=e[t],i=s.indexOf("="),o=i>-1?s.substr(0,i):s;document.cookie=o+"=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;"}localStorage.clear(),sessionStorage.clear(),location.reload()}searchButton.addEventListener("click",handleSearch),loadSearchHistory();const usernameInput=document.getElementById("username"),suggestionsList=document.getElementById("suggestions-list");function handleInput(){const e=usernameInput.value.toLowerCase(),t=fetchUsernames(e);suggestionsList.innerHTML="",t.forEach((e=>{const t=document.createElement("li");t.classList.add("list-items"),t.setAttribute("onclick","displayNames('"+e+"')"),t.textContent=e,t.addEventListener("click",(()=>{usernameInput.value=e,suggestionsList.innerHTML=""})),suggestionsList.appendChild(t)}))}async function fetchGitHubUsernames(e){const t=await fetch(`https://api.github.com/search/users?q=${e}`),s=await t.json();return t.ok?s.items.map((e=>e.login)):[]}usernameInput.addEventListener("input",handleInput);
