({
    recordId : null,
    canvas : null,
    ctx : null, 
    sketch : null,
    sketch_style : null,
    empty: true,
    mouse : {x: 0, y: 0},
    strDataURI : null,
    
    setupSignature : function(component)
    {
        try
        {
            this.recordId=component.get("v.recordId");
            if (null==this.recordId)
            {
                alert("No id parameter provided in URL.");
            }
            else
            {
                this.toggleClass(component, 'sigdiv', 'sc-invisible');
                
                this.canvas = document.querySelector('#paint');
                this.canvas.style.width=component.get("v.width"); 
                this.canvas.style.height=component.get("v.height"); 
                this.ctx = this.canvas.getContext('2d');
                
                this.resizeCanvas();
               	this.clearSignature();
                
                // hide the starting message and button
                this.toggleClass(component, 'startcontent', 'sc-notdisplayed');
                
                var device = $A.get("$Browser.formFactor");
                if (device=='DESKTOP') {
                    this.mouseDownEvent = "mousedown";
                    this.mouseMoveEvent = "mousemove";
                    this.mouseUpEvent = "mouseup";
                }
                else {
                    this.mouseDownEvent = "touchstart";
                    this.mouseMoveEvent = "touchmove";
                    this.mouseUpEvent = "touchend";
                }
                
                /* Mouse/touch Capturing Work */
                var self=this;
                this.canvas.addEventListener(this.mouseMoveEvent, function(e) {
                    self.updateMousePosition(component, e, self.canvas);
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                }, false);
                
                var onPaint = function(e) {
                    self.log(component, 'Drawing line to ' + self.mouse.x + ',' + self.mouse.y);
                    self.ctx.lineTo(self.mouse.x, self.mouse.y);
                    self.ctx.stroke();
                    self.empty=false;
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                };
                
                this.canvas.addEventListener(this.mouseDownEvent, function(e) {
                    self.updateMousePosition(component, e, self.canvas);
                    self.ctx.beginPath();
                    self.log(component, 'Moving to ' + self.mouse.x + ',' + self.mouse.y);
                    self.ctx.moveTo(self.mouse.x, self.mouse.y);
                    self.canvas.addEventListener(self.mouseMoveEvent, onPaint, false);
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                }, false);
                
                this.canvas.addEventListener(this.mouseUpEvent, function(e) {
                    self.canvas.removeEventListener(self.mouseMoveEvent, onPaint, false);
                    // self.updateMousePosition(e, self.canvas);
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                }, false);
            } 
        }
        catch (e) 
        {
            alert('Exception :( - ' + e);
        }
    },
    updateMousePosition : function (component, event, canvas) {
        try
        {
            var target;
            var device = $A.get("$Browser.formFactor");
            if (device=='DESKTOP') {
                target = event;
                this.log(component, 'Target client x = ' + target.clientX);
                var scaleX = canvas.width / this.styleValue(canvas, "width");
                var scaleY = canvas.height / this.styleValue(canvas, "height");
                var canvasRect = canvas.getBoundingClientRect();
                this.mouse.x = scaleX * (target.clientX - canvasRect.left - canvas.clientLeft - this.styleValue(canvas, "padding-left"));
                this.mouse.y = scaleY * (target.clientY - canvasRect.top - canvas.clientTop - this.styleValue(canvas, "padding-top"));        
            }
            else {
                this.log(component, 'mobile!');
                this.log(component, 'Changed touches = ' + event.changedTouches);
                target = event.changedTouches[0];
                this.log(component, 'Target = ' + target);
                this.mouse.x = target.clientX - canvas.offsetLeft;
                this.mouse.y = target.clientY - canvas.offsetTop;
            }
            
            
        }
        catch (e) 
        {
            this.log(component, 'Exception: ' + e);
        }
    },
    styleValue : function(canvas, property) {
        if (typeof getComputedStyle === 'function') {
            var style = getComputedStyle(canvas, null);
            return parseInt(style.getPropertyValue(property), 10) || 0;
        }
        else {
            return 0;
        }
    },
    resizeCanvas : function() 
    {
        // take pixel ratio into account
        var ratio =  window.devicePixelRatio || 1;
        this.canvas.width = this.canvas.offsetWidth * ratio;
        this.canvas.height = this.canvas.offsetHeight * ratio;
        this.canvas.getContext("2d").scale(ratio, ratio);
    },
    saveSignature : function (component)
    {
        // add try/catch in case anything goes awry that the remoting doesn't handle
        try
        {
            // check that the user put something in the signature box
            if (this.empty) 
            {
                alert("Please provide signature first.");
            } 
            else 
            { 
                // show the user something is happening!
                this.showSpinner(component);
                // get the data URL from the canvas
                this.strDataURI = this.canvas.toDataURL.apply(this.canvas);
                
                // strip off the metadata
                var strippedDataURI = this.strDataURI.replace(/^data:image\/(png|jpg);base64,/, "");
                
                // get the controller action
                var action = component.get("c.SaveSignatureFile"); 
                
                action.setParams({
                    parentIdStr: this.recordId,
                    pictureBody: strippedDataURI
                });
                
                self=this;
                action.setCallback(this, function(a) {
                    var result = a.getReturnValue();
                    if ('SUCCESS' == result)
                    {
                        // hide the canvas input
                        this.toggleClass(component, 'sigdiv', 'sc-notdisplayed');
                        
                        // populate the signature image element with the captured image
                        var sigimage=document.querySelector('#sigimage');
                        sigimage.src=this.strDataURI;
                        sigimage.style.width=component.get("v.width"); 
                        sigimage.style.height=component.get("v.height"); 
                        
                        // display the completed message
                        self.toggleClass(component, 'completecontent', 'sc-notdisplayed');
                    }
                    else
                    {
                        alert('Save failed : ' + result);
                    }
                    self.hideSpinner(component);
                });
                
                $A.enqueueAction(action); 
            } 
        }
        catch (exc)
        {
            alert(exc);
        }
    },
    clearSignature : function (component)
    {
        this.ctx.clearRect ( 0 , 0 , this.canvas.width, this.canvas.height );
    },
    showSpinner : function (component) {
        document.querySelector('.opaque').style.display='block';
        var spinner = component.find('spinner');
        var evt = spinner.get("e.toggle");
        evt.setParams({ isVisible : true });
        evt.fire();
    },
    hideSpinner : function (component) {
        document.querySelector('.opaque').style.display='none';
        var spinner = component.find('spinner');
        var evt = spinner.get("e.toggle");
        evt.setParams({ isVisible : false });
        evt.fire();
    },
    toggleClass : function(component, element, styleClass) {
        var ele=component.find(element);
        $A.util.toggleClass(ele, styleClass);
    },
    log : function(component, msg){
        console.log(msg);
    }
    
})