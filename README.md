# jQuery Sliding Tabs

jQuery Sliding Tabs provides slide in and out boxes for hiding less important content off the page. This is often used in web content applications to show a "contact us" form, a "rating" area ("rate our support") or a "suggestions" box, in my personal application, it is used to make a more "desktop style" GUI for a web application. It is a fairly versatile widget.

It is dependent on both jQuery and jQuery UI (!), which is a little heavy, but the jQuery UI position method makes the code relatively elegant.

## Instructions

Coming soon. 

## Screenshots

![Closed Drawer](http://i.imgur.com/Lx8deUN.png)

*All (three) drawers are closed (not slide out). When the user clicks on one (or more than one), it slides out appropriately:*



![Open Drawer](http://i.imgur.com/FmSGWv2.png)

*The user can then re-click it to close. In a future version, options to close when clicking outside the region or open/close on hover are on the todo list.*



## Known Issues

There are some desirable features on the todo list at this point. This is very much a starting point for the plugin. It is functional in it's constrained use case, but may need some improvement for other use cases. It would be nice to support left/right positioning with the rotate transforms. 

* Width must be specified at create time, and it will resize your handle and box to that size. This is so the tabs line up properly, it can be fixed in the future with simple collision detection and repositioning
* Boxes must be "in order" in the markup. This can be fixed in the future.
* Specifying height is optional, but the tabs look best if they all open to the same height.


## Sliding Tab Handle CSS

The tabs can be styled however you like. In the screenshots included above, I've used the following CSS:

```css
.tab {  
        background: #460282; /* Old browsers */
        background: -moz-linear-gradient(top,  #460282 0%, #380272 100%); /* FF3.6+ */
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#460282), color-stop(100%,#380272)); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(top,  #460282 0%,#380272 100%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(top,  #460282 0%,#380272 100%); /* Opera 11.10+ */
        background: -ms-linear-gradient(top,  #460282 0%,#380272 100%); /* IE10+ */
        background: linear-gradient(to bottom,  #460282 0%,#380272 100%); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#460282', endColorstr='#380272',GradientType=0 ); /* IE6-9 */

        color:#FFF;
        text-decoration:none;
        padding:4px;
        display:block;
        text-align:center;
        font-size:24px;
	font-family:'Franklin Gothic Medium', Helvetica, sans-serif
}
```
