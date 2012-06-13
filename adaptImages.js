var adaptImages = function fn(version){
  var
    // cached reference to document for better minification and performance
    doc = document,

    // some local variables to save bytes in minification
    getElementsByTagName = 'getElementsByTagName',
    getAttribute = 'getAttribute',
    setAttribute = 'setAttribute',
    length = 'length',
    data = 'data-',
    alt = 'alt',

    // default set of versions we support
    versions = ['l','s'],
    // if document body has 'data-img-versions', use that list instead
    attr = doc.body[getAttribute](data + 'img-versions'),
    // 'data-img-versions' should be a space separated list of versions
    versions = attr ? attr.split(' ') : versions,
    // save length for later use in loops
    versionLen = versions[length],

    // if the argument received is 'l', attribute we'll look for is 'data-l'
    version = data + version,

    // some variable declarations for later use
    nodes, nLen, node, img;


  if(fn.r){

    // if this function has already run once all noscript tags with version
    // attributes have been replaced with img elements with the same version
    // attributes

    // loop though all img elements in this document
    for(nodes = doc[getElementsByTagName]('img'), nLen = nodes[length]; nLen--;)
       // if an img has version attr, set src to value of version attr
      if(attr = (node = nodes[nLen])[getAttribute](version))
        node[setAttribute]('src', attr)

  } else {

    // if this is the first run of this function then loop though all noscript
    // elements in this document and if they have our version attribute then
    // replace them with a corresponding img element

    nodes = doc[getElementsByTagName]('noscript');
    for(nLen = nodes[length]; nLen--;)
      if(attr = (node = nodes[nLen])[getAttribute](version)) {
        // if this noscript has the version attribute

        // create a corresponding img element that will replace this noscript
        img = doc.createElement('img');
        img[setAttribute]('src', attr); // set src to value of version attr

        // copy all version attributes to the new img element
        // this helps us support resize and orientation change scenerios where
        // this function may be called more that once on a page.
        // Since we only check for existance of the current version
        // attribute above, multiple runs may lead to unexpected results
        // if a noscript tag has one version attribute but doesn't
        // define all possible version attributes.
        // This is acceptable for now, but will revisit this if it breaks
        // a good use case
        for(;versionLen--;)
          if(attr = node[getAttribute](data + versions[versionLen]))
            img[setAttribute](data + versions[versionLen], attr);

        // if data-alt is present, copy it to alt of img
        if(attr = node[getAttribute](data + alt))
          img[setAttribute](alt, attr);

        // replace noscript with img
        node.parentNode.replaceChild(img, node);
      }

    // set flag to show first run is over
    fn.r = 1
  }
}