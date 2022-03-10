

function makeEffect(start, end, effect) {
	start = start/4;
	end = end / 4;
	cursor = "/ITL/scene/cursor" effect;
	gsub(/ .*/, "", cursor);
	print cursor " watch timeEnter " start " " end " (  /ITL/scene event " effect ");";
	print cursor " watch timeLeave " start " " end " (  /ITL/scene event NO" effect ");";
	print "\n"
}

BEGIN {
	FS = ":";
	print "/ITL/scene/cursorECHO set rect 0.01 0.01;"
	print "/ITL/scene/cursorRADIO set rect 0.01 0.01;"
	print "/ITL/scene/cursorREVERB set rect 0.01 0.01;"
	print "/ITL/scene/cursorSHIFT set rect 0.01 0.01;"
	print "/ITL/scene/cursorSHIFTREVERB set rect 0.01 0.01;"
	print "/ITL/scene/cursorVOCODER set rect 0.01 0.01;"
	print "/ITL/scene/cursor[A-Z]* show 0;\n"
}

END {
	print "/ITL/scene event EFFECTREADY;"
}


################# 
/^[0-9]/ {
	makeEffect($1, $2, $3);
}

/^fin/ {
	print CURSOR " watch timeEnter " $2 " " ($2 + 100) " ( /ITL/scene event STOP );" ;
}
