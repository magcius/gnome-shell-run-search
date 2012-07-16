
UUID=run-dialog-search@mecheye.net

all: $(UUID).shell-extension.zip

$(UUID).shell-extension.zip: extension.js metadata.json
	zip $@ $^
