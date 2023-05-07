'use strict';
/**
 * @return {undefined}
 */
function dnsLookup() {
  var url = document.getElementById("url").value;
  /** @type {string} */
  var newurl = "http://ip-api.com/json/";
  /** @type {!URLSearchParams} */
  var newParams = new URLSearchParams(window.location.search);
  /** @type {(null|string)} */
  var rootURL = newParams.get("dnslookup");
  if (rootURL) {
    /** @type {string} */
    newurl = newurl + (new URL(rootURL)).hostname;
  } else {
    /** @type {string} */
    newurl = newurl + (new URL(url)).hostname;
  }
  fetch(newurl).then((rawResp) => {
    return rawResp.json();
  }).then((options) => {
    /** @type {(Element|null)} */
    var lnkDiv = document.getElementById("dnsResults");
    lnkDiv.innerHTML = `<div class=container><div class=card style=display:flex!important;margin-top:10px!important;margin-bottom:10px!important><div class=card-content><div class="justify-content-center row"><div class=table-responsive><table class="table table-hover"><tr><th scope=row>IP Address:<td>${options.query}<tr><th scope=row>ISP:<td>${options.isp}<tr><th scope=row>Organization:<td>${options.org}<tr><th scope=row>City:<td>${options.city}<tr><th scope=row>Region:<td>${options.regionName}<tr><th scope=row>Country:<td>${options.country}<tr><th scope=row>Timezone:<td>${options.timezone}</table></div></div></div></div></div>`;
    /** @type {string} */
    var API_URL = "https://api.shrtco.de/v2/shorten?url=";
    /** @type {string} */
    var query = "";
    if (rootURL) {
      /** @type {string} */
      query = rootURL;
    } else {
      query = url;
    }
    fetch(API_URL + encodeURIComponent(query)).then((rawResp) => {
      return rawResp.json();
    }).then((batchResponse) => {
      /** @type {(Element|null)} */
      var result = document.getElementById("shortUrl");
      if (batchResponse.ok) {
        result.innerHTML = `<div class=container><div class=card style=display:flex!important;margin-top:10px!important><div class=card-content><div class="justify-content-center row"><div class=input-group><span class=input-group-text><i class=ci-document-alt></i></span> <input class=form-control id=maindata required value=${batchResponse.result.short_link}> <button class="btn btn-primary"onclick=copyit()>Copy URL</button></div></div></div></div></div>`;
      } else {
        /** @type {string} */
        result.innerHTML = "Error: Unable to shorten URL";
      }
    }).catch((canCreateDiscussions) => {
      /** @type {(Element|null)} */
      var result = document.getElementById("shortUrl");
      /** @type {string} */
      result.innerHTML = "Error: Unable to shorten URL";
    });
  }).catch((canCreateDiscussions) => {
    /** @type {(Element|null)} */
    var lnkDiv = document.getElementById("dnsResults");
    /** @type {string} */
    lnkDiv.innerHTML = "Error: Unable to perform DNS lookup";
  });
}
/**
 * @return {undefined}
 */
function fetchIPAddress() {
  fetch("http://ip-api.com/json/").then((rawResp) => {
    return rawResp.json();
  }).then((ContactEndpoint) => {
    const TRAVIS_API_JOBS_URL = ContactEndpoint.query;
    document.getElementById("ip-address").textContent = `${TRAVIS_API_JOBS_URL}`;
  }).catch((contextReference) => {
    console.log("Error fetching IP address:", contextReference);
    /** @type {string} */
    document.getElementById("ip-address").textContent = "Error fetching IP address";
  });
}
/** @type {function(): undefined} */
window.onload = fetchIPAddress;
