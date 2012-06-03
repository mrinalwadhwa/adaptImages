sink('adaptImages', function(test, ok, before, after){

  var large = '../examples/images/l.jpg',
      medium = '../examples/images/m.jpg',
      small = '../examples/images/s.jpg',
      alt = "alt txt";

  after(
    function(){
      // after every test remove all noscript elements on the page
      var nodes = document.getElementsByTagName('noscript');
      for(var i=nodes.length; i--;)
        document.body.removeChild(nodes[i])
    
      // after every test remove all img elements on the page
      nodes = document.getElementsByTagName('img');
      for(i=nodes.length; i--;)
        document.body.removeChild(nodes[i])
    }
  );

  test(
    'On a page with one responsive noscript, ' +
    'when adaptImages was called for "l" size',
    6,
    function(){
    
      var noscript = document.createElement('noscript');
      noscript.setAttribute('data-l', large);
      noscript.setAttribute('data-s', small);
      noscript.setAttribute('data-alt', alt);
      noscript.innerHTML = '<img src="'+ small +'" alt="'+ alt +'" />';
      document.body.appendChild(noscript);
      adaptImages('l');

      var images = document.getElementsByTagName('img');
      var image = images[0];

      ok(document.getElementsByTagName('noscript').length === 0,
         'the noscript was removed');

      ok(images.length === 1,
         'an img was added');

      ok(image.getAttribute('src') === large,
         'img src was set to data-l of noscript');

      ok(image.getAttribute('alt') === alt,
         'img alt was set to data-alt of noscript');
      ok(image.getAttribute('data-l') === large,
         'img data-l was set to data-l of noscript');
      ok(image.getAttribute('data-s') === small,
         'img data-s was set to data-s of noscript');
   }
  );
  
  
  test(
    'On a page with one responsive img, '+
    'when adaptImages was called for "l" size',
    7,
    function(){
      
      // add a responsive image
      var img = document.createElement('img');
      img.setAttribute('data-l', large);
      img.setAttribute('data-s', small);
      img.setAttribute('alt', alt);
      img.setAttribute('src', small);
      document.body.appendChild(img);
      
      // adapt images on the page
      adaptImages('l');
    
      var images = document.getElementsByTagName('img');
      var image = images[0];
    
      ok(image === img,
         'same img instance is still present');
      ok(images.length === 1,
         'no extra images were added');
      ok(image.getAttribute('src') !== small,
         'img src is no longer its original value');
      ok(image.getAttribute('src') === large,
         'img src was set to data-l of img');
      ok(image.getAttribute('alt') === alt,
         'img alt was not modified');
      ok(image.getAttribute('data-l') === large,
         'img data-l was not modified');
      ok(image.getAttribute('data-s') === small,
         'img data-s was not modified');
   }
  );
  
  test(
    'data-img-sizes set to large & small, ' +
    'when adaptImages was called for "medium" size',
    6,
    function(){
    
      var noscript = document.createElement('noscript');
      document.body.setAttribute('data-img-versions', 'l m s')
      noscript.setAttribute('data-l', large);
      noscript.setAttribute('data-m', medium);
      noscript.setAttribute('data-s', small);
      noscript.innerHTML = '<img src="'+ small +'" alt="'+ alt +'" />';
      document.body.appendChild(noscript);
      
      adaptImages('m');

      var images = document.getElementsByTagName('img');
      var image = images[0];

      ok(document.getElementsByTagName('noscript').length === 0,
         'the noscript was removed');

      ok(images.length === 1,
         'an img was added');

      ok(image.getAttribute('src') === medium,
         'img src was set to data-m of noscript');

      ok(image.getAttribute('data-l') === large,
         'img data-large was set to data-l of noscript');
      ok(image.getAttribute('data-m') === medium,
         'img data-m was set to data-m of noscript');
      ok(image.getAttribute('data-s') === small,
         'img data-s was set to data-s of noscript');
   }
  );

});

start();