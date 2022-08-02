class DisplayTriangle {
    constructor( element, size ) {
        this.colors = new Colors( "color", "values" );

        this.triangle = new PascalTriangle( size );
        this.divTriangle = element;
        this.iRow;

        this.rowsBeingCreated = [];
        this.rowsBeingDestroyed = [];

        for (this.iRow = 0; this.iRow < size; this.iRow++)
            setTimeout( this.addRow( this.iRow ), 0 );

        this.iRow--;
    }



    endAddRow(newRow) {
        this.rowsBeingCreated.push(
            setTimeout( function(environment, row, iRow) {
                environment.rowsBeingCreated.shift();
                row.style.animation = null;
                
                if (iRow == environment.triangle.size-1)
                environment.divTriangle.scrollIntoView({behavior: "smooth", block: "end"});
            }, 300, this, newRow, this.iRow)
        )
    }



    addRow(i) {
        var newRow = document.createElement("div");
        newRow.id = "row" + this.iRow;
        newRow.className = "row";

        var values = this.triangle.triangle[i];
        var simplifiedValue;
        for (var value of values) {
            simplifiedValue = this.engineeringNotation(value);

            var div = document.createElement("div");
            div.environment = this;
            div.innerHTML = simplifiedValue;
            div.value = value;
            newRow.appendChild(div);
        }

        newRow.style.animation = "add-row .3s ease-out 1";
        this.endAddRow(newRow);
        this.divTriangle.appendChild(newRow);
    }



    addLastRow() {
        this.iRow++;
        var idTimeout = this.rowsBeingDestroyed[this.rowsBeingDestroyed.length-1];

        if (idTimeout) {
            clearTimeout( idTimeout );
            this.rowsBeingDestroyed.pop()
            var newRow = document.getElementById("row" + this.iRow);
            newRow.style.animation = "add-row .3s ease-out 1";
            this.endAddRow(newRow);
        } else {
            this.triangle.addRow();
            this.addRow(this.triangle.size-1);
        }
    }



    deleteRow(callback) {
        var eraseRow = document.getElementById("row" + this.iRow);
        eraseRow.style.animation = "delete-row .3s ease 1";

        this.rowsBeingDestroyed.push(
            setTimeout(function(environment, row, iRow, callback) {
                environment.rowsBeingDestroyed.shift();
                environment.triangle.deleteLastRow();

                environment.divTriangle.removeChild(row);
                callback();

                if (iRow == environment.triangle.size)
                    environment.divTriangle.scrollIntoView({behavior: "smooth", block: "end"});
            }, 300, this, eraseRow, this.iRow, callback)
        );
    }



    deleteLastRow(callback) {
        var idTimeout = this.rowsBeingCreated[this.rowsBeingCreated.length-1];
        clearTimeout( idTimeout );
        this.rowsBeingCreated.pop();
        this.deleteRow(callback);
        this.iRow--;
    }



    engineeringNotation(value) {
        if (value > 999) {
            value = String(value);

            var digits = value.length % 3;
            if (digits == 0)
                digits = 3;

            var exponent = (value.length - digits) / 3 - 1;
            var suffix = ["k", "M", "G", "T", "P", "E", "Z", "Y"];

            if (digits == 1)
                return value.substring(0, 1) + "." + value.substring(1, 2) + suffix[exponent];
            else
                return value.substring(0, digits) + suffix[exponent];
        } else
            return value;
    }
}

var displayTriangle = new DisplayTriangle(document.getElementById("triangle"), 6);