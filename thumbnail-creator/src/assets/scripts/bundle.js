(() => {
    var e = {
        306: function (e) {
            !(function (t) {
                "use strict";
                var n = (function () {
                    return {
                        escape: function (e) {
                            return e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
                        },
                        parseExtension: t,
                        mimeType: function (e) {
                            var n = t(e).toLowerCase();
                            return (
                                ((r = "application/font-woff"),
                                    (o = "image/jpeg"),
                                {
                                    woff: r,
                                    woff2: r,
                                    ttf: "application/font-truetype",
                                    eot: "application/vnd.ms-fontobject",
                                    png: "image/png",
                                    jpg: o,
                                    jpeg: o,
                                    gif: "image/gif",
                                    tiff: "image/tiff",
                                    svg: "image/svg+xml",
                                })[n] || ""
                            );
                            var r, o;
                        },
                        dataAsUrl: function (e, t) {
                            return "data:" + t + ";base64," + e;
                        },
                        isDataUrl: function (e) {
                            return -1 !== e.search(/^(data:)/);
                        },
                        canvasToBlob: function (e) {
                            return e.toBlob
                                ? new Promise(function (t) {
                                    e.toBlob(t);
                                })
                                : (function (e) {
                                    return new Promise(function (t) {
                                        for (
                                            var n = window.atob(e.toDataURL().split(",")[1]),
                                            r = n.length,
                                            o = new Uint8Array(r),
                                            i = 0;
                                            i < r;
                                            i++
                                        )
                                            o[i] = n.charCodeAt(i);
                                        t(
                                            new Blob([o], {
                                                type: "image/png",
                                            })
                                        );
                                    });
                                })(e);
                        },
                        resolveUrl: function (e, t) {
                            var n = document.implementation.createHTMLDocument(),
                                r = n.createElement("base");
                            n.head.appendChild(r);
                            var o = n.createElement("a");
                            return (
                                n.body.appendChild(o), (r.href = t), (o.href = e), o.href
                            );
                        },
                        getAndEncode: function (e) {
                            var t = 3e4;
                            u.impl.options.cacheBust &&
                                (e += (/\?/.test(e) ? "&" : "?") + new Date().getTime());
                            return new Promise(function (n) {
                                var r,
                                    o = new XMLHttpRequest();
                                if (
                                    ((o.onreadystatechange = a),
                                        (o.ontimeout = c),
                                        (o.responseType = "blob"),
                                        (o.timeout = t),
                                        o.open("GET", e, !0),
                                        o.send(),
                                        u.impl.options.imagePlaceholder)
                                ) {
                                    var i = u.impl.options.imagePlaceholder.split(/,/);
                                    i && i[1] && (r = i[1]);
                                }

                                function a() {
                                    if (4 === o.readyState)
                                        if (200 === o.status) {
                                            var t = new FileReader();
                                            (t.onloadend = function () {
                                                var e = t.result.split(/,/)[1];
                                                n(e);
                                            }),
                                                t.readAsDataURL(o.response);
                                        } else
                                            r
                                                ? n(r)
                                                : l(
                                                    "cannot fetch resource: " +
                                                    e +
                                                    ", status: " +
                                                    o.status
                                                );
                                }

                                function c() {
                                    r
                                        ? n(r)
                                        : l(
                                            "timeout of " +
                                            t +
                                            "ms occured while fetching resource: " +
                                            e
                                        );
                                }

                                function l(e) {
                                    console.error(e), n("");
                                }
                            });
                        },
                        uid:
                            ((e = 0),
                                function () {
                                    return "u" + t() + e++;

                                    function t() {
                                        return (
                                            "0000" +
                                            ((Math.random() * Math.pow(36, 4)) << 0).toString(36)
                                        ).slice(-4);
                                    }
                                }),
                        delay: function (e) {
                            return function (t) {
                                return new Promise(function (n) {
                                    setTimeout(function () {
                                        n(t);
                                    }, e);
                                });
                            };
                        },
                        asArray: function (e) {
                            for (var t = [], n = e.length, r = 0; r < n; r++)
                                t.push(e[r]);
                            return t;
                        },
                        escapeXhtml: function (e) {
                            return e.replace(/#/g, "%23").replace(/\n/g, "%0A");
                        },
                        makeImage: function (e) {
                            return new Promise(function (t, n) {
                                var r = new Image();
                                (r.onload = function () {
                                    t(r);
                                }),
                                    (r.onerror = n),
                                    (r.src = e);
                            });
                        },
                        width: function (e) {
                            var t = n(e, "border-left-width"),
                                r = n(e, "border-right-width");
                            return e.scrollWidth + t + r;
                        },
                        height: function (e) {
                            var t = n(e, "border-top-width"),
                                r = n(e, "border-bottom-width");
                            return e.scrollHeight + t + r;
                        },
                    };
                    var e;

                    function t(e) {
                        var t = /\.([^\.\/]*?)$/g.exec(e);
                        return t ? t[1] : "";
                    }

                    function n(e, t) {
                        var n = window.getComputedStyle(e).getPropertyValue(t);
                        return parseFloat(n.replace("px", ""));
                    }
                })(),
                    r = (function () {
                        var e = /url\(['"]?([^'"]+?)['"]?\)/g;
                        return {
                            inlineAll: function (e, n, i) {
                                return a()
                                    ? Promise.resolve(e)
                                    : Promise.resolve(e)
                                        .then(r)
                                        .then(function (t) {
                                            var r = Promise.resolve(e);
                                            return (
                                                t.forEach(function (e) {
                                                    r = r.then(function (t) {
                                                        return o(t, e, n, i);
                                                    });
                                                }),
                                                r
                                            );
                                        });

                                function a() {
                                    return !t(e);
                                }
                            },
                            shouldProcess: t,
                            impl: {
                                readUrls: r,
                                inline: o,
                            },
                        };

                        function t(t) {
                            return -1 !== t.search(e);
                        }

                        function r(t) {
                            for (var r, o = []; null !== (r = e.exec(t));) o.push(r[1]);
                            return o.filter(function (e) {
                                return !n.isDataUrl(e);
                            });
                        }

                        function o(e, t, r, o) {
                            return Promise.resolve(t)
                                .then(function (e) {
                                    return r ? n.resolveUrl(e, r) : e;
                                })
                                .then(o || n.getAndEncode)
                                .then(function (e) {
                                    return n.dataAsUrl(e, n.mimeType(t));
                                })
                                .then(function (r) {
                                    return e.replace(
                                        (function (e) {
                                            return new RegExp(
                                                "(url\\(['\"]?)(" + n.escape(e) + ")(['\"]?\\))",
                                                "g"
                                            );
                                        })(t),
                                        "$1" + r + "$3"
                                    );
                                });
                        }
                    })(),
                    o = (function () {
                        return {
                            resolveAll: function () {
                                return e(document)
                                    .then(function (e) {
                                        return Promise.all(
                                            e.map(function (e) {
                                                return e.resolve();
                                            })
                                        );
                                    })
                                    .then(function (e) {
                                        return e.join("\n");
                                    });
                            },
                            impl: {
                                readAll: e,
                            },
                        };

                        function e() {
                            return Promise.resolve(n.asArray(document.styleSheets))
                                .then(function (e) {
                                    var t = [];
                                    return (
                                        e.forEach(function (e) {
                                            try {
                                                n.asArray(e.cssRules || []).forEach(t.push.bind(t));
                                            } catch (t) {
                                                console.log(
                                                    "Error while reading CSS rules from " + e.href,
                                                    t.toString()
                                                );
                                            }
                                        }),
                                        t
                                    );
                                })
                                .then(function (e) {
                                    return e
                                        .filter(function (e) {
                                            return e.type === CSSRule.FONT_FACE_RULE;
                                        })
                                        .filter(function (e) {
                                            return r.shouldProcess(e.style.getPropertyValue("src"));
                                        });
                                })
                                .then(function (t) {
                                    return t.map(e);
                                });

                            function e(e) {
                                return {
                                    resolve: function () {
                                        var t = (e.parentStyleSheet || {}).href;
                                        return r.inlineAll(e.cssText, t);
                                    },
                                    src: function () {
                                        return e.style.getPropertyValue("src");
                                    },
                                };
                            }
                        }
                    })(),
                    i = (function () {
                        return {
                            inlineAll: function t(o) {
                                return o instanceof Element
                                    ? i(o).then(function () {
                                        return o instanceof HTMLImageElement
                                            ? e(o).inline()
                                            : Promise.all(
                                                n.asArray(o.childNodes).map(function (e) {
                                                    return t(e);
                                                })
                                            );
                                    })
                                    : Promise.resolve(o);

                                function i(e) {
                                    var t = e.style.getPropertyValue("background");
                                    return t
                                        ? r
                                            .inlineAll(t)
                                            .then(function (t) {
                                                e.style.setProperty(
                                                    "background",
                                                    t,
                                                    e.style.getPropertyPriority("background")
                                                );
                                            })
                                            .then(function () {
                                                return e;
                                            })
                                        : Promise.resolve(e);
                                }
                            },
                            impl: {
                                newImage: e,
                            },
                        };

                        function e(e) {
                            return {
                                inline: function (t) {
                                    return n.isDataUrl(e.src)
                                        ? Promise.resolve()
                                        : Promise.resolve(e.src)
                                            .then(t || n.getAndEncode)
                                            .then(function (t) {
                                                return n.dataAsUrl(t, n.mimeType(e.src));
                                            })
                                            .then(function (t) {
                                                return new Promise(function (n, r) {
                                                    (e.onload = n), (e.onerror = r), (e.src = t);
                                                });
                                            });
                                },
                            };
                        }
                    })(),
                    a = {
                        imagePlaceholder: void 0,
                        cacheBust: !1,
                    },
                    u = {
                        toSvg: c,
                        toPng: function (e, t) {
                            return l(e, t || {}).then(function (e) {
                                return e.toDataURL();
                            });
                        },
                        toJpeg: function (e, t) {
                            return l(e, (t = t || {})).then(function (e) {
                                return e.toDataURL("image/jpeg", t.quality || 1);
                            });
                        },
                        toBlob: function (e, t) {
                            return l(e, t || {}).then(n.canvasToBlob);
                        },
                        toPixelData: function (e, t) {
                            return l(e, t || {}).then(function (t) {
                                return t
                                    .getContext("2d")
                                    .getImageData(0, 0, n.width(e), n.height(e)).data;
                            });
                        },
                        impl: {
                            fontFaces: o,
                            images: i,
                            util: n,
                            inliner: r,
                            options: {},
                        },
                    };

                function c(e, t) {
                    return (
                        (function (e) {
                            void 0 === e.imagePlaceholder
                                ? (u.impl.options.imagePlaceholder = a.imagePlaceholder)
                                : (u.impl.options.imagePlaceholder = e.imagePlaceholder);
                            void 0 === e.cacheBust
                                ? (u.impl.options.cacheBust = a.cacheBust)
                                : (u.impl.options.cacheBust = e.cacheBust);
                        })((t = t || {})),
                        Promise.resolve(e)
                            .then(function (e) {
                                return s(e, t.filter, !0);
                            })
                            .then(d)
                            .then(f)
                            .then(function (e) {
                                t.bgcolor && (e.style.backgroundColor = t.bgcolor);
                                t.width && (e.style.width = t.width + "px");
                                t.height && (e.style.height = t.height + "px");
                                t.style &&
                                    Object.keys(t.style).forEach(function (n) {
                                        e.style[n] = t.style[n];
                                    });
                                return e;
                            })
                            .then(function (r) {
                                return (function (e, t, r) {
                                    return Promise.resolve(e)
                                        .then(function (e) {
                                            return (
                                                e.setAttribute(
                                                    "xmlns",
                                                    "http://www.w3.org/1999/xhtml"
                                                ),
                                                new XMLSerializer().serializeToString(e)
                                            );
                                        })
                                        .then(n.escapeXhtml)
                                        .then(function (e) {
                                            return (
                                                '<foreignObject x="0" y="0" width="100%" height="100%">' +
                                                e +
                                                "</foreignObject>"
                                            );
                                        })
                                        .then(function (e) {
                                            return (
                                                '<svg xmlns="http://www.w3.org/2000/svg" width="' +
                                                t +
                                                '" height="' +
                                                r +
                                                '">' +
                                                e +
                                                "</svg>"
                                            );
                                        })
                                        .then(function (e) {
                                            return "data:image/svg+xml;charset=utf-8," + e;
                                        });
                                })(r, t.width || n.width(e), t.height || n.height(e));
                            })
                    );
                }

                function l(e, t) {
                    return c(e, t)
                        .then(n.makeImage)
                        .then(n.delay(100))
                        .then(function (r) {
                            var o = (function (e) {
                                var r = document.createElement("canvas");
                                if (
                                    ((r.width = t.width || n.width(e)),
                                        (r.height = t.height || n.height(e)),
                                        t.bgcolor)
                                ) {
                                    var o = r.getContext("2d");
                                    (o.fillStyle = t.bgcolor),
                                        o.fillRect(0, 0, r.width, r.height);
                                }
                                return r;
                            })(e);
                            return o.getContext("2d").drawImage(r, 0, 0), o;
                        });
                }

                function s(e, t, r) {
                    return r || !t || t(e)
                        ? Promise.resolve(e)
                            .then(function (e) {
                                return e instanceof HTMLCanvasElement
                                    ? n.makeImage(e.toDataURL())
                                    : e.cloneNode(!1);
                            })
                            .then(function (r) {
                                return (function (e, t, r) {
                                    var o = e.childNodes;
                                    return 0 === o.length
                                        ? Promise.resolve(t)
                                        : i(t, n.asArray(o), r).then(function () {
                                            return t;
                                        });

                                    function i(e, t, n) {
                                        var r = Promise.resolve();
                                        return (
                                            t.forEach(function (t) {
                                                r = r
                                                    .then(function () {
                                                        return s(t, n);
                                                    })
                                                    .then(function (t) {
                                                        t && e.appendChild(t);
                                                    });
                                            }),
                                            r
                                        );
                                    }
                                })(e, r, t);
                            })
                            .then(function (t) {
                                return (function (e, t) {
                                    return t instanceof Element
                                        ? Promise.resolve()
                                            .then(r)
                                            .then(o)
                                            .then(i)
                                            .then(a)
                                            .then(function () {
                                                return t;
                                            })
                                        : t;

                                    function r() {
                                        function r(e, t) {
                                            function r(e, t) {
                                                n.asArray(e).forEach(function (n) {
                                                    t.setProperty(
                                                        n,
                                                        e.getPropertyValue(n),
                                                        e.getPropertyPriority(n)
                                                    );
                                                });
                                            }
                                            e.cssText ? (t.cssText = e.cssText) : r(e, t);
                                        }
                                        r(window.getComputedStyle(e), t.style);
                                    }

                                    function o() {
                                        function r(r) {
                                            var o = window.getComputedStyle(e, r),
                                                i = o.getPropertyValue("content");
                                            if ("" !== i && "none" !== i) {
                                                var a = n.uid();
                                                t.className = t.className + " " + a;
                                                var u = document.createElement("style");
                                                u.appendChild(c(a, r, o)), t.appendChild(u);
                                            }

                                            function c(e, t, r) {
                                                var o = "." + e + ":" + t,
                                                    i = r.cssText ? a(r) : u(r);
                                                return document.createTextNode(o + "{" + i + "}");

                                                function a(e) {
                                                    var t = e.getPropertyValue("content");
                                                    return e.cssText + " content: " + t + ";";
                                                }

                                                function u(e) {
                                                    return n.asArray(e).map(t).join("; ") + ";";

                                                    function t(t) {
                                                        return (
                                                            t +
                                                            ": " +
                                                            e.getPropertyValue(t) +
                                                            (e.getPropertyPriority(t)
                                                                ? " !important"
                                                                : "")
                                                        );
                                                    }
                                                }
                                            }
                                        }
                                        [":before", ":after"].forEach(function (e) {
                                            r(e);
                                        });
                                    }

                                    function i() {
                                        e instanceof HTMLTextAreaElement &&
                                            (t.innerHTML = e.value),
                                            e instanceof HTMLInputElement &&
                                            t.setAttribute("value", e.value);
                                    }

                                    function a() {
                                        t instanceof SVGElement &&
                                            (t.setAttribute(
                                                "xmlns",
                                                "http://www.w3.org/2000/svg"
                                            ),
                                                t instanceof SVGRectElement &&
                                                ["width", "height"].forEach(function (e) {
                                                    var n = t.getAttribute(e);
                                                    n && t.style.setProperty(e, n);
                                                }));
                                    }
                                })(e, t);
                            })
                        : Promise.resolve();
                }

                function d(e) {
                    return o.resolveAll().then(function (t) {
                        var n = document.createElement("style");
                        return (
                            e.appendChild(n), n.appendChild(document.createTextNode(t)), e
                        );
                    });
                }

                function f(e) {
                    return i.inlineAll(e).then(function () {
                        return e;
                    });
                }
                e.exports = u;
            })();
        },
    },
        t = {};

    function n(r) {
        var o = t[r];
        if (void 0 !== o) return o.exports;
        var i = (t[r] = {
            exports: {},
        });
        return e[r].call(i.exports, i, i.exports, n), i.exports;
    }
    (n.n = (e) => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return (
            n.d(t, {
                a: t,
            }),
            t
        );
    }),
        (n.d = (e, t) => {
            for (var r in t)
                n.o(t, r) &&
                    !n.o(e, r) &&
                    Object.defineProperty(e, r, {
                        enumerable: !0,
                        get: t[r],
                    });
        }),
        (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
        (() => {
            "use strict";
            var e = n(306),
                t = n.n(e);
            const r = (e, t, n) => {
                document.querySelector(e).addEventListener("keyup", (e) => {
                    "background" == n
                        ? (document.querySelector(t).style.backgroundColor =
                            e.target.value)
                        : "text" == n
                            ? (document.querySelector(t).style.color = e.target.value)
                            : "innerHTML" == n &&
                            (document.querySelector(t).innerHTML = e.target.value);
                });
            },
                o = document.querySelector(".container_background_color");
            document
                .getElementById("input_background_color")
                .addEventListener("change", (e) => {
                    "custom" == e.target.value
                        ? (o.classList.remove("hidden"),
                            o.classList.add("grid"),
                            r(
                                "#input_hex_background_color",
                                ".thumbnail_container",
                                "background"
                            ),
                            r("#input_hex_text_color", ".thumbnail_container", "text"),
                            r(
                                "#input_hex_background_color",
                                ".input_hex_background_color_preview",
                                "background"
                            ),
                            r(
                                "#input_hex_text_color",
                                ".input_hex_text_color_preview",
                                "background"
                            ),
                            r("#input_hex_text_color", ".post_label_ornament", "background"))
                        : (o.classList.add("hidden"),
                            o.classList.remove("grid"),
                            (document.querySelector(
                                ".thumbnail_container"
                            ).style.backgroundColor = e.target.value),
                            (document.querySelector(".thumbnail_container").style.color =
                                "#F0EBEB"),
                            (document.querySelector(
                                ".post_label_ornament"
                            ).style.backgroundColor = "#F0EBEB"),
                            (document.querySelector("#input_hex_background_color").value =
                                e.target.value),
                            (document.querySelector("#input_hex_text_color").value =
                                "#F0EBEB"),
                            (document.querySelector(
                                ".input_hex_background_color_preview"
                            ).style.backgroundColor = e.target.value),
                            (document.querySelector(
                                ".input_hex_text_color_preview"
                            ).style.backgroundColor = "#F0EBEB"));
                });
            const i = [
                "./src/assets/patterns/1.png",
                "./src/assets/patterns/2.png",
                "./src/assets/patterns/3.png",
                "./src/assets/patterns/4.png",
                "./src/assets/patterns/5.png",
                "./src/assets/patterns/6.png",
                "./src/assets/patterns/7.png",
                "./src/assets/patterns/8.png",
                "./src/assets/patterns/9.png",
                "./src/assets/patterns/10.png",
            ],
                a = document.getElementById("input_background_image");
            for (let e = 0; e < i.length; e++) {
                const t = i[e];
                a.innerHTML += `
    <option data-hs-select-option='{"icon": "<img class=\\"inline-block size-5 rounded-full\\" src=\\"${t}\\"/>"}' value="${t}">Background Image ${e}</option>
`;
            }
            a.addEventListener("change", (e) => {
                "none" != e.target.value
                    ? (document
                        .querySelector(".background_image")
                        .classList.remove("hidden"),
                        document
                            .querySelector(".input_background_image_advanced")
                            .classList.remove("hidden"),
                        document
                            .querySelector(".input_background_image_advanced")
                            .classList.add("grid"),
                        (document.querySelector(
                            ".background_image"
                        ).style.backgroundImage = `url(${e.target.value})`))
                    : (document
                        .querySelector(".background_image")
                        .classList.add("hidden"),
                        document
                            .querySelector(".input_background_image_advanced")
                            .classList.add("hidden"),
                        document
                            .querySelector(".input_background_image_advanced")
                            .classList.remove("grid")),
                    console.log(e.target.value);
            });

            // Background Image Array
            const images = [
                "./src/assets/patterns/1.png",
                "./src/assets/patterns/2.png",
                "./src/assets/patterns/3.png",
                "./src/assets/patterns/4.png",
                "./src/assets/patterns/5.png",
                "./src/assets/patterns/6.png",
                "./src/assets/patterns/7.png",
                "./src/assets/patterns/8.png",
                "./src/assets/patterns/9.png",
                "./src/assets/patterns/10.png",
            ];

            // Populate the background image dropdown
            const backgroundImageDropdown = document.getElementById(
                "input_background_image"
            );
            // Populate the background image dropdown with preset images
            for (let e = 0; e < images.length; e++) {
                const t = images[e];
                backgroundImageDropdown.innerHTML;
            }

            // Add custom image option
            const customImageOption = document.getElementById("custom");

            backgroundImageDropdown.addEventListener("change", (e) => {
                const backgroundImageElement =
                    document.querySelector(".background_image");
                const customImageInput = document.getElementById(
                    "custom_background_image"
                );

                if (e.target.value === "custom") {
                    customImageInput.classList.remove("hidden");
                } else {
                    customImageInput.classList.add("hidden");
                }

                if (e.target.value !== "none" && e.target.value !== "custom") {
                    backgroundImageElement.classList.remove("hidden");
                    document
                        .querySelector(".input_background_image_advanced")
                        .classList.remove("hidden");
                    document
                        .querySelector(".input_background_image_advanced")
                        .classList.add("grid");
                    backgroundImageElement.style.backgroundImage = `url(${e.target.value})`;
                } else {
                    backgroundImageElement.classList.add("hidden");
                    document
                        .querySelector(".input_background_image_advanced")
                        .classList.add("hidden");
                    document
                        .querySelector(".input_background_image_advanced")
                        .classList.remove("grid");
                }
                console.log(e.target.value);
            });

            // Event listener for custom image upload
            const customImageInput = document.getElementById(
                "custom_background_image"
            );
            customImageInput.addEventListener("change", (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const backgroundImageElement =
                            document.querySelector(".background_image");
                        backgroundImageElement.classList.remove("hidden");
                        document
                            .querySelector(".input_background_image_advanced")
                            .classList.remove("hidden");
                        document
                            .querySelector(".input_background_image_advanced")
                            .classList.add("grid");
                        backgroundImageElement.style.backgroundImage = `url(${event.target.result})`;
                    };
                    reader.readAsDataURL(file);
                }
            });

            document
                .querySelector("#image_invert")
                .addEventListener("change", (e) => {
                    e.target.checked
                        ? ((document.querySelector(".background_image").style.filter =
                            e.target.value),
                            (document.querySelector(".background_image").style.opacity =
                                "0.15"))
                        : ((document.querySelector(".background_image").style.filter = ""),
                            (document.querySelector(".background_image").style.opacity =
                                "0.25"));
                }),
                r("#input_post_label", "#post_label", "innerHTML"),
                r("#input_post_title", "#post_title", "innerHTML"),
                r("#input_post_author", "#post_author", "innerHTML"),
                r("#input_blog_title", "#blog_title", "innerHTML");
            const u = document.querySelector(".thumbnail_container");
            document
                .getElementById("button_download_image")
                .addEventListener("click", () => {
                    t()
                        .toJpeg(u, {
                            width: 1.5 * u.clientWidth,
                            height: 1.5 * u.clientHeight,
                            style: {
                                transform: "scale(1.5)",
                                transformOrigin: "top left",
                            },
                        })
                        .then(function (e) {
                            ((e, t) => {
                                let n = document.createElement(e);
                                for (var r in t)
                                    "class" == r
                                        ? n.classList.add.apply(n.classList, t[r])
                                        : "content" == r
                                            ? (n.innerHTML = t[r])
                                            : (n[r] = t[r]);
                                return n;
                            })("a", {
                                href: e,
                                download: "Thumbnail_" + Math.round(9999 * Math.random()) + 1,
                            }).click();
                        })
                        .catch(function (e) {
                            console.error("oops, something went wrong!", e);
                        });
                });
        })();
})();
