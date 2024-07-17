var loadLanguages = function () {
    fetch("https://cdn.simplelocalize.io/76a4bf9512c64ea9a31ddfa7823113da/_latest/_languages")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var availableLanguages = data;
            populate_languages(availableLanguages);

            // Load the user's preferred language from the cookie
            var preferredLanguage = getCookie("preferredLanguage");
            if (preferredLanguage) {
                loadLanguage(preferredLanguage);
            } else {
                // Load English language by default
                loadLanguage("en-US");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

var populate_languages = function (languages) {
    var select = document.getElementById("hs-dropdown-default");

    languages.forEach(function (language) {
        var a = document.createElement("a");
        a.className = "flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700";
        a.href = "#";
        a.addEventListener("click", function () {
            loadLanguage(language.key);
        });
        select.appendChild(a);
        var image = document.createElement("img");
        image.className = "inline-block size-6 rounded-full";
        image.src = "https://hatscripts.github.io/circle-flags/flags/" + language.icon + ".svg";
        a.appendChild(image);
        var languageName = document.createElement("span");
        languageName.textContent = language.name;
        a.appendChild(languageName);
    });
};

var populate_textfields = function (jsdata, language) {
    $("[lang]").each(function (index) {
        var string = jsdata[$(this).attr("lang")];
        if (string == undefined) {
            // fallback to English
            string = jsdata[$(this).attr("lang")];
        }
        // smooth language change
        $(this).hide().html(string).fadeIn(1500);
    });
    console.log("language set to " + language);

    // Store the user's preferred language in a cookie
    setCookie("preferredLanguage", language, 365);
};

var loadLanguage = function (language) {
    fetch("https://cdn.simplelocalize.io/76a4bf9512c64ea9a31ddfa7823113da/_latest/" + language)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            populate_textfields(data, language);
        })
        .catch(function (error) {
            console.log("error");
            console.log(error);
        });
};

// Helper function to get a cookie value
var getCookie = function (name) {
    var cookieArr = document.cookie.split(";");

    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    return null;
};

// Helper function to set a cookie value
var setCookie = function (name, value, days) {
    var expires = "";

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
};

// Initial load of available languages
loadLanguages();
