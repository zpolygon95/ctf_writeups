var fs = require('fs');

function _encode(input) {
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
        console.log('i,j,input[i],a[n] = ' + i + ',' + j + ',' + input[i] + ',' + a[a.length-1])
      }
    }
  }

  // b = random permutation of a
  var b = [];
  while (a.length) {
    var t = (Math.random() * a.length)|0;
    b.push(a[t]);
    a = a.slice(0, t).concat(a.slice(t+1));
  }

  // r is basically '.'.join(['-' * n for n in b])
  // can you tell I prefer python?
  var r = '';
  while (b.length) {
    var t = b.pop();
    r = r + "-".repeat(t) + ".";
  }
  return r;
}

function _decode(input) {
    console.log(input);
    // convert input into an array of strings
    // which are sequences of dashes, followed by single dots
    d = input.trim();
    c = d.substr(0, d.length - 1).split('.');
    console.log(c);
    // b = the number of dashes per sequence
    // the order of the sequences doesn't matter,
    // because it is randomized in the _encode function
    b = c.map(x => x.length);
    console.log(b);
    // javascript arrays have a strange property, that once you declare one,
    // you can write stuff to any index without throwing an exception!
    // how convenient!
    a = [];
    for (x in b) {
        y = b[x] - 1;
        j = y & 7;
        // because we don't know the length of the string in advance,
        // this i is actually the offset from the end of the string
        // e.g. 0 = the last character, 1 = second to last character, ...
        i = y >> 3;
        console.log(y + '=(' + i + ',' + j + ')');
        // initalize a[i] to 0
        if (typeof a[i] == 'undefined') a[i] = 0;
        a[i] |= 1 << j;
    }
    z = a.reverse()
    s = '';
    for (i in z) {
        s += String.fromCharCode(z[i]);
    }
    return s;
}

var data = fs.readFileSync(process.argv[3], 'utf8');
if (process.argv[2] == 'e')
    console.log(_encode(data));
else if (process.argv[2] == 'b')
    console.log(_decode(_encode(data)));
else
    console.log(_decode(data));
