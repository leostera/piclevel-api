MODULES=$(ls -1 ./lib)
DO=for d in $(MODULES); do echo "cd ./lib/; npm i; cd ../..;"; done;

all: npm

npm: $(MODULES)

$(MODULES):
	cd ./lib/$(MODULES)
	npm i
	cd ../..

