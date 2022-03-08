
INSTRS 	:= acc bas con mez sop 
TARGETS := $(INSTRS:%=../inscore/%.inscore) $(INSTRS:%=%.html)

INSCORE := ../inscore
TARGET  := $(INSCORE)/$(INSTR).inscore
DATES	:= dates/all.txt
INIT    ?= 			# -v clean=1		# intended to build standalone inscore pages
IMGS    ?= "pages"
HEIGHT  ?= 608
H  		:= -v height=$(HEIGHT)

$(TARGET) : $(DATES) makepages.awk Makefile
	@echo "#### ATTENTION ! Ne pas modifier : ce script est généré automatiquement" >  $@
	cat $(DATES) | awk -v baseaddress='/ITL/scene/page_' -v location=$(IMGS)/$(INSTR)/ -v cursor='/ITL/scene/cursor' $(INIT) $(H) -f makepages.awk >> $@

help:
	@echo "Build the inscore scripts for all instruments"
	@echo "Usage: "
	@echo "   make all             # to build all instruments"
	@echo "   make TARGET=instr    # to build a single instrument"
	@echo "                        # where instr is an instrument name"

all:
	make INSTR=acc HEIGHT=608
	make INSTR=bas HEIGHT=583
	make INSTR=con HEIGHT=658
	make INSTR=mez HEIGHT=652
	make INSTR=sop HEIGHT=400

clean:
	rm -f $(TARGETS)

test:
	echo $(TARGETS)
