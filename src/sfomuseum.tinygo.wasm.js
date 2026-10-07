var sfomuseum = sfomuseum || {};
sfomuseum.tinygo = sfomuseum.tinygo || {};

sfomuseum.tinygo.wasm = (function(){

    var self = {

        fetch: function(wasm_uri){
            
            return new Promise((resolve, reject) => {
                
                if (! WebAssembly.instantiateStreaming){
                    WebAssembly.instantiateStreaming = async (resp, importObject) => {
                        const response = await resp;
                        const source = await response.arrayBuffer();
                        return await WebAssembly.instantiate(source, importObject);
                    };
                }
                
                // Initialize the TinyGo webassembly wrapper
                const export_go = new Go();
                const importObject = export_go.importObject || {};
                
                let export_mod, export_inst;    

                // See this, with the headers? This is important if we're running in
                // a AWS Lambda + API Gateway context. Without this API Gateway will
                // return the WASM binary as a base64-encoded blob. Note that this
                // also depends on configuring both the API Gateway and the 'lambda://'
                // server URI to specify that 'application/wasm' is treated as binary
                // data. Computers, amirite...
                    
                var fetch_headers = new Headers();
                fetch_headers.set("Accept", "application/wasm");
                
                const fetch_opts = {
                    headers: fetch_headers,
                };

                console.debug("fetch wasm binary", wasm_uri);
                
                WebAssembly.instantiateStreaming(fetch(wasm_uri, fetch_opts), importObject).then(
                    
                    async result => {

                        console.debug("retrieved wasm binary", wasm_uri);            
                        
                        export_mod = result.module;
                        export_inst = result.instance;
                        
                        // TinyGo's run is synchronous and boots the internal runtime immediately.
                        // We run it, and then instantly resolve the promise so the frontend 
                        // knows Go/TinyGo functions are officially exported to the global scope.

                        export_go.run(export_inst);
                        resolve();
                    }
		    
                ).catch(err => {
                    console.error("WASM Instantiation failed:", err);
                    reject(err);
                });
                
            });
        },
    };

    return self;
})();
