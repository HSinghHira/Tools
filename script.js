function saveit(e,t){var n=new Blob([e],{type:"text/plain"}),o=document.createElement("a");o.download=t,o.innerHTML="Download File",null!=window.webkitURL?o.href=window.webkitURL.createObjectURL(n):(o.href=window.URL.createObjectURL(n),o.onclick=destroyClickedElement,o.style.display="none",document.body.appendChild(o)),o.click()}function loadit(){var e=document.getElementById("fileToLoad").files[0],t=new FileReader;t.onload=function(e){var t=e.target.result;document.getElementById("maindata").value=t},t.readAsText(e,"UTF-8")}function copyit(){document.getElementById("maindata").select(),document.execCommand("copy")}