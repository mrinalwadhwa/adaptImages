function adaptImages(version){
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
    
    // if the argument recieved is 'l', attribute we'll look for is 'data-l'
    version = data + version,
    
    // first set of nodes we'll loop throght are all images on this page
    nodes = doc[getElementsByTagName]('img'),
    // save length for later use in loops
    nodesLen = nodes[length],
    node,
    img;
  
  // loop though all img elements in this document
  for(;nodesLen--, node = nodes[nodesLen];)
    if(attr = node[getAttribute](version)) // if an img has version attribute
      node[setAttribute]('src', attr); // set src to value of version attribute
  
  // loop though all noscript elements in this document
  for(
    nodes = doc[getElementsByTagName]('noscript'), nodesLen = nodes[length];
    nodesLen--, node = nodes[nodesLen];
  ) if(attr = node[getAttribute](version)) { 
      // if this noscript has the version attribute
      
      // create a corresponding img elment that will replace this noscript
      img = doc.createElement('img');
      img[setAttribute]('src', attr); // set src to value of version attribute
      
      // copy all possible version attributes to the new img element
      for(;versionLen--;)
        if(attr = node[getAttribute](data + versions[versionLen]))
          img[setAttribute](data + versions[versionLen], attr);
      
      // if data-alt is present, copy it to alt of img
      if(attr = node[getAttribute](data + alt))
        img[setAttribute](alt, attr);
      
      // replace noscript with img
      node.parentNode.replaceChild(img, node);
    }
}