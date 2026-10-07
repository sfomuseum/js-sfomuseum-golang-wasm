# js-sfomuseum-golang-wasm

Opionated JavaScript package for loading and executing Golang WASM binaries.

## Motivation

This package really doesn't do very much. It just wraps most of the standard boiler plate for invoking Go-based WASM binaries in a JavaScript `Promise`. That's it.

## Build

```
$> make dist-all

minify --bundle \
	--output dist/sfomuseum.golang.wasm.bundle.js \
	lib/wasm_exec.js \
	src/sfomuseum.golang.wasm.js
(1.490417ms,  20 kB, 8.9 kB,  44.9%,  13 MB/s) - (lib/wasm_exec.js + src/sfomuseum.golang.wasm.js) to dist/sfomuseum.golang.wasm.bundle.js

minify --bundle \
	--output dist/sfomuseum.tinygo.wasm.bundle.js \
	lib/tinygo/wasm_exec.js \
	src/sfomuseum.tinygo.wasm.js
(549.292µs,  20 kB, 7.6 kB,  38.1%,  36 MB/s) - (lib/tinygo/wasm_exec.js + src/sfomuseum.tinygo.wasm.js) to dist/sfomuseum.tinygo.wasm.bundle.js
```

_Where `minify` is [tdewolff/minify](https://github.com/tdewolff/minify)._

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

## TinyGo

To use WASM binaries compiled using [TinyGo](https://tinygo.org) it's basically the same thing, replacing `golang` with `tinygo`. In your HTML:

```
<script src="javascript/sfomuseum.tinygo.wasm.bundle.js"></script>
```

And then in your JavaScript:

```
sfomuseum.tinygo.wasm.fetch("wasm/update_exif.wasm").then((rsp) => {
	// do something here
}).catch((err) => {
	console.error("Failed to load update exif binary", err);
        return;
});
```

## See also

* https://go.dev/wiki/WebAssembly#javascript-goosjs-port
* https://tinygo.org/docs/guides/webassembly/wasm/