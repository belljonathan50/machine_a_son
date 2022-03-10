
SRC = $(wildcard *.inscore)
TXT = $(SRC:%=%.txt)

all: $(TXT)

clean:
	rm -f *.inscore.txt
	
%.inscore.txt: %.inscore Makefile
	cat $< >> $@
	