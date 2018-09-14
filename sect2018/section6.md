# Section6 - Misc (51) #

The challenge text reads:

```
This file was recovered from a scavenger.
```

[This file](section6/section6.tar.gz)?

Expanding the archive results in a single file, called `section6` which appears
to be a zip archive:

```
$ file section6
section6: Zip archive data, at least v2.0 to extract
$ unzip section6
<inflation text...>
$
```

I then take a glance at the images, which don't contain any obvious hints. The
page 1 thumbnail appears to be blank, and the page 6 thumbnail has some jumbled
dots that might have been text at one point. Let's see what all of these files
are:

```
$ find . -type f | xargs file
./Documents/1/_rels/FixedDocument.fdoc.rels:                              XML 1.0 document, ASCII text, with no line terminators
./Documents/1/Metadata/Page1_PT.xml:                                      XML 1.0 document, ASCII text, with very long lines, with CRLF line terminators
./Documents/1/Metadata/Page1_Thumbnail.JPG:                               JPEG image data, JFIF standard 1.01, resolution (DPI), density 96x96, segment length 16, baseline, precision 8, 181x256, frames 3
./Documents/1/Pages/_rels/1.fpage.rels:                                   XML 1.0 document, ASCII text, with no line terminators
./Documents/1/Pages/1.fpage:                                              exported SGML document, ASCII text
./Documents/1/FixedDocument.fdoc:                                         XML 1.0 document, ASCII text, with no line terminators
./Documents/6/_rels/FixedDocument.fdoc.rels:                              XML 1.0 document, ASCII text, with no line terminators
./Documents/6/Metadata/Page6_Thumbnail.JPG:                               JPEG image data, JFIF standard 1.01, resolution (DPI), density 96x96, segment length 16, baseline, precision 8, 181x256, frames 3
./Documents/6/Metadata/Page6_PT.xml:                                      XML 1.0 document, ASCII text, with very long lines, with CRLF line terminators
./Documents/6/Pages/_rels/6.fpage.rels:                                   XML 1.0 document, ASCII text, with very long lines, with no line terminators
./Documents/6/Pages/6.fpage:                                              exported SGML document, ASCII text, with very long lines
./Documents/6/FixedDocument.fdoc:                                         XML 1.0 document, ASCII text, with no line terminators
./Documents/6/Resources/Fonts/E72969B2-88BF-426C-8490-3B3E9F1B3A83.odttf: data
./section6:                                                               Zip archive data, at least v2.0 to extract
./_rels/FixedDocumentSequence.fdseq.rels:                                 XML 1.0 document, ASCII text, with no line terminators
./_rels/.rels:                                                            XML 1.0 document, ASCII text, with very long lines, with no line terminators
./Metadata/MXDC_Empty_PT.xml:                                             XML 1.0 document, ASCII text, with very long lines, with no line terminators
./Metadata/Job_PT.xml:                                                    XML 1.0 document, ASCII text, with very long lines, with CRLF line terminators
./FixedDocumentSequence.fdseq:                                            XML 1.0 document, ASCII text, with no line terminators
./section6.tar.gz:                                                        gzip compressed data, last modified: Fri Sep  7 18:28:35 2018, from Unix
./[Content_Types].xml:                                                    XML 1.0 document, ASCII text, with very long lines, with no line terminators
```

Looking through each of the text files, only
[one](section6/Documents/6/Pages/6.fpage) is very interesting. Right away, at
the end of most of the lines appears to be some sort of ASCII art composed of
hashes and periods. I removed all the superflouous text, and replaced the
periods with spaces in [this file](section6/ascii.txt):

```
 #####  #######  #####  #######   ### ######           ###           #####
#     # #       #     #    #     #    #     # #####   #   #       # #     #
#       #       #          #     #    #     # #    # #     #      #       #
 #####  #####   #          #    ##    ######  #    # #     #      #  #####
      # #       #          #     #    #       #####  #     #      #       #
#     # #       #     #    #     #    #       #   #   #   #  #    # #     #
 #####  #######  #####     #      ### #       #    #   ###    ####   #####

                      #####  #######   ###     #             #   #######
#    # #####         #     # #        #   #   ##            ##   #
#   #    #                 # #       #     # # #           # #   #
####     #            #####  ######  #     #   #             #   ######
#  #     #           #             # #     #   #             #         #
#   #    #           #       #     #  #   #    #             #   #     #
#    #   #           #######  #####    ###   #####         #####  #####
             #######                               #######
               #        #####  #       ###
        #####  #    #  #     # #          #
        #    # #    #        # #          #
        #    # #    #   #####  #          ##
        #####  #######       # #          #
        #   #       #  #     # #          #
        #    #      #   #####  ####### ###
#######

```

It's a bit hard to read, but the flag is `SECT{PR0J3KT_2501_15_R43L}`. I
accidentally tried `O` instead of `0` for a couple of the words, but eventually
figured it out.
