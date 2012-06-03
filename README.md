adaptImages.js
===============

`adaptImages.js` provides a simple function `adaptImages`, which you can use to support [responsive images](http://unstoppablerobotninja.com/entry/responsive-images/) on your web pages today.

__Note__: This is a stop gap approach until we have a specification and a good [polyfill](http://remysharp.com/2010/10/08/what-is-a-polyfill/) for picture/pic element that the [W3C Responsive Images Community Group](http://www.w3.org/community/respimg/) is working on.


## Pros and Cons

Responsive images aren't currently supported by web browsers, although many smart people are [working towards that](http://www.w3.org/community/respimg/). 

All available approaches, today, for adapting your pages to show the right size and resolution of images are hacks that compromise on one thing for another. It is important to understand what these compromises are before you pick a particular approach for your next project.

Here are the pros and cons of the approach `adaptImages.js` uses:

### Pros
- Works well when all images on your page follow the same criteria for selecting the version of an image to show. For example, if a page's width is greater than 640px, show the large version of all images on the page.

- Is [very fast](tests/perftest.html) since it only has to test the context once, unlike approaches that must support a different criteria for each image and each source.

- Works completely client side, unlike earlier [similar approaches](https://github.com/filamentgroup/Responsive-Images), which require server side code.

- Is quite flexible and lets you decide how to choose between versions of images to show. You could use page width, device resolution, matchMedia, observed network speed or any other mechanism to make your choice. 

- Is quite compact, the minified version is `~470 bytes`

### Cons

- Doesn't give you fine grained control on how _each_ image is selected. Approaches that support `srcset` and media queries for each source are much better if you need that control.

- The markup is a semantic mess.

- The markup isn't future proof. In the future when a standard is implemented for responsive images, you will need to either continue to use adaptImages script or update all old content to support the new `picture` markup.

## How to use

#### Markup
To make an `img` element adaptable (or responsive) you have to wrap it in a `noscript` element. This ensures that the wrapped `img` is only downloaded and used when javascript is not available.

When javascript is available, the `adaptImages` javascript function uses `data-*` on the `noscript` element to insert the correct img element onto the page.

The `noscript` element must also define `data-version` attributes, for example `data-l` and `data-s`:
````
<noscript data-s="s.jpg" data-l="l.jpg" data-alt="Red and Blue">
  <img src="s.jpg" alt="Red and Blue" />
</noscript>
````
The default set of supported versions is `['l', 's']`, but your page can override this by defining a `data-img-versions` attribute on the document's body which takes a `space` separated list of versions to support.
````
<body data-img-versions="large small large-2x small-2x">
  <noscript data-alt="Cats"
    data-large="cats.large.jpg" data-large-2x="cats.large.2x.jpg"
    data-small="cats.small.jpg" data-small-2x="cats.small.2x.jpg">
      <img src="cats.small.jpg" alt="Cats" />
  </noscript>
</body>
````
The `noscript` element must also define a `data-alt` attribute, the value of which will be used as the `alt` attribute of the `img` that is inserted in place of this `noscript`.

#### Script
Once the DOM has loaded, you can call `adaptImages` with the version you wish to show:
````
adaptImages('l')
````
A more appropriate example could be:
````
adaptImages(document.documentElement.clientWidth > 640 ? 'l' : 's')
````
Or if you've defined `data-img-versions="large small large-2x small-2x"` on the document's body, you could use this to support hi pixel density devices, like Apple's Retina display:
````
var r = window.devicePixelRatio || 1;
var w = document.documentElement.clientWidth;
var s = w > 640 ? 'large' : 'small';
s = r == 2 ? s+'-2x' : s;
adaptImages(s)
````

## Build and Test

`adaptImages.js` is just one javascript function, you can use it whatever way you want, the build system is there only to help test and create a minified version.

To build you need a posix shell like `bash` with GNU make, nodejs and npm installed.
````
$ make
$ make tests
````

## References

- [\[whatwg\] The \<pic\> element](http://lists.whatwg.org/pipermail/whatwg-whatwg.org/2012-May/036242.html) by Kornel Lesiński
- [Picture Polyfill](http://www.w3.org/community/respimg/2012/03/15/polyfilling-picture-without-the-overhead/) by Scott Jehl
- [Creating responsive images using the noscript tag](http://www.headlondon.com/our-thoughts/technology/posts/creating-responsive-images-using-the-noscript-tag) by Mairead Buchan
- [A framework for discussing responsive images solutions](http://blog.cloudfour.com/a-framework-for-discussing-responsive-images-solutions/) by Jason Grigsby
- [The real conflict behind <picture> and @srcset](http://blog.cloudfour.com/the-real-conflict-behind-picture-and-srcset/) by Jason Grigsby
- [Responsive Images: How they Almost Worked and What We Need](http://www.alistapart.com/articles/responsive-images-how-they-almost-worked-and-what-we-need/) by Mat Marquis
- [Responsive Images](https://github.com/filamentgroup/Responsive-Images) by Filament Group 
- [Responsive Images](http://unstoppablerobotninja.com/entry/responsive-images/)  by Ethan Marcotte
- [Responsive Web Design](http://www.alistapart.com/articles/responsive-web-design) by Ethan Marcotte

## MIT License

Copyright &copy; 2012 Mrinal Wadhwa

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.