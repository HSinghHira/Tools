function dnsLookup() {
  var inputUrl = document.getElementById("url").value;
  // Check if "http://" or "https://" is included in the input URL
  if (!inputUrl.startsWith("http://") && !inputUrl.startsWith("https://")) {
    // Add "http://" in front of the URL
    inputUrl = "http://" + inputUrl;
  }
  var dnsUrl = "https://api.ipify.org?format=json";
  fetch(dnsUrl)
    .then(response => response.json())
    .then(data => {
      var dnsResults = document.getElementById("dnsResults");
      dnsResults.innerHTML = `<div class=container><div class=card style=display:flex!important;margin-top:10px!important;margin-bottom:10px!important><div class=card-content><div class="justify-content-center row"><div class=table-responsive><table class="table table-hover"><tr><th scope=row>IP Address:<td>${data.ip}<tr><th scope=row>ISP:<td>${data.isp}<tr><th scope=row>Organization:<td>${data.org}<tr><th scope=row>City:<td>${data.city}<tr><th scope=row>Region:<td>${data.regionName}<tr><th scope=row>Country:<td>${data.country}<tr><th scope=row>Timezone:<td>${data.timezone}</table></div></div></div></div></div>`;

      // Shorten URL using shrtco.de API
      var apiUrl = "https://api.shrtco.de/v2/shorten?url=";
      var targetUrl = inputUrl;
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

  // Call the fetchIPAddress function to display the IP address
  fetchIPAddress();
}

// Function to fetch and display the IP address
function fetchIPAddress() {
  // Fetch the IP address using the api.ipify.org service
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const ipAddress = data.ip;
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