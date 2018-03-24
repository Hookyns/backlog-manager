<!DOCTYPE html>
<html lang="{{$lang}}">
<head>
	<meta charset="UTF-8">
	<meta name="description" content="Task manager for managing project development. Work with backlog and tasks in multiple project. Created as DEMO for JumboJS framework.">
	<meta name="keywords" content="JumboJS, task, project, backlog, manager">
	<meta name="author" content="Roman Jámbor">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="icon" href="/public/favicon.ico">
	<link rel="stylesheet" href="/public/styles/default.css">

	<script src="/public/uJumbo/ujumbo.js"></script>
	<script src="/public/scripts/ujtest.js"></script>

	<title>Node Task Manager | JumboJS DEMO</title>

	{{include head}}
</head>
<body>
<div class='header{{if $homepage}} homepage{{/if}}'>
	<header>
		<h1>Node Task Manager</h1>
		<h2>Welcome, thanks for giving it a try</h2>
	</header>
</div>

<main data-j-snippet="content">
	{{include content}}
</main>
</body>
</html>