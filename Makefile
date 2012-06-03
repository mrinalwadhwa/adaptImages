NAME=$(shell node -pe "JSON.parse(require('fs').readFileSync('package.json')).name")

JSHINT = node_modules/.bin/jshint
UGLIFY = node_modules/.bin/uglifyjs


all: clean node_modules $(NAME).js $(NAME).min.js tests

$(NAME).js: node_modules
	$(JSHINT) src/$(NAME).js
	cp src/$(NAME).js $(NAME).js

$(NAME).min.js: node_modules $(NAME).js
	$(UGLIFY) src/$(NAME).js > $(NAME).min.js

tests:
	npm test

node_modules:
	npm install

clean:
	rm -rf $(NAME).js $(NAME).min.js

veryclean: clean
	rm -rf node_modules

.PHONY: all tests clean veryclean