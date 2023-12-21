function appendCSS(){
	// Set mysheet to Styles.css that holds the other rules for indenting the ToC (up to 4 levels deep)
	var mysheet = $('link[href="../Skins/Fluid/Stylesheets/Styles.css"]')[0].sheet;
	// Insert new rule into the stylesheet at the head of the file
	// Syntax for insert rule: stylesheet.insertRule(rule[, index])
	mysheet.insertRule("ul.sidenav ul ul ul ul ul > li > a { border-left: solid 1px #303335; margin-left: 2.5em; }", 0);
	mysheet.insertRule("ul.sidenav ul ul ul ul ul ul > li > a { border-left: solid 1px #303335; margin-left: 3em; }", 0);
	mysheet.insertRule("ul.sidenav ul ul ul ul ul ul ul > li > a { border-left: solid 1px #303335; margin-left: 3.5em; }", 0);
}
window.onload=appendCSS()