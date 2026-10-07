GOROOT=$(shell go env GOROOT)

# This is not set automatically
TINY_GOROOT=$(shell go env TINYGO_ROOT)

# https://github.com/tdewolff/minify
MINIFY=minify

exec:
	@make wasm_exec

wasm_exec:
	cp "$(GOROOT)/lib/wasm/wasm_exec.js" lib/wasm_exec.js

tinygo_exec:
	cp "$(TINY_GOROOT)/targets/wasm_exec.js" lib/tinygo/wasm_exec.js

dist-all:
	@make dist-js
	@make dist-js-tinygo

dist-js:
	$(MINIFY) --bundle \
	--output dist/sfomuseum.golang.wasm.bundle.js \
	lib/wasm_exec.js \
	src/sfomuseum.golang.wasm.js

dist-js-tinygo:
	$(MINIFY) --bundle \
	--output dist/sfomuseum.tinygo.wasm.bundle.js \
	lib/tinygo/wasm_exec.js \
	src/sfomuseum.tinygo.wasm.js
