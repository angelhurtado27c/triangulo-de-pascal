class DisplayTriangle {
    constructor( element, size ) {
        this.colors = new Colors( "color", "values" );

        this.triangle = new PascalTriangle( size );
        this.divTriangle = element;
        this.iRow;

        for ( this.iRow = 0; this.iRow < size; this.iRow++ )
            this.addRow( this.iRow );

        this.iRow--;
    }

    addRow( i ) {
        var newRow = document.createElement("div");
        newRow.id = "row" + this.iRow;
        newRow.className = "row";

        var values = this.triangle.triangle[ i ];
        for ( var value of values ) {
            var div = document.createElement("div");
            div.environment = this;
            div.innerHTML = value;
            newRow.appendChild( div );

            div.addEventListener("mousemove", this.moveChangeColor);
            div.addEventListener("click", this.clickChangeColor);
        }

        this.divTriangle.appendChild( newRow );
    }

    addLastRow() {
        this.iRow++;
        this.triangle.addRow();
        this.addRow( this.triangle.size-1 );
    }

    deleteLastRow() {
        var hijos = document.querySelectorAll("#row" + this.iRow + " div");
        for ( var hijo of hijos ) {
            hijo.removeEventListener("mousemove", this.moneChangeColor);
            hijo.removeEventListener("click", this.clickChangeColor);
        }

        this.triangle.deleteLastRow();
        this.divTriangle.removeChild( document.getElementById("row" + this.iRow) );
        this.iRow--;
    }

    moveChangeColor(details) {
        if (details.buttons == 1) {
            this.style.background = this.environment.colors.background;
            this.style.color = this.environment.colors.color;
        }
    }

    clickChangeColor(details) {
        this.style.background = this.environment.colors.background;
        this.style.color = this.environment.colors.color;
    }
}