function hsinghhira(e) {
    for (var t = 0; t < e.feed.entry
        .length; t++) {
        for (var n = 0; n < e.feed
            .entry[t].link.length &&
            "alternate" != e.feed.entry[
                t].link[n].rel; n++);
        var i =
            '<a target="_blank" class="group mb-2 flex flex-col rounded-xl border bg-white shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900" href="' + e.feed.entry[t].content.$t + '"><div class="p-4 md:p-5"><div class="flex items-center justify-between"><div><h3 class="font-semibold text-gray-800 group-hover:text-blue-600 dark:text-neutral-200 dark:group-hover:text-neutral-400">' + e.feed.entry[t].title.$t + '</h3></div><div class="ps-3"><svg class="size-5 flex-shrink-0 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg></div></div></div></a>';
        document.write(i)
    }
}
if (mobilecheck()) {
    $("<link/>", {
        media: "all",
        rel: "stylesheet",
        type: "text/css",
        href: "assets/styles/mobile.css",
    }).appendTo("head");
}
// Here we can adjust defaults for all color pickers on page:
jscolor.presets.default = {
    palette: [
        "#c62828",
        "#c2185b",
        "#7b1fa2",
        "#512da8",
        "#303f9f",
        "#1976d2",
        "#005b9f",
        "#006978",
        "#00796b",
        "#00600f",
        "#387002",
        "#6c6f00",
        "#bc5100",
        "#c43e00",
        "#bb4d00",
        "#ac0800",
        "#5d4037",
        "#616161",
        "#455a64",
        "#000000",
    ],
    paletteCols: 10,
    hideOnPaletteClick: false,
    width: 271,
    height: 151,
    position: "",
    previewPosition: "",
    backgroundColor: "rgba(51,51,51,1)",
    controlBorderColor: "rgba(153,153,153,1)",
    buttonColor: "rgba(240,240,240,1)",
};

document.getElementById("year").innerHTML = new Date().getFullYear();