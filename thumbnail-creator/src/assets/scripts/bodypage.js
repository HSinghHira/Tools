(function() {
  $(function() {
    var $preview, editor, mobileToolbar, toolbar;
    Simditor.locale = 'en-US';
    toolbar = ['bold', 'italic', 'underline', '|', 'strikethrough', '|', 'fontScale', 'color', 'code', '|', 'image', 'table', '|', 'hr', ];
    
    if (mobilecheck()) {
      toolbar = mobileToolbar;
    }
    editor = new Simditor({
      textarea: $('#input_post_title'),
      toolbar: toolbar,
      pasteImage: true,
      defaultImage: 'image.png',
      upload:false
    });
    $preview = $('#post_title');
    if ($preview.length > 0) {
      return editor.on('valuechanged', function(e) {
        return $preview.html(editor.getValue());
      });
    }
  });

}).call(this);
function update1(picker, selector) {
  document.querySelector(selector).style.background =
    picker.toBackground();
}
function update2(picker, selector) {
  document.querySelector(selector).style.background =
    picker.toBackground();
}
// triggers 'onInput' and 'onChange' on all color pickers when they are ready
jscolor.trigger("input change");

var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});
function hsinghhira(e)
{
	for (var t = 0; t < e.feed.entry
		.length; t++)
	{
		for (var n = 0; n < e.feed
			.entry[t].link.length &&
			"alternate" != e.feed.entry[
				t].link[n].rel; n++);
		var i =
			'<div class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14"><div class="sm:grid-cols-2 sm:gap-6 md:grid-cols-3 xl:grid-cols-4"><a class="group mb-2 flex flex-col rounded-xl border bg-white shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900" href="' +	e.feed.entry[t].content.$t + '"><div class="p-4 md:p-5"><div class="flex items-center justify-between"><div><h3 class="font-semibold text-gray-800 group-hover:text-blue-600 dark:text-neutral-200 dark:group-hover:text-neutral-400">' + e.feed.entry[t].title.$t + '</h3></div><div class="ps-3"><svg class="size-5 flex-shrink-0 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg></div></div></div></a></div></div>';
		document.write(i)
	}
}