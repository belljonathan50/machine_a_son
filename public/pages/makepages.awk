
function nextindex(i) {
#	j=i+1;
# 	return j < 10 ? "0" j : j;
	return i + 1;
}

function time2msc(date) {
	min = int(date/60);
	sec = int(date%60);
	cts = int(date%60 - sec);
	return min ":" sec ":" cts;
}

function time2interval(date, duration) {
	start = time2msc(date*4);
	end = time2msc((date + duration)*4);
	return "[" start ", " end "[";
}

function makePage(i, date, duration, address, loc, cursor) {
	odd = i%2;
	page = address i;
	print page " set img '" loc i ".png';"
#	print page " date " date ";"
	interval = time2interval(date, duration);
	print page " map '([169, 3920[ [0, " height "[) (" interval ")';"
#	print page " duration " duration ";"
	end = date + duration;
	print cursor " watch timeEnter " date " " end " ( " ;
	print "  " address "* show 0,"
	print "  " page " show 1,"
	print "  " address nextindex(i) " show 1,"
	if (odd) {
		print "  " page " $bottom,"
		print "  " address nextindex(i) " $top"
	}
	else {
		print "  " page " $top,"
		print "  " address nextindex(i) " $bottom"
	}
	print ");\n"
}

BEGIN {
	FS = ":";
	if (clean) {
		print "/ITL/scene/* del;";
		print "/ITL/scene/cursor set rect 0.005 1;\n";
	}
	print "top = yorigin 1.3;";
	print "bottom = yorigin -1.3;"
	print

}

END {
	print "\n" baseaddress  "* show 0;"
	print baseaddress  "* width 1.95;"
	print baseaddress  "0 show 1;"	
	print baseaddress  "1 show 1;"	
	print baseaddress  "0 $top;"	
	print baseaddress  "1 $bottom;"
	print baseaddress  "* watch mouseDown ( /ITL/scene event GOTO '$date');"
	print baseaddress  "* watch mouseMove ( /ITL/scene event GOTO '$date');"	
	print "/ITL/scene event PAGEREADY;"
}


################# 
/^[0-9]/ {
	makePage($1, $2, $3, baseaddress, location, cursor);
}

/^fin/ {
	print cursor " watch timeEnter " $2 " " ($2 + 100) " ( /ITL/scene event STOP );" ;
}
