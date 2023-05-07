function dnsLookup() {
    var inputUrl = document.getElementById("url").value;
    var dnsUrl = "http://ip-api.com/json/";
    var queryParams = new URLSearchParams(window.location.search);
    var dnsLookupUrl = queryParams.get("dnslookup");
    if (dnsLookupUrl) {
      dnsUrl += new URL(dnsLookupUrl).hostname;
    } else {
      dnsUrl += new URL(inputUrl).hostname;
    }
    fetch(dnsUrl)
      .then(response => response.json())
      .then(data => {
        var dnsResults = document.getElementById("dnsResults");
        dnsResults.innerHTML = `<div class=container><div class=card style=display:flex!important;margin-top:10px!important;margin-bottom:10px!important><div class=card-content><div class="justify-content-center row"><div class=table-responsive><table class="table table-hover"><tr><th scope=row>IP Address:<td>${data.query}<tr><th scope=row>ISP:<td>${data.isp}<tr><th scope=row>Organization:<td>${data.org}<tr><th scope=row>City:<td>${data.city}<tr><th scope=row>Region:<td>${data.regionName}<tr><th scope=row>Country:<td>${data.country}<tr><th scope=row>Timezone:<td>${data.timezone}</table></div></div></div></div></div>`;

        // Shorten URL using shrtco.de API
        var apiUrl = "https://api.shrtco.de/v2/shorten?url=";
        var targetUrl = "";
        if (dnsLookupUrl) {
          targetUrl = dnsLookupUrl;
        } else {
          targetUrl = inputUrl;
        }
        fetch(apiUrl + encodeURIComponent(targetUrl))
          .then(response => response.json())
          .then(data => {
            var shortUrl = document.getElementById("shortUrl");
            if (data.ok) {
              shortUrl.innerHTML = `<div class=container><div class=card style=display:flex!important;margin-top:10px!important><div class=card-content><div class="justify-content-center row"><div class=input-group><span class=input-group-text><i class=ci-document-alt></i></span> <input class=form-control id=maindata required value=${data.result.short_link}> <button class="btn btn-primary"onclick=copyit()>Copy URL</button></div></div></div></div></div>`;
            } else {
              shortUrl.innerHTML = "Error: Unable to shorten URL";
            }
          })
          .catch(error => {
            var shortUrl = document.getElementById("shortUrl");
            shortUrl.innerHTML = "Error: Unable to shorten URL";
          });
      })
      .catch(error => {
        var dnsResults = document.getElementById("dnsResults");
        dnsResults.innerHTML = "Error: Unable to perform DNS lookup";
      });
  }
   // Function to fetch and display the IP address
   function fetchIPAddress() {
    // Fetch the IP address using the ip-api.com service
    fetch('http://ip-api.com/json/')
      .then(response => response.json())
      .then(data => {
        const ipAddress = data.query;
        // Display the IP address on the page
        document.getElementById('ip-address').textContent = `${ipAddress}`;
      })
      .catch(error => {
        console.log('Error fetching IP address:', error);
        // Display an error message on the page
        document.getElementById('ip-address').textContent = 'Error fetching IP address';
      });
  }

  // Call the fetchIPAddress function when the page loads
  window.onload = fetchIPAddress;
