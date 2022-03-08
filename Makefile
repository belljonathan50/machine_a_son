
INSTRS 	:= acc bas con mez sop
TARGETS := $(INSTRS:%=public/inscore/%.inscore*) $(INSTRS:%=public/%.html)

INSCORE := inscore
INSTR	:= $(shell echo $(PART) | tr [A-Z] [a-z])
TARGET  := public/$(INSTR).html
TMPL 	:= rsrc/template.html

$(TARGET) : $(TMPL) Makefile
	cat $(TMPL) | sed -e "s/PART/$(PART)/g" | sed -e "s/INSTR/$(INSTR)/g"  > $@

help:
	@echo "Build the html pages for all instruments"
	@echo "Usage: "
	@echo "   make all             # to build all instruments"
	@echo "   make TARGET=instr    # to build a single instrument"
	@echo "                        # where instr is an instrument name"

all:
	make -C rsrc all
	make -C public/pages all
	make -C public/inscore
	make PART=acc 
	make PART=bas 
	make PART=con 
	make PART=mez 
	make PART=sop 

clean:
	rm -f $(TARGETS)

test:
	echo $(TARGETS)
