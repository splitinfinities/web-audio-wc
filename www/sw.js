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
    "revision": "f7ba92dd4d739664d0e3975f6d8c920a"
  },
  {
    "url": "build/webaudio.registry.json",
    "revision": "96761756dc73ef9fdaa379f093fb651e"
  },
  {
    "url": "build/webaudio/p7zogrot.css",
    "revision": "0619bcd216c125b0b62885b2f3965262"
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
    "url": "build/webaudio/ybbwgiv2.js",
    "revision": "d096fab92762efa5a9ffa967fa5ffd9d"
  },
  {
    "url": "index.html",
    "revision": "83bbf45df11036e84bc715905fd48f9f"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
