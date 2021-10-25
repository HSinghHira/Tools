---
---
/**
 * @name  {{ site.name }}
 * @description  {{ site.description }}
 * @author  {{ site.author }} <{{ site.author_email }}> ({{ site.url }})
 * @version  {{ site.version }}
 * @copyright  {{ site.author }} 2017
 * @license  {{ site.license }}
 */

self.addEventListener('message', (e) => {
  let source = e.data.source;
  const options = e.data.options;

  if (!options.formatCode) {
    self.postMessage({
      result: source,
      highlight: true,
    });
    return;
  }

  try {
    self._window = self.window;
    self.window = {};

    self.importScripts('{{ "third_party/js-beautify/beautify.min.js" | relative_url }}');

    source = self.window.js_beautify(source, {
      unescape_strings: true,
      jslint_happy: true,
    });

    self.window = self._window;
  } catch (err) {
    console.error(err);
  }

  self.postMessage({
    result: source,
    highlight: false,
  });

  try {
    self.importScripts('{{ "third_party/highlight-js/highlight.min.js" | relative_url }}');

    source = self.hljs.highlight('javascript', source).value;

    if (options.lineNumbers) {
      source = source.split('\n');
      source = source.join('</code><code>');
      source = `<code>${source}</code>`;
    }
  } catch (err) {
    throw new Error(err);
  }

  self.postMessage({
    result: source,
    highlight: true,
  });
});
