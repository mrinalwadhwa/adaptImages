function adaptImages(version){
  var
    doc = document,
    getElementsByTagName = 'getElementsByTagName',
    getAttribute = 'getAttribute',
    setAttribute = 'setAttribute',
    length = 'length',
    data = 'data-',
    alt = 'alt',
    nodes = doc[getElementsByTagName]('img'),
    versions = ['l','s'],
    node,
    img,
    i,
    j;
  
  version = data + version;
  a = doc.body[getAttribute](data + 'img-versions');
  versions = a ? a.split(' ') : versions;
  
  for(i = nodes[length]; i--;) {
    node = nodes[i];
    if(a = node[getAttribute](version))
      node[setAttribute]('src', a);    
  }
  
  for(
    nodes = doc[getElementsByTagName]('noscript'), i = nodes[length];
    i--;
  ) {
    node = nodes[i];
    if(a = node[getAttribute](version)) {
      img = doc.createElement('img');
      img[setAttribute]('src', a);
      
      for(j = versions[length]; j--;)
        if(a = node[getAttribute](data + versions[j]))
          img[setAttribute](data + versions[j], a);
      
      if(a = node[getAttribute](data + alt))
        img[setAttribute](alt, a);
      
      node.parentNode.replaceChild(img, node);
    }
  }
}