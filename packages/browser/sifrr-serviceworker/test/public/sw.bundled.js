!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.SW=t()}(this,function(){"use strict";var e;"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;return new(function(e,t){e.exports=class{constructor(e){this.options=Object.assign({version:1,fallbackCacheName:"fallbacks",defaultCacheName:"default",policies:{},fallbacks:{},precache_urls:[]},e),this.options.policies.default=Object.assign(this.options.policies.default||{},{policy:"NETWORK_FIRST",cacheName:this.options.defaultCacheName}),this.options.fallbacks.default=this.options.fallbacks.default||"/offline.html"}precache(e=this.options.precache_urls,t=this.options.fallbacks){const s=this;let o=[];e.forEach(e=>{let t=s.requestFromURL(e);return o.push(s.responseFromNetwork(t,s.findRegex(e,s.options.policies).cacheName||s.options.defaultCacheName))});for(let e of Object.values(t)){let t=this.requestFromURL(e);o.push(this.responseFromNetwork(t,this.options.fallbackCacheName))}return Promise.all(o)}setup(){let e=this;self.addEventListener("install",t=>{self.skipWaiting(),t.waitUntil(e.precache())}),self.addEventListener("activate",()=>{const t="-v"+e.options.version;caches.keys().then(e=>e.filter(e=>e.indexOf(t)<0)).then(e=>Promise.all(e.map(e=>caches.delete(e)))).then(()=>self.clients.claim())}),self.addEventListener("fetch",t=>{const s=t.request,o=s.clone(),n=s.clone();"GET"===s.method&&t.respondWith(e.respondWithPolicy(s).then(t=>{if(!t.ok&&t.status>0&&e.findRegex(n.url,e.options.fallbacks))throw Error("response status "+t.status);return t}).catch(()=>e.respondWithFallback(o)))})}respondWithFallback(e){const t=this.requestFromURL(this.findRegex(e.url,this.options.fallbacks));return this.responseFromCache(t,this.options.fallbackCacheName)}respondWithPolicy(e){const t=e.clone(),s=this.findRegex(e.url,this.options.policies),o=s.policy||"NETWORK_FIRST",n=s.cacheName||this.options.defaultCacheName;let a;switch(o){case"NETWORK_ONLY":a=this.responseFromNetwork(t,n,!1);break;case"CACHE_ONLY":a=this.responseFromCache(t,n).catch(()=>this.responseFromNetwork(e,n));break;case"NETWORK_FIRST":default:a=this.responseFromNetwork(t,n).catch(()=>this.responseFromCache(e,n))}return a}responseFromNetwork(e,t,s=!0){return caches.open(t+"-v"+this.options.version).then(t=>fetch(e).then(o=>(s&&t.put(e,o.clone()),o)))}responseFromCache(e,t){return caches.open(t+"-v"+this.options.version).then(t=>t.match(e)).then(t=>{if(t)return t;throw"Cache not found for "+e.url})}requestFromURL(e,t="GET"){return new Request(e,{method:t})}findRegex(e,t){for(let[s,o]of Object.entries(t)){const t=new RegExp(s);if(t.test(e))return o}return t.default}}}(e={exports:{}},e.exports),e.exports)({version:1,fallbackCacheName:"ffff",defaultCacheName:"dddd",policies:{cachefirst:{policy:"CACHE_FIRST"},networkfirst:{policy:"NETWORK_FIRST",cacheName:"bangbang"},networkonly:{policy:"NETWORK_ONLY"},cacheonly:{policy:"CACHE_ONLY",cacheName:"bangbang2"}},fallbacks:{default:"/404.html"},precache_urls:["/precache.js","./cacheonly.js"]}).setup()});
//# sourceMappingURL=sw.bundled.js.map
