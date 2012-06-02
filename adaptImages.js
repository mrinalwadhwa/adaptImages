function adaptImages(size, sizes) {
  var
    _doc = document,
    _getElementsByTagName = 'getElementsByTagName',
    _getAttribute = 'getAttribute',
    _setAttribute = 'setAttribute',
    _nodes = _doc[_getElementsByTagName]('img'),
    _length = 'length',
    _data = 'data-',
    _alt = 'alt',
    _node,
    _img,
    _i,
    _j;
  
  size = _data + size;
  sizes = sizes || ['l','m','s'];
  
  for(_i = _nodes[_length]; _i--, _node = _nodes[_i];)
    if(a = _node[_getAttribute](size))
      _node[_setAttribute]('src', a);
  
  for(_nodes = _doc[_getElementsByTagName]('noscript'), _i = _nodes[_length]; _i--, _node = _nodes[_i];)
    if(a = _node[_getAttribute](size)) {
      _img = _doc.createElement('img');
      _img[_setAttribute]('src', a);
      
      for(_j = sizes[_length]; _j--;)
        if(a = _node[_getAttribute](_data + sizes[_j]))
          _img[_setAttribute](_data + sizes[_j], a);
      
      if(a = _node[_getAttribute](_data + _alt))
        _img[_setAttribute](_alt, a);
      
      _node.parentNode.replaceChild(_img, _node);
    }
}