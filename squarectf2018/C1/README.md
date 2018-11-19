# C1 - dot-n-dash (programming) #

```
The instructions to disable C1 were considered restricted. As a result,
they were stored only in encoded form.

The code to decode the instructions was regrettably lost due to cosmic
radiation. However, the encoder survived.

Can you still decode the instructions to disable C1?
```

The original download for this problem is the [jar file](dot-n-dash.jar) in this
directory, and it's unpacked contents are [here](dot-n-dash.jar).

We're given an html document, which is mostly a base64 encoded font (perhaps a
primer for C8? 😈), and the encoded instructions in a text file. Opening the
page in a web browser is an easy way to get a feel for the encoding, but the
real meat of the problem can be found in the script block at the end of the
file.

I copied just the javascript into a [file](dot-n-dash.js) by itself for further
analysis, and I used node.js to test my solution as I was working on it.

The first thing I did was to make the script into more of a command line utility
so I could easily pass in the instructions file at the end. I added a bit of
quick-n-dirty argument parsing logic at the end of the file, and I used `fs` to
read the input file into a string.

Next, I added some inline documentation to the `_encode` function, so I could
understand how the input is encoded in the first place. The encoder iterates
over the first 8 bits in the utf-16 encoding of every character in the input
(which is convenient for ASCII text only -- "Use UTF-8! Is better!"),
and constructs a corresponding array of integers for every set bit such that
each integer in the array represents the "location" of the bit. The least
significant 3 bits store (most of) the position of the bit in the character, and
the more significant bits store the index of the character the bit belongs to.

```javascript
var a=[];
for (var i=0; i<input.length; i++) {
  // get utf-16 value
  var t = input.charCodeAt(i);
  for (var j=0; j<8; j++) {
    // if the j'th bit is set
    if ((t >> j) & 1) {
      // push combination of i and j
      // least significant 3 bits hold (j + 1) % 7
      // more significant bits hold (input.length - 1 - i) ... + 1 if j == 7
      a.push(1 + j + (input.length - 1 - i) * 8);
    }
  }
}
```

The next step of the `_encode` function does a random permutation of the array,
which is a bit of misdirection, as the position information isn't actually
stored in the order of the array elements anymore.

```javascript
// b = random permutation of a
var b = [];
while (a.length) {
  var t = (Math.random() * a.length)|0;
  b.push(a[t]);
  a = a.slice(0, t).concat(a.slice(t+1));
}
```

The final step of the `_encode` function is to convert each integer into as many
"dashes", and separate each sequence of dashes with a dot.

```javascript
// r is basically '.'.join(['-' * n for n in b])
// can you tell I prefer python?
var r = '';
while (b.length) {
  var t = b.pop();
  r = r + "-".repeat(t) + ".";
}
return r;
```

--------------------------------------------------------------------------------

The `_decode` function first removes the trailing dot, and splits the input by
the "dot" character into an array of dash-only strings, then maps that into an
array of integer lengths of each string. Reverse step three complete!

```javascript
// convert input into an array of strings
// which are sequences of dashes, followed by single dots
d = input.trim();
c = d.substr(0, d.length - 1).split('.');
// b = the number of dashes per sequence
// the order of the sequences doesn't matter,
// because it is randomized in the _encode function
b = c.map(x => x.length);
```

Reversing step two is actually done for us mostly by a strange property of
javascript arrays that I discovered during the course of this problem that bears
repeating here: once you declare an array, you can write stuff to any index
without throwing an exception! In this way, they behave more like python dicts.

Reversing step three takes advantage of that fact to reconstruct the orignial
characters (in reverse order) bit-by-bit. The order has to be reversed due to
the fact that the offset was originally recorded from the _end_ of the string
in the `encode` function, and we don't know how long the original string was!

```javascript
a = [];
for (x in b) {
    y = b[x] - 1;
    j = y & 7;
    // because we don't know the length of the string in advance,
    // this i is actually the offset from the end of the string
    // e.g. 0 = the last character, 1 = second to last character, ...
    i = y >> 3;
    // initalize a[i] to 0
    if (typeof a[i] == 'undefined') a[i] = 0;
    a[i] |= 1 << j;
}
```

Once the bits are all in their correct places, we reverse the array and
convert the codepoints back to text, and reconstruct the string.

```javascript
z = a.reverse()
s = '';
for (i in z) {
    s += String.fromCharCode(z[i]);
}
return s;
```

The whole solution is implemnented [here](dot-n-dash.js) (including too many
console.log calls) and, for the record, the decoded instructions read:

```
Instructions to disable C1:
1. Open the control panel in building INM035.
2. Hit the off switch.

Congrats, you solved C1! The flag is flag-bd38908e375c643d03c6.

```
