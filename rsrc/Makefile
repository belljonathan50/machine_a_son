
INSTRS 	:= acc bas con mez sop
TARGETS := $(INSTRS:%=../inscore/fx-%.inscore)

INSCORE := ../public/inscore
TARGET  := $(INSCORE)/fx-$(INSTR).inscore
FX      := $(INSTR).effects.txt

$(TARGET) : $(DATES) makeffects.awk Makefile
	@echo "#### ATTENTION ! Ne pas modifier : ce script est généré automatiquement" >  $@
	cat $(FX) | awk -f makeffects.awk >> $@

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
