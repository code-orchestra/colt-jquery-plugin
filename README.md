## **Colt-js jquery plugin** 

Simple [jQuery](http://jquery.com/) plugin that helps you handle live updates.


## **Available methods**

**$(selector).assetUpdate([handler])** - subscribes to any file updates in the project, or calls both cssUpdate() and imageUpdate() if no `handler` specified.

```javascript
$(window).assetUpdate(function (e, files) {
	// see what files were changed and do something
	console.log("files " + files.join(", ") + " were changed");
});
```

**$(selector).cssUpdate([handler])** - Subscribes to css file updates in selection, or reloads linked stylesheets if no `handler` specified.

```javascript
$("link#myStyleSheet").cssUpdate(function (e) {
	// file of linked stylesheet with id "myStyleSheet" was changed - do something
	console.log("myStyleSheet file was changed");
	
	// or just refresh the link to apply new styles
	$("link#myStyleSheet").cssUpdate();
});

```

**$(selector).imageUpdate([handler])** - Subscribes to image file updates in selection, or reloads images if no `handler` specified.

```javascript
$("#myImage").imageUpdate(function (e) {
	// file of image with id "myImage" was changed - do something
	console.log("myImage file has changed");
	
	// or just refresh the image to show new file
	$("#myImage").imageUpdate();
});
```

**$({selector:someFunction}).codeUpdate(handler)** - Subscribes to code changes in specified function.

```javascript
$({selector:myFunction}).codeUpdate(function (e) {
	// myFunction implementation has changed - do something
	myFunction (someParameter);
});
```

**$(selector).liveUpdate([handler])** - Subscribes to all both assets and code updates.

```javascript
$(window).liveUpdate(function (e, files) {
	// see what files were changed and do something
	console.log("files " + files.join(", ") + " were changed");
});
```
