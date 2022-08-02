class PascalTriangle {
    constructor( size ) {
        this.size;
        this.triangle = [[1], [1, 1]];
        this.lastRow;
        this.limitCol;
        this.previousRow;

        for ( var row = 2; row < size; row++ )
            this.addRow();
    }

    addRow() {
        this.triangle.push( [1] );
        this.lastRow = this.triangle.length - 1;
        this.previousRow = this.lastRow - 1;

        this.limitCol = parseInt( this.lastRow/2 ) + 1;
        for ( var col = 1; col < this.limitCol; col++ ) {
            var n = this.triangle[this.previousRow][col-1] + this.triangle[this.previousRow][col];
            this.triangle[this.lastRow][col] = n;
            this.triangle[this.lastRow][this.lastRow-col] = n;
        }

        this.triangle[this.lastRow].push( 1 );
        this.size = this.triangle.length;
    }

    deleteLastRow() {
        this.triangle.pop();
        this.size = this.triangle.length;
    }
}