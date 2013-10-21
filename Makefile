MODULES=pictures users utils

all: npm

npm: $(MODULES)

$(MODULES):
	cd ./lib/$(MODULES)
	npm i
	cd ../..

