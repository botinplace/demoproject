<?php
//var_dump( get_defined_vars() );
?>
<!DOCTYPE html>
<html>
<head>
<title>BASE TEMPLATE</title>
<style>
@charset "UTF-8";

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}


*, *:after, *:before{
	outline: none;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;	
	padding: 0;
	margin: 0;
	/*max-height: 1000000px;*/
	
}

/*
html {
	width: 100%;
	min-height: 100%;
	max-height: 1000000px;
	-webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    text-size-adjust: none;
	height:100%;	
}
*/
html {
	width: 100%;
	min-height: 100%;
	max-height: 1000000px;
	overflow:auto;
}

body {
	width: 100%;
	margin: 0;
	padding: 0;		
	-ms-text-size-adjust: 100%;
	-moz-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;	
	font-family:'Roboto',BlinkMacSystemFont,-apple-system,segoe ui,Roboto,Oxygen-Sans,Ubuntu,Cantarell,helvetica neue,sans-serif;	
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: subpixel-antialiased;	
    /*-webkit-font-smoothing: antialiased;*/
	/*animation: fadeInAnimation ease 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;*/	
	scroll-behavior: smooth;
		min-height: 100vh;
    position: relative;
    /*overflow: hidden;*/
    height: 100%;
    background:#eee;
    
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
	line-height:1.36;
}


:root {
   --app-height: 100%;
   --vh: 100%;
   --main-bg:#1c1d22;
}

a,
button,
input,
textarea {
	box-shadow: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
}


body{
	margin: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
}
header,main,footer{
	padding:15px;
}
main{
	flex:1;
}
</style>
</head>
<body>

<header>Header</header>

<main><?php echo $content; ?>BODY <br>Core: {{this_project_version}}</main>

<footer>FOOTER</footer>

</body>
</html>