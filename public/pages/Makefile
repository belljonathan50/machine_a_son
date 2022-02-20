
INSTRS 	:= acc bas con mez sop
TARGETS := $(INSTRS:%=../inscore/%.inscore)

INSCORE := ../inscore
TARGET  := $(INSCORE)/$(INSTR).inscore
DATES	:= dates/all.txt
INIT    ?= 			# -v clean=1		# intended to build standalone inscore pages
IMGS    ?= "pages"

$(TARGET) : $(DATES) makepages.awk Makefile
	@echo "#### ATTENTION ! Ne pas modifier : ce script est généré automatiquement" >  $@
	cat $(DATES) | awk -v baseaddress='/ITL/scene/page_' -v location=$(IMGS)/$(INSTR)/ -v cursor='/ITL/scene/cursor' $(INIT) -f makepages.awk >> $@

help:
	@echo "Build the inscore scripts for all instruments"
	@echo "Usage: "
	@echo "   make all             # to build all instruments"
	@echo "   make TARGET=instr    # to build a single instrument"
	@echo "                        # where instr is an instrument name"

all:
	make INSTR=acc 
	make INSTR=bas 
	make INSTR=con 
	make INSTR=mez 
	make INSTR=sop 

clean:
	rm -f $(TARGETS)
