## **Colt-js jquery plugin** 

Simple [jQuery](http://jquery.com/) plugin that helps you handle live updates.


## **Available methods**

**$(window).liveUpdate(function (e, files) { ... })** - Subscribes to both assets and code updates.

```javascript
$(window).liveUpdate(function (e, files) {
	// see what files were changed and do something
	console.log("files " + files.join(", ") + " were changed");
});
```

**$(window).codeUpdate(function(e, fncs) { ... })** - Subscribes to all code updates. Array `fncs` contains all the functions that were subscribed to individually (see below).

```javascript
$(window).codeUpdate(function(e, fncs){
    $.each(fncs, function(){
        console.log("function was changed: " + this);
    });
});
```

**$({selector:someFunction}).codeUpdate(function(e) { ... })** - Subscribes to code changes in specified function.

```javascript
$({selector:myFunction}).codeUpdate(function (e) {
	// myFunction implementation has changed - do something
	myFunction (someParameter);
});
```

**$(selector).imageUpdate(function (e, images) { ... })** - Subscribes to image file updates in selection.

```javascript
$(window).imageUpdate(function (e, images) {
    $.each(images, function(){
        console.log($(this).attr("src") + " file was changed");
        $(this).imageUpdate();
    });
});
```

**$(selector).imageUpdate()** - Refresh all changed images in the selection.

```javascript
$(window).imageUpdate();
```

**$(selector).cssUpdate(function (e, stylesFiles) { ... })** - Subscribes to css file updates in selection.

```javascript
$(window).cssUpdate(function (e, stylesFiles) {
    $.each(stylesFiles, function(){
        console.log(this + " css file was changed");
    })
    // refresh styles
    $(window).cssUpdate()
});
```

**$(selector).cssUpdate()** - Refresh all changed styles in the selection.

```javascript
$(window).cssUpdate();
```

**$(selector).assetUpdate(function (e, files) { ... })** - Subscribes to any file updates in the project.

**$(selector).assetUpdate()** - Calls both cssUpdate() and imageUpdate().
