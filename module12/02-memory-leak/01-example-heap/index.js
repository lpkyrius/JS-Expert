const items = []

// simulating a memory leak
while(true) items.push(items)

// let's limit node memory to 64Mb
// node --max-old-space-size=64 index.js

//  Result

// <--- Last few GCs --->

// [76529:0x160008000]      206 ms: Mark-Compact 86.2 (118.7) -> 52.7 (85.1) MB, 23.75 / 0.00 ms  (average mu = 0.560, current mu = 0.380) allocation failure; scavenge might not succeed
// [76529:0x160008000]      279 ms: Mark-Compact 128.2 (160.7) -> 77.8 (110.3) MB, 35.04 / 0.00 ms  (average mu = 0.534, current mu = 0.518) allocation failure; scavenge might not succeed


// <--- JS stacktrace --->

// FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
// ----- Native stack trace -----

//  1: 0x1023e8ff8 node::OOMErrorHandler(char const*, v8::OOMDetails const&) [/opt/homebrew/Cellar/node/21.7.1/bin/node]
//  2: 0x102568588 v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, v8::OOMDetails const&) [/opt/homebrew/Cellar/node/21.7.1/bin/node]
//  3: 0x102568538 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, v8::OOMDetails const&) [/opt/homebrew/Cellar/node/21.7.1/bin/node]
//  4: 0x10270db64 v8:: ...