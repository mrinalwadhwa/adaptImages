NAME=$(shell node -pe "JSON.parse(require('fs').readFileSync('./package.json')).name")
VERSION=$(shell node -pe "JSON.parse(require('fs').readFileSync('./package.json')).version")

all: node_modules $(NAME)-$(VERSION).js $(NAME)-$(VERSION).min.js

$(NAME)-$(VERSION).js: node_modules
	node_modules/.bin/jshint src/$(NAME).js
	cp src/$(NAME).js $(NAME)-$(VERSION).js

$(NAME)-$(VERSION).min.js: node_modules $(NAME)-$(VERSION).js
	node_modules/.bin/uglifyjs src/$(NAME).js > $(NAME)-$(VERSION).min.js

node_modules:
	npm install

clean:
	rm -rf $(NAME)-*.js $(NAME)-*.min.js

veryclean: clean
	rm -rf node_modules