var
  jsdom = require('jsdom'),
  document = jsdom.jsdom('<html><head></head><body></body></html>'),
  window = document.createWindow(),
  
  sink = require('sink-test'),
  start = sink.start,
  sink = sink.sink,
  
  readFileSync = require('fs').readFileSync;

eval(readFileSync('adaptImages.min.js').toString());
eval(readFileSync('tests/test_adaptImages.js').toString());