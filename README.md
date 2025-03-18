# js-sfomuseum-golang-wasm

Opionated JavaScript package for loading and executing Golang WASM binaries.

## Motivation

This package really doesn't do very much. It just wraps most of the standard boiler plate for invoking Go-based WASM binaries in a JavaScript `Promise`. That's it.

## Build

```
$> make dist-js
minify --bundle \
	--output dist/sfomuseum.golang.wasm.bundle.js \
	lib/wasm_exec.js \
	src/sfomuseum.golang.wasm.js
(856.292µs,  19 kB, 8.8 kB,  47.2%,  22 MB/s) - (lib/wasm_exec.js + src/sfomuseum.golang.wasm.js) to dist/sfomuseum.golang.wasm.bundle.js
```

## Example

In your HTML:

```
<script src="javascript/sfomuseum.golang.wasm.bundle.js"></script>
```

And then in your JavaScript:

```
sfomuseum.golang.wasm.fetch("wasm/update_exif.wasm").then((rsp) => {
	// do something here
}).catch((err) => {
	console.error("Failed to load update exif binary", err);
        return;
});
```

## See also

* https://go.dev/wiki/WebAssembly#javascript-goosjs-port