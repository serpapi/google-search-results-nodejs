root=$(shell pwd)
pkg=$(shell ls *.tgz | head -1)

all: test

.PHONY: test oobt

package:
	npm pack

oobt:
	rm -rf /oobt/tmp
	cp -R oobt /tmp
	cd /tmp/oobt ; \
		npm install --save ${root}/${pkg}
	cd /tmp/oobt ; \
		npm run-script run

test:
	npm test

autotest:
	npm run test -- --watch

release: test
	npm publish