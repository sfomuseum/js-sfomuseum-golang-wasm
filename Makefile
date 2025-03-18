GOROOT=$(shell go env GOROOT)

# https://github.com/tdewolff/minify
MINIFY=minify

wasmexec:
	cp "$(GOROOT)/lib/wasm/wasm_exec.js" lib/wasm_exec.js

dist-js:
	$(MINIFY) --bundle \
	--output dist/sfomuseum.golang.wasm.bundle.js \
	lib/wasm_exec.js \
	src/sfomuseum.golang.wasm.js
