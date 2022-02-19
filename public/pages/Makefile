
INSTRS 	:= clarinet horn percussion trumpet violin cello flute trombone viola
TARGETS := $(INSTRS:%=../inscore/%.inscore)

INSCORE := ../inscore
TARGET  := $(INSCORE)/$(INSTR).inscore
DATES	:= dates/$(INSTR).txt
INIT    ?= 			# -v clean=1		# intended to build standalone inscore pages

$(TARGET) : $(DATES) makepages.awk Makefile
	@echo "#### ATTENTION ! Ne pas modifier : ce script est généré automatiquement" >  $@
	cat $(DATES) | awk -v baseaddress='/ITL/scene/page_' -v location="pages/$(INSTR)/n" -v cursor='/ITL/scene/cursor' $(INIT) -f makepages.awk >> $@

help:
	@echo "Build the inscore scripts for all instruments"
	@echo "Usage: "
	@echo "   make all             # to build all instruments"
	@echo "   make TARGET=instr    # to build a single instrument"
	@echo "                        # where instr is an instrument name"

all:
	make INSTR=cello 
	make INSTR=clarinet 
	make INSTR=flute 
	make INSTR=horn 
	make INSTR=percussion 
	make INSTR=trombone 
	make INSTR=trumpet 
	make INSTR=viola 
	make INSTR=violin 

clean:
	rm -f $(TARGETS)
