adaptImages.js
---------------

`adaptImages.js` provides a simple function `adaptImages`, which you can use to support responsive images on your web pages.

Usage
------

### Markup

````
<noscript data-s="s.jpg" data-l="l.jpg" data-alt="Red and Blue">
  <img src="s.jpg" alt="Red and Blue" />
</noscript>
````

### Script

````
adaptImages('l')
````



Build and Test
---------------

  $ make

  $ make tests


References
----------

- [Picture Polyfill][]


[1]: http://www.w3.org/community/respimg/2012/03/15/polyfilling-picture-without-the-overhead/

[2]: http://www.headlondon.com/our-thoughts/technology/posts/creating-responsive-images-using-the-noscript-tag



LICENSE
-------

MIT License

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