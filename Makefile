GOROOT=$(shell go env GOROOT)

wasmexec:
	cp "$(GOROOT)/lib/wasm/wasm_exec.js" lib/wasm_exec.js
