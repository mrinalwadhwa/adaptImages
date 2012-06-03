function adaptImages(size){
  var
    doc = document,
    getElementsByTagName = 'getElementsByTagName',
    getAttribute = 'getAttribute',
    setAttribute = 'setAttribute',
    length = 'length',
    data = 'data-',
    alt = 'alt',
    nodes = doc[getElementsByTagName]('img'),
    sizes = ['l','m','s'],
    node,
    img,
    i,
    j;
  
  size = data + size;
  a = doc.body[getAttribute](data + 'img-sizes');
  sizes = a ? a.split(' ') : sizes;
  
  for(i = nodes[length]; i--;) {
    node = nodes[i];
    if(a = node[getAttribute](size))
      node[setAttribute]('src', a);    
  }
  
  for(
    nodes = doc[getElementsByTagName]('noscript'), i = nodes[length];
    i--;
  ) {
    node = nodes[i];
    if(a = node[getAttribute](size)) {
      img = doc.createElement('img');
      img[setAttribute]('src', a);
      
      for(j = sizes[length]; j--;)
        if(a = node[getAttribute](data + sizes[j]))
          img[setAttribute](data + sizes[j], a);
      
      if(a = node[getAttribute](data + alt))
        img[setAttribute](alt, a);
      
      node.parentNode.replaceChild(img, node);
    }
  }
}