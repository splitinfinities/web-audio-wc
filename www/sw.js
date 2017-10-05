importScripts('workbox-sw.prod.v2.0.1.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "build/webaudio.js",
    "revision": "7abac6ccbc75a5863b5005cbebd7a4d9"
  },
  {
    "url": "build/webaudio.registry.json",
    "revision": "7bf53f9c573359de04d7cdf6173c6a9c"
  },
  {
    "url": "build/webaudio/d6svxpuv.js",
    "revision": "16f2d4fcd3cd4dcbe5bb3cd5c212d3c5"
  },
  {
    "url": "build/webaudio/offppbtc.css",
    "revision": "eb3e5e27d6bef495a85e7974e14bb897"
  },
  {
    "url": "build/webaudio/webaudio.kmhw2lpz.pf.js",
    "revision": "02527ca97f60cf825b54ab41b9a5c68a"
  },
  {
    "url": "build/webaudio/webaudio.xj53vhpg.js",
    "revision": "f742128adb1df18ccee87356a7616848"
  },
  {
    "url": "index.html",
    "revision": "ed13f6c50c31a516f4dbf11902b0d586"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
