function adaptImages(size){
  var
    _doc = document,
    _getElementsByTagName = 'getElementsByTagName',
    _getAttribute = 'getAttribute',
    _setAttribute = 'setAttribute',
    _length = 'length',
    _data = 'data-',
    _alt = 'alt',
    _nodes = _doc[_getElementsByTagName]('img'),
    _sizes = ['l','m','s'],
    _node,
    _img,
    _i,
    _j;
  
  size = _data + size;
  a = _doc.body[_getAttribute](_data + 'img-sizes');
  _sizes = a ? a.split(' ') : _sizes;
  
  for(_i = _nodes[_length]; _i--;) {
    _node = _nodes[_i];
    if(a = _node[_getAttribute](size))
      _node[_setAttribute]('src', a);    
  }
  
  for(
    _nodes = _doc[_getElementsByTagName]('noscript'), _i = _nodes[_length];
    _i--;
  ) {
    _node = _nodes[_i];
    if(a = _node[_getAttribute](size)) {
      _img = _doc.createElement('img');
      _img[_setAttribute]('src', a);
      
      for(_j = _sizes[_length]; _j--;)
        if(a = _node[_getAttribute](_data + _sizes[_j]))
          _img[_setAttribute](_data + _sizes[_j], a);
      
      if(a = _node[_getAttribute](_data + _alt))
        _img[_setAttribute](_alt, a);
      
      _node.parentNode.replaceChild(_img, _node);
    }
  }
}