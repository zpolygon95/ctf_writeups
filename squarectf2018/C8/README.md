# C8 - captcha (math) #

```
Charvises (the native species which lived on Charvis 8HD before the
first settlers arrived) were very good at math. In a surprising
symbiosis relationship between humans and Charvises, it was agreed that
the Charvises would be responsible for C8.

Can you pass their CAPTCHA (Completely Automated Public Turing Test to
tell Charvises and Humans Apart)?
```

Let me say, first, that this problem was fascinating to me. Once I started
working on it, I couldn't stop thinking about it until I solved it -- and I
fully acknowledge that I was a bit out of my depth with this one!

The problem contained a link to a page with a long arithmatic problem, and a
text box. Refreshing the page a couple of times showed that the problem changed
every couple of seconds or so.

My first approach was to try pasting the challenge text into my python
interpreter, and was quickly foiled by the fact that the actual text of the
problem was composed of seemingly random characters instead of the numbers and
symbols they appeared to be!

My next approach was to try and solve the problem at human speed, just to see
what happened. My strategy was to get the challenge text into a string, then
build the translation character by character. The eventual result of this
was the [translate.py] script, which prompts the user to input the challenge
text, and then prompts again for every unknown symbol -- displaying all of the
translatable text up to that point for reference. Once it can translate the
entire string, it evaluates it to get the answer.

I could have sworn there was a "unique" built-in in python and, to my shame, I
ended up with a not very "pythonic" for loop. I always forget about `set()`!

Once I solved the problem, the next page told me that I was correct, but (as I
had feared) that I had been too slow!

--------------------------------------------------------------------------------

The next step was to figure out how they were displaying one character, but
encoding another. Looking at the source, I got the impression that it had
something to do with the base64 encoded blob in the style element.

```scss
@font-face{
    font-family: DigitalRightsDoneRight;
    src:url('data:application/font-ttf;charset=utf-8;base64,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');
}
```

Refreshing the page a couple of times and comparing the sources showed that blob
changed every time the challenge text changed, so there would probably be no way
to create a map based on previously received information.

Continuing the recon, I pasted the whole base64 blob into
[a text file](font.txt), then attempted to decode and analyze it:

```bash
$ base64 -d font.txt | file -
# /dev/stdin: TrueType Font data, 11 tables, 1st "GSUB", 16 names, Macintosh, type 1 string, DigitalRightsDoneRightRegularDigitalRightsDoneRightDigitalRightsDoneRightVersion 1.0DigitalRigh
```

Which was my que to start reading about TrueType fonts. I ended up getting most
of my information from the [Microsoft OpenType specification][1], but didn't
come across that site until I had wasted a sufficient amount of time on the
Apple TrueType documentation, and various blogs that promised to "take an
in-depth look at the TrueType font file format".

Really, the Microsoft documentation wasn't that good either, but that might just
be due to the fact that the file format itself is so wonky. In summary, TrueType
Font files are composed of many nested and cross-referenced tables. The ones we
care about for this problem are the ones responsible for storing the actual
"contour" information for each glyph, and the ones responsible for mapping those
contours to the actual encoded characters we want to display (or, in our case,
decode).

Before we can parse all those tables, we have to get the data. I did this using
the inimitable python [requests module][2]. Here's the code I used to request
the challenge, and submit some bogus response (the site isn't running anymore,
as the contest has ended. However, Square publishes a Docker container that
will run this challenge for you locally):

```python
import re
import requests

def get_answer(data):
    token = re.search(r'"token" value="(\d+)"', data).group(1)
    return {'token': token, 'answer': 1234}

URL = 'https://hidden-island-93990.squarectf.com/ea6c95c6d0ff24545cad'
r1 = requests.get(URL)
r2 = requests.post(URL, data=get_answer(r1.text))
print(r2.text)
```

Currently, all the `get_answer` function does is parse out the token for the
problem, which is a hidden field in the form submission. I'm doing all the HTML
parsing with quick-n-dirty regular expressions, which
[isn't generally a good idea][3], but is sufficient for our purposes in this
problem.

If we point this code at a server running this challenge, we will almost always
(unless we're incredibly lucky and the correct answer is 1234) get a rejection
message. But we're _far_ from done. Let's sketch out everything we'll need for
parsing out the correct answer:

```python
def get_mapping(font):
    # TODO
    pass

def eval_answer(problem, mapping):
    # TODO
    pass

def get_answer(data):
    font = re.search(r'base64,(.+)\'', data).group(1)
    token = re.search(r'"token" value="(\d+)"', data).group(1)
    problem = re.search(r'<p>(.+)</p>', data).group(1)
    answer = eval_answer(problem, get_mapping(font))
    return {'token': token, 'answer': answer}
```

The regular expressions absolutely will not work in general cases. Especially
the one that parses `problem`. But the document we're parsing for this problem
is simple enough that we shouldn't run into any problems. `eval_answer` is easy:
we already wrote that in the previous attempt.

```python
def eval_answer(problem, mapping):
    translation = ''.join([mapping[x] for x in problem])
    print(translation)
    return eval(translation)
```

Now we've reduced the problem to "given a TrueType font, map glyphs to the
characters they represent". Easy, right‽

First thing's first: convert base64 data to bytes. Python modules to the rescue!

```python
import base64

def get_mapping(font):
    raw = base64.b64decode(font)
    # TODO
```

Now that we have the raw data to parse, we can apply what we learned reading the
OpenType documents. The first 12 bytes of the file is a special `offset` table
that indicates how many tables there are. This is followed immediately by a
table of fixed-width records for each table in the rest of the document. Each of
these records contain information about the name, offset, and size of the table
it represents. Do you think maybe there should be more tables?

```python
def parse_ttf_tables(data):
    tables = {
        'offset': {
            'type': int.from_bytes(data[:4], 'big'),
            'numTables': int.from_bytes(data[4:6], 'big'),
            'searchRange': int.from_bytes(data[6:8], 'big'),
            'entrySelector': int.from_bytes(data[8:10], 'big'),
            'rangeShift': int.from_bytes(data[10:12], 'big')
        }
    }
    for i in range(tables['offset']['numTables']):
        j = 12 + (i * 16)
        cs = int.from_bytes(data[j + 4:j + 8], 'big')
        ofs = int.from_bytes(data[j + 8:j + 12], 'big')
        length = int.from_bytes(data[j + 12:j + 16], 'big')
        tables[data[j:j + 4].decode('ascii')] = {
            'checkSum': cs,
            'offset': ofs,
            'length': length,
            'data': data[ofs:ofs + length]
        }
    return tables
```

I've tried to use as much of the official terminology as possible in the dict
keys and variable names, so that it's obvious what's being parsed from where.
This function's primary purpose is to map the raw data for each table in the
file by name.

Now the tables we really care about are called `glyf` and `cmap`. Unfortunately,
`glyf` depends on a table called `loca`, and `loca` depends on a couple of
tables called `head` and `maxp`.

`head` is basically just a table of named integers, and is easy enough to parse.

```python
def parse_head(data):
    return {
        'majorVersion': int.from_bytes(data[0:2], 'big'),
        'minorVersion': int.from_bytes(data[2:4], 'big'),
        'fontRevision': data[4:8],
        'checkSumAdjustment': int.from_bytes(data[8:12], 'big'),
        'magicNumber': int.from_bytes(data[12:16], 'big'),
        'flags': int.from_bytes(data[16:18], 'big'),
        'unitsPerEm': int.from_bytes(data[18:20], 'big'),
        'created': int.from_bytes(data[20:28], 'big', signed=True),
        'modified': int.from_bytes(data[28:36], 'big', signed=True),
        'xMin': int.from_bytes(data[36:38], 'big', signed=True),
        'yMin': int.from_bytes(data[38:40], 'big', signed=True),
        'xMax': int.from_bytes(data[40:42], 'big', signed=True),
        'yMax': int.from_bytes(data[42:44], 'big', signed=True),
        'macStyle': int.from_bytes(data[44:46], 'big'),
        'lowestRecPPEM': int.from_bytes(data[46:48], 'big'),
        'fontDirectionHint': int.from_bytes(data[48:50], 'big', signed=True),
        'indexToLocFormat': int.from_bytes(data[50:52], 'big', signed=True),
        'glyphDataFormat': int.from_bytes(data[52:54], 'big', signed=True),
    }
```

`maxp` is essentially the same, except that there are a couple of different
versions. As [Dave Jones][4] would say, I may have gilded the lily with some of
this, but at the time I really didn't know what would or wouldn't be important.

```python
def parse_maxp(data):
    version = data[0:4]
    if version == b'\x00\x00\x50\x00':
        # Version 0.5
        return {
            'version': version,
            'numGlyphs': int.from_bytes(data[4:6], 'big'),
        }
    else:
        # Version 1.0
        return {
            'version': version,
            'numGlyphs': int.from_bytes(data[4:6], 'big'),
            'maxPoints': int.from_bytes(data[6:8], 'big'),
            'maxContours': int.from_bytes(data[8:10], 'big'),
            'maxCompositePoints': int.from_bytes(data[10:12], 'big'),
            'maxCompositeContours': int.from_bytes(data[12:14], 'big'),
            'maxZones': int.from_bytes(data[14:16], 'big'),
            'maxTwilightPoints': int.from_bytes(data[16:18], 'big'),
            'maxStorage': int.from_bytes(data[18:20], 'big'),
            'maxFunctionDefs': int.from_bytes(data[20:22], 'big'),
            'maxInstructionDefs': int.from_bytes(data[22:24], 'big'),
            'maxStackElements': int.from_bytes(data[24:26], 'big'),
            'maxSizeOfInstructions': int.from_bytes(data[26:28], 'big'),
            'maxComponentElements': int.from_bytes(data[28:30], 'big'),
            'maxComponentDepth': int.from_bytes(data[30:32], 'big'),
        }
```

As it turned out, the maximum number of "twilight points" didn't factor in to
the final solution. Live and learn! Now that we've parsed the dependencies for
`loca`, we can parse `loca` itself. We really only needed the number of glyphs
from `maxp`, and the size of the records in `loca` from `head`.

```python
def parse_loca(data, head, maxp):
    size = 2 if head['indexToLocFormat'] == 0 else 4
    n = maxp['numGlyphs'] + 1
    return [
        int.from_bytes(data[i * size:(i + 1) * size], 'big') * 2
        for i in range(n)
    ]
```

This function gave me quite a bit of trouble, because for some reason the
designers of this format decided to require a bit of a fudge factor for a couple
of these values! Notice the `+ 1` at the end of the assignment to `n`, and the
`* 2` at the end of the expression in the list comprehension.

Now that we've parsed `loca`, we should be able to parse `glyf`. Well, this is
sort of where I gave up. As it turns out, there's a whole glyph contour
description language, and I was running out of time to finish this problem. So,
I decided to be lazy. Once I was able to get the chunk of data corresponding to
each glyph description, I simply stuck those into the keys of a dict, and
guessed at the correct translation.

```python
knownglyphs = {
    b'': 0,
    b'\x00\x01\x00\x00\x00\x00\x02$\x02\xac\x007\x00\x00\x01\x16\x15\x14\x0e\x01# 542\x15\x1432>\x0154&#"5463254.\x01"\x0e\x01\x15\x14\x16\x15\x14\x06#"\'&54>\x0132\x1e\x01\x14\x06\x07\x16\x02\x08\x1c4gH\xfe\xe7L\xc53I%LT\x1f\r\x11\x90\x1f9K@&\x06\x13\x12\x1b\t\t9b:6_92+2\x01%.;,V8\xf8*#\xbf"6\x1fEF\x1e\x11\x12s\x1d6" 9$\x06\x1c\x07\x0c\x0f\x14\x1a\x1c3T//RfM\x12\x14': '3',
    b'\x00\x01\x00\x00\xff\x80\x01"\x02\xeb\x00\x1c\x00\x00\x17&546?\x01>\x0154.\x01\'&5462\x16\x17\x1e\x01\x15\x14\x06\x07\x06"=\x0b\x0c\t\rFD.=)\x13\x14\x15\t\x06U^cV\n\x18w\x08\x0e\x0b\x0f\x06\n8\xc7sb\x8eU)\x13\x11\x0c\x12\x02\x06J\xdf\x7f\x87\xf49\x07\x00': ')',
    b'\x00\x01\x00\x00\x00\x00\x017\x02\xa1\x00\x1a\x00\x00%\x14\x06#"5\x11\x06\x07\x0e\x01#"&54676?\x01>\x0132\x16\x15\x017\x14\x13#6)\x03\r\x06\x10\x13\x08\x06$\x1b8\x07\x18\x0c\x15\x1c#\x0f\x12!\x02\x14F/\x03\x04\x10\x0e\x06\x10\x07*#I\x0b\n\x17\x14\x00\x00\x00': '1',
    b'\x00\x02\x00\x00\x00\x00\x021\x02\xb1\x00!\x000\x00\x00\x01\x1e\x01\x15\x14\x0e\x01#".\x015462\x16\x15\x14\x163267\x0e\x01#"&54>\x0132\x13>\x0154.\x01#"\x0e\x01\x15\x1432\x01\xb6<?=yVNs=\x14 \x15_S`h\x05\x18o@p~<kDT\x01\'/-N03I$\xa3+\x02\x8b&\x89\\q\xad`4[9\x10\x15\x13\x11<M\xa3\x908<ql;a7\xfe\x9f\x12F/,G(+E%\xa0\x00\x00\x00': '9',
    b'\x00\x01\x00\x00\x00\x00\x01\xf1\x02\xc0\x00/\x00\x00%\x16\x14\x06#"\'&#"\x07"&7>\x017654&#"\x0e\x01\x15\x0e\x01"&54>\x012\x1e\x01\x15\x14\x07\x0e\x01\x07632\x172\x01\xe7\n\x16\x10\x0c,c\x1fmL\x0f\x12\x02\x0crh{N>\'<\x1f\x01\x12\'\x116b|_4\x9dBe\x12\'XHr\x11>\t\x1d\x12\x02\x03\x04\x10\rI\x85IWf<L\'?$\x0f\x0e\x14\x132Y55\\8\x85m,c.\x02\x03\x00': '2',
    b'\x00\x02\x00\x00\x00\x00\x02 \x02\xa7\x00"\x00/\x00\x00\x01\x1e\x01\x15\x14\x06#"&54>\x0132\x16\x17\x16\x15\x14\x06"&\'.\x02#"\x06\x07>\x0132\x13654.\x01#"\x06\x15\x14\x162\x01\xb655\x82m\x82\x85D\x80WJb#\x07\x18\x18\r\x0b\x14!8(_l\x03\x1bm<L,\'!F5EeV\xa2\x01{\x1fb9Xg\x99\x97o\xa9]JA\x0e\x08\x0e\x13\x0b\x0f")\x1e\xa0\x90,5\xfe\xcd%7%F-DFAN': '6',
    b'\x00\x01\x00\x00\x00\x00\x01\xfe\x02\xb8\x002\x00\x00\x01\x14\x06#"\x07\x06\x07\x0e\x01#"&54767\x06#"546327654&#"\x06\x07\x06#"&547>\x0132\x15\x14\x0772\x01\xfe\x11\x112\x1a/:\x04\x17\x0c\x11\x16\x03-4\x181$\x14\x10A\x1e#5H/Y2\x03\x07\x0e\x10\x1d\x1fj;\xcb\x1f3\'\x01S\x0f\x12\x01\x8c\x90\n\x0b\x12\x0c\x07\x06e\xa0\x01 \x0f\x12\x01m;0.\x0f\x0c\x01\x11\x0e\x16\x0b\n\x13\x98=p\x01\x00': '7',
    b'\x00\x01\x00\x00\xff\xfd\x02@\x02\xb2\x003\x00\x00\x01\x16\x15\x14\x06\x07\x06\x0f\x01\x14\x06"&?\x01\x06#"\'&547>\x01762\x16\x14\x07\x0e\x01\x07\x06\x15\x14\x17\x1632?\x01432\x16\x0f\x01676\x027\t\r\x1155\x07\x14%\x12\x01\x07,bmD\x1c\x07C}Q\t\x1e\x14\x13Mx \x02\r1[&F\t#\x14\x14\x01\tB"\x0e\x01\x10\t\x11\x0e\x11\x02\x06\x03\xad\x0f\x13\x14\x11\xa7\x01\x11\x07\x19\r\r\x83\xc2Q\t\x13\x1c\x14P\xb2O\x06\x02\x05\x03\x07\x02\xe2!\x15\x12\xd8\x06\x04\x02\x00': '4',
    b'\x00\x01\x00\x00\x00\x00\x01\xef\x02\x07\x00\x1b\x00\x00\x01\x16\x15\x14#\'\x15\x14\x06"&=\x01&#"43\x175432\x16\x1d\x01\x172\x01\xe8\x07$\x9e\r#\x0c4p\x1f \xa2\x1f\x11\r\x9f\x15\x01O\x08\x10\x1d\x02\x99\x10\x12\x11\x13\x97\x01<\x01\x91\x1e\x0f\x0f\x92\x01\x00\x00\x00': '+',
    b'\x00\x02\x00\x00\x00\x00\x02I\x02\x94\x00\x0e\x00\x1e\x00\x007.\x0154>\x012\x1e\x01\x15\x14\x0e\x01"7>\x0154.\x01"\x0e\x01\x15\x14\x1e\x0132\x9c>>=|\xb6}=B\x7f\xae\xc4.00Z{[/.X<@8*\x8bOT\x9efc\x9eWQ\x8bS`\x1fmCJ\x80NO\x81HBm@': '0',
    b'\x00\x01\x00\x00\xff\x80\x01"\x02\xeb\x00\x1d\x00\x00\x17&\'.\x0154>\x01762\x16\x15\x14\x06\x0f\x01\x0e\x01\x15\x14\x1e\x01\x17\x16\x15\x14\x06"\xef\x05\x06U]+T:\n\x18\x15\x0b\x08\x0fFD.=)\x13\x14\x15\x7f\x01\x06H\xe0\x80Y\xad\x8a$\x07\x11\x0e\x0b\r\x06\x0c7\xc7tb\x8eT*\x15\x0f\x0c\x12\x00\x00': '(',
    b'\x00\x03\x00\x00\x00\x00\x029\x02\xb1\x00\x1b\x00$\x003\x00\x00\x01\x16\x15\x14\x0e\x01".\x0154>\x017.\x0154>\x0132\x16\x15\x14\x06\x07\x16\'\x06\x14\x16264&"\x13>\x0154.\x01"\x0e\x01\x15\x14\x1632\x02\x0c-Dx\x99}G3S0!,/M,G[%\x1fP\xf0\x1c8P10R\x90+*1Vn[4i^=\x01\\5LCb46fD/Q9\x0c\x0f;(/E$QC(;\x12\x18\xca\x19T26R/\xfd\xe4\x15F(.J*+F&I[\x00': '8',
    b'\x00\x01\x00\x00\x00\x00\x01\xbc\x01\xe1\x00+\x00\x00%\x14\x06#"&/\x01\x06\x07\x06#"&54767\'.\x0154632\x16\x17\x16\x177>\x0132\x16\x15\x14\x06\x0f\x01\x17\x16\x01\xbc\x13\r\n\r\nm56\x0e\x0f\x0c\x16\x07<9t\x08\x04\x14\x0f\n\r\t\x1cI\\\x08\x0c\t\x11\x14\x03\x05g}\x08\xac\x0b\x12\t\tm:7\x0e\x12\t\x0c\x07??q\x08\t\x06\x0b\x13\t\t\x1fIf\t\x08\x11\r\x07\t\x06p{\x08': '*',
    b'\x00\x01\x00\x00\x00\x00\x01\xd1\x01[\x00\n\x00\x00\x13463%2\x15\x14#\x05"L\x11\x16\x015)+\xfe\xc9#\x018\x10\x10\x03!\x1d\x03\x00': '-',
    b'\x00\x01\x00\x00\x00\x00\x02\x13\x02\xb2\x00<\x00\x007&54632\x15\x1e\x0132654&#"\x06\x07\x06#"&?\x0167\x16327632\x15\x14\x06#"\x0f\x01"\'&#\x07\x1437>\x0132\x1e\x01\x15\x14\x06#"m9\x14\x12(\x01BOT]UR\x1d45\x06\n\x11\x17\x01\x02\t\x01Xp&8.\x13\x1e\x12\x10\'\x16^64\x07\r\t\t\n#2\x1bFg5\x89tq<<h\x12\x13"MSOPT_\n\r\x02\x13\x0f\x1a\xa6T\x04\x02\x02\x1f\x10\x12\x01\x01\x02\x01\xa7\n\x02\t\n?oGkv\x00\x00': '5',
}

def parse_glyph(data, loca):
    print(len(data))
    out = []
    for i in range(len(loca) - 1):
        block = data[loca[i]:loca[i + 1]]
        out.append(knownglyphs[block])
    return out

```

This was the final, correct translation. The `parse_glyph` function returns a
list of translated glyphs (based on the `knownglyphs` dict) in order of their
"glyph index". I'll talk about how I determined the correct glyph-to-character
translation after we parse `cmap`.

`cmap` can provide different glyph to character mappings for different character
encoding schemes. The one I ended up using is called the `Unicode platform`.

```python
def parse_cmap(data):
    # version = int.from_bytes(data[0:2], 'big')
    numTables = int.from_bytes(data[2:4], 'big')
    records = [
        {
            'platformID': int.from_bytes(data[i:i + 2], 'big'),
            'encodingID': int.from_bytes(data[i + 2:i + 4], 'big'),
            'offset': int.from_bytes(data[i + 4:i + 8], 'big'),
        }
        for i in range(4, (numTables * 8) + 4, 8)
    ]
    for r in records:
        ofs = r['offset']
        r['format'] = int.from_bytes(data[ofs:ofs + 2], 'big')
        if r['format'] == 0:
            r['length'] = int.from_bytes(data[ofs + 2:ofs + 4], 'big')
            r['language'] = int.from_bytes(data[ofs + 4:ofs + 6], 'big')
            r['glyphIDArray'] = [
                b for b in data[ofs + 6:ofs + r['length']]
            ]
        elif r['format'] == 4:
            r['length'] = int.from_bytes(data[ofs + 2:ofs + 4], 'big')
            r['data'] = data[ofs:ofs + r['length']]
        elif r['format'] == 12:
            r['length'] = int.from_bytes(data[ofs + 4:ofs + 8], 'big')
            r['data'] = data[ofs:ofs + r['length']]
        else:
            raise ValueError(f'unsupported fmt = {r["format"]}')
    return records
```

I was lazy and didn't really parse the other formats, and there are other
possible formats that didn't appear in any of these files that I didn't even
handle. The meat of this table is in the `glyphIDArray`, for which the offset
of each element represents a unicode codepoint, and the value of the element is
the index of the glyph to render for the character at that codepoint.

Finally, we can combine the mapping from glyph index to translated character
with the mapping from character to glyph index to obtain the final translation
dict. Whew!

```python
def get_mapping(font):
    raw = base64.b64decode(font)
    tables = parse_ttf_tables(raw)
    head = parse_head(tables['head']['data'])
    maxp = parse_maxp(tables['maxp']['data'])
    loca = parse_loca(tables['loca']['data'], head, maxp)
    glyph = parse_glyph(tables['glyf']['data'], loca)
    print(glyph)
    cmap = parse_cmap(tables['cmap']['data'])
    map = [x['glyphIDArray'] for x in cmap if x['format'] == 0][0]
    charMap = {chr(i): map[i] for i in range(len(map)) if map[i] != 0}
    print(charMap)
    glyphMap = {k: glyph[v] for k, v in charMap.items()}
    glyphMap[' '] = ' '
    return glyphMap
```

Unfortunately, we're not quite done. We still need to determine the correct
translation from glyph to character. I captured the file returned by a request,
then displayed it with my browser.

```python
r1 = requests.get(URL)
with open('temp.html', 'w') as f:
    f.write(r1.text)
r2 = requests.post(URL, data=get_answer(r1.text))
print(r2.text)
```

Most of the time, this would fail at the eval step because the parenthesis
didn't match. I compared the rendered characters to the translated characters
and swapped the `knownglyphs` dict items around until the translation came out
right.

Unfortunately, I lost the exact output from the server for the correct answer.
You can see for yourself by downloading the docker container from the challenge
[page][5].

Thanks for reading!

[1]: https://docs.microsoft.com/en-us/typography/opentype/spec/
[2]: https://docs.python-requests.org/en/master/
[3]: https://en.wikipedia.org/wiki/Context-free_grammar
[4]: https://www.youtube.com/channel/UC2DjFE7Xf11URZqWBigcVOQ
[5]: https://squarectf.com/2018/captcha.html
