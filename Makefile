all: test

.PHONY: test

install:
	npm install

test:
	npm test

autotest:
	npm run test -- --watch

release: test
	npm publish