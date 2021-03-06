var OptionsMenu = function(menu) {
	var that = this
    var detectIconSize = function() {
        var width = screen.width;
        if (width >= 640) {
            return 72;
        } else if (width >= 470) {
            return 48;
        } else {
            return 36;
        }
    };

    var iconSize = detectIconSize();
    var menuDiv = document.createElement("div");
    menuDiv.setAttribute("id", menu.id);
    menuDiv.setAttribute("style", "display: none; position: fixed; bottom: 0; width: 100%");
    var menuTable = document.createElement("table");
    menuTable.setAttribute("style", "width: 100%;");
    menuTable.setAttribute("cellpadding", "0");
    menuTable.setAttribute("cellspacing", "0");
 
    for (var i = 0; i< menu.items.length; i++) {
        var menuTableRow = menuTable.appendChild(document.createElement("tr"));
        var menuTableRowData = menuTableRow.appendChild(document.createElement("td"));
        var rowTable = document.createElement("table");
        rowTable.setAttribute("style", "width: 100%;");
        rowTable.setAttribute("cellpadding", "0");
        rowTable.setAttribute("cellspacing", "0");
        var rowTableRow = rowTable.appendChild(document.createElement("tr"));
        var width = Math.ceil(100 / menu.items[i].length) + "%";
        for (var j=0 ; j< menu.items[i].length ; j++) {
            var item = menu.items[i][j];
            var menuItem = document.createElement("td");
            menuItem.setAttribute("align", "center");
            menuItem.setAttribute("width", width);
            menuItem.setAttribute("style", "color: white; font-weight: bold; border-top: 1px solid grey; border-right: 1px solid grey; background-color: black");
            menuItem.addEventListener("click", item.action, false);
            menuItem.addEventListener("click", function() {
                    document.getElementById(menu.id).style.display = 'none';
                }, false);
            if (item.image) {
                var imgItem = document.createElement("img");
                imgItem.setAttribute("src", item.image);
                imgItem.setAttribute("width", iconSize);
                imgItem.setAttribute("height", iconSize);
                menuItem.appendChild(imgItem);
            }
            menuItem.appendChild(document.createElement("br"));
            menuItem.appendChild(document.createTextNode(item.label));
            rowTableRow.appendChild(menuItem);
        }
        menuTableRowData.appendChild(rowTable);
    }
    menuDiv.appendChild(menuTable);
    document.body.appendChild(menuDiv);
    
	// Outside handle
	this.show = function(){
		menuDiv.style.display = 'block'
	}
	this.hide = function(){
		menuDiv.style.display = 'none'
	}
	this.toggle = function(){
		if (menuDiv.style.display == 'none') {
            this.show()
        } else {
            this.hide()
        }
	}
	this.getState = function(){
		return !(menuDiv.style.display == 'none')
	}
	
    // Listen for the menubutton event to hide/show the menu
    document.addEventListener("menubutton", function() {
        that.toggle()
    }, false);
};
