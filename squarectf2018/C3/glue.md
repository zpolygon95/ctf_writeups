convert 0.png 9.png 11.png 26.png 1.png 2.png 3.png 4.png 5.png 6.png 7.png 8.png 10.png 14.png 15.png 16.png 18.png 19.png 20.png 21.png 22.png 23.png 24.png 25.png 12.png 13.png 17.png +append output2.png

0 9 11   5 6 2 16 25 15 26 3   4 10 20 19 21   7 8 1 22 23 24 18 14   12 13 17
convert 0.png 9.png 11.png   5.png 15.png 2.png 16.png 25.png 6.png 26.png 3.png   4.png 10.png 20.png 19.png 21.png   7.png 8.png 1.png 22.png 23.png 24.png 18.png 14.png   12.png 13.png 17.png +append output2.png
convert 0.png 9.png 11.png   5.png 6.png 2.png 16.png 25.png 15.png 26.png 3.png   4.png 10.png 20.png 19.png 21.png   7.png 8.png 1.png 22.png 23.png 24.png 18.png 14.png   12.png 13.png 17.png +append output3.png

```
Necessary QR Structure:
" " = mandatory space
"#" = mandatory mark
"." = data

===========================



   ####### ..... #######
   #     # ..... #     #
   # ### # ..... # ### #
   # ### # ..... # ### #
   # ### # ..... # ### #
   #     # ..... #     #
   ####### # # # #######
           .....
   ......#..............
   ...... ..............
   ......#..............
   ...... ..............
   ......#..............
           .............
   ####### .............
   #     # .............
   # ### # .............
   # ### # .............
   # ### # .............
   #     # .............
   ####### .............



===========================
```

| Types of column               | # | pattern                         |
| :---------------------------- | : | :------------------------------ |
| space                         | 6 | `/000000000000000000000000000/` |
| vertical timing column        | 1 | `/000111111101010101111111000/` |
| leftmost position marker edge | 1 | `/00011111110.....01111111000/` |
| left position markers space   | 2 | `/00010000010.....01000001000/` |
| left position markers dot     | 3 | `/00010111010.....01011101000/` |
| left position markers margin  | 1 | `/00000000000.....00000000000/` |
| right position marker edge    | 2 | `/00011111110................/` |
| right position marker space   | 2 | `/00010000010................/` |
| right position marker dot     | 3 | `/00010111010................/` |
| right position marker margin  | 1 | `/00000000000................/` |
| horizontal timing space       | 2 | `/.........0................./` |
| horizontal timing mark        | 3 | `/.........1................./` |

| #  | content                     |
| -: | :-------------------------- |
|  0 | 000000000000000000000000000 |
|  1 |
|  2 |
|  3 |
|  4 |
|  5 |
|  6 |
|  7 |
|  8 |
|  9 | 000000000000000000000000000 |
| 10 |
| 11 | 000000000000000000000000000 |
| 12 | 000000000000000000000000000 |
| 13 | 000000000000000000000000000 |
| 14 |
| 15 |
| 16 |
| 17 | 000000000000000000000000000 |
| 18 |
| 19 |
| 20 |
| 21 |
| 22 |
| 23 |
| 24 |
| 25 |
| 26 |

spaces: 0 9 11 12 13 17
vtc: 26
lpme: 5
lpms: 6 15
lpmd: 2 16 25
lpmm: 3
rpme: 14 8
rpms: 18 1
rpmd: 22 23 24 4
rpmm: 7
hts: 10 19
htm: 4 20 21

space
space
space

lpme
*lpms
-lpmd
-lpmd
-lpmd
*lpms
vtc
lpmm

=htm
+hts
=htm
+hts
=htm

rpmm
.rpme
,rpms
;rpmd
;rpmd
;rpmd
,rpms
.rpme

space
space
space
