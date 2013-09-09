## **Colt-js jquery plugin** 

Simple [jQuery](http://jquery.com/) plugin that helps you handle live updates.

```javascript
$("#myImage").imageUpdate(function (e) {
	// file of image with id "myImage" was changed - do something
	// ...
	
	// or just refresh the image to show new file
	$("#myImage").imageUpdate();
});
```

## **Available methods**

**$(selector).assetUpdate([handler])** - subscribes to any file updates in the project, or calls both cssUpdate() and imageUpdate() if no handler specified.

**$(selector).cssUpdate([handler])** - Subscribes to css file updates in selection, or reloads linked stylesheets if no handler specified.

**$(selector).imageUpdate([handler])** - Subscribes to image file updates in selection, or reloads images if no handler specified.

**$({selector:someFunction}).codeUpdate(handler)** - Subscribes to code changes in specified function.

**$(selector).liveUpdate([handler])** - Subscribes to all both assets and code updates.
