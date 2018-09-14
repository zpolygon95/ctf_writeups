# Ez dos - Rev (51) #

The text of the challenge reads:

```
They told me you were old-school, great! Have a look at this license-server as a warm-up
```

With two additional hints:

```
Service: nc 142.93.38.98 7777 | nc rev.sect.ctf.rocks 7777
Download: ezdos.tar.gz
```

According to `dig`, that URL resolves to that IP address, so no need to try it
both ways... First, I downloaded [ezdos.tar.gz](ezdos/ezdos.tar.gz) and expanded
it, which results in a file called `ezdos.com`.

```
$ file ezdos.com
ezdos.com: COM executable for DOS
$ hexdump -C ezdos.com
00000000  b4 09 ba dd 01 cd 21 ba  14 02 cd 21 b9 00 00 bb  |......!....!....|
00000010  00 20 ba 0d 00 b4 01 cd  21 3c 0a 74 08 88 07 43  |. ......!<.t...C|
00000020  41 39 d1 75 f0 b9 00 00  bb 00 20 b8 6b 02 ba 04  |A9.u...... .k...|
00000030  00 51 31 c9 8a 0f 93 8a  2f 93 38 e9 0f 85 87 00  |.Q1...../.8.....|
00000040  59 41 43 40 39 d1 75 e9  31 d2 8a 17 80 fa 2d 75  |YAC@9.u.1.....-u|
00000050  76 43 31 c9 8a 0f 93 8a  2f 93 30 e9 80 f9 66 75  |vC1...../.0...fu|
00000060  66 43 40 31 c9 8a 0f 93  8a 2f 93 30 e9 80 f9 79  |fC@1...../.0...y|
00000070  75 55 43 40 31 c9 8a 0f  93 8a 2f 93 30 e9 80 f9  |uUC@1...../.0...|
00000080  74 75 44 43 40 31 c9 8a  0f 93 8a 2f 93 30 e9 80  |tuDC@1...../.0..|
00000090  f9 79 75 33 b4 09 ba 36  02 cd 21 c7 46 00 66 6c  |.yu3...6..!.F.fl|
000000a0  c7 46 02 61 67 c7 46 04  00 00 b8 00 3d 89 ea cd  |.F.ag.F.....=...|
000000b0  21 89 c3 b4 3f b9 18 00  cd 21 b4 02 8a 56 00 cd  |!...?....!...V..|
000000c0  21 45 49 75 f5 eb 07 b4  09 ba 26 02 cd 21 b4 09  |!EIu......&..!..|
000000d0  ba 55 02 cd 21 b4 01 cd  21 b4 00 cd 21 23 23 23  |.U..!...!...!###|
000000e0  23 23 23 23 23 23 23 23  23 23 23 23 23 23 23 23  |################|
000000f0  23 23 23 0a 0d 45 5a 20  44 4f 53 0a 0d 23 23 23  |###..EZ DOS..###|
00000100  23 23 23 23 23 23 23 23  23 23 23 23 23 23 23 23  |################|
00000110  23 23 23 24 0a 0d 45 6e  74 65 72 20 6c 69 63 65  |###$..Enter lice|
00000120  6e 73 65 3a 20 24 0a 0d  57 72 6f 6e 67 20 73 65  |nse: $..Wrong se|
00000130  72 69 61 6c 21 24 0a 0d  43 6f 72 72 65 63 74 21  |rial!$..Correct!|
00000140  20 48 65 72 65 20 69 73  20 79 6f 75 72 20 66 6c  | Here is your fl|
00000150  61 67 3a 20 24 0a 0d 50  72 65 73 73 20 45 4e 54  |ag: $..Press ENT|
00000160  45 52 20 74 6f 20 65 78  69 74 24 31 33 33 37 53  |ER to exit$1337S|
00000170  48 45 4c 4c                                       |HELL|
00000174
```

I seem to have left my DOS shell in my other pants, so I guess I'll just try
that other hint:

```
$ nc 142.93.38.98 7777
PRESS ENTER TWICE TO START THE LICENSE-SERVICE!!!
Note that DOS needs 25 lines. You might want to enlarge your
window before continuing.

Now type ENTER to start DOSEMU or <Ctrl>C to cancel

```

After typing enter twice, my terminal is cleared and something scrolls by too
quickly to read. Then the following appears in my terminal:

```
C: HD1, Pri[ 1], CHS=    0-1-1, start=     0 MB, size=   392 MB
D: HD2, Pri[ 1], CHS=    0-1-1, start=     0 MB, size=   392 MB
dosemu XMS 3.0 driver installed.
dosemu EMS driver rev 0.5 installed.
[dosemu cdrom driver installed (V0.2)]


Access to cdrom denied.
Installation aborted.

Kernel: allocated 41 Diskbuffers = 21812 Bytes in HMA
Z: = LINUX\FS\ attrib = READ ONLY

FreeCom version 0.84-pre2 XMS_Swap [Aug 28 2006 00:29:00]
Sound on: SB at 0x220-0x22f, IRQ=5, DMA8=1, DMA16=5. MPU-401 at 0x330-0x331.
D: = LINUX\FS/HOME/CTF attrib = READ/WRITE
Error 35 (network name not found)
while redirecting drive E: to LINUX\FS/MEDIA/CDROM
"Welcome to dosemu 1.4.0.8!"
About to Execute : CHALL.COM
######################
EZ DOS
######################
Enter license:

```

Learning from my mistake, I connect again -- this time logging the
[output](ezdos/output):

```
$ nc 142.93.38.98 7777 | tee output
```
