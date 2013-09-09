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
