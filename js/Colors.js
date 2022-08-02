class Colors {
    constructor( idBtn, idFather ) {
        this.background = "#ff3f6d";
        this.color = "#fff"

        this.btn = document.getElementById( idBtn );
        this.father = document.getElementById( idFather );
        this.sons = document.querySelectorAll( "." + idFather + ">div");

        this.beginColors();
        this.beginBtnColor();
    }

    beginColors() {
        for (var color of this.sons) {
            color.background = "#ff3f6d";
            color.color = "#fff"
            color.environment = this;

            color.addEventListener("click", function() {
                this.environment.background = this.background;
                this.environment.color = this.color;
                this.environment.father.classList.add("hidden");
            });
        }

        this.sons[4].color = "#000";
        this.sons[4].background = "#3fff6d";

        this.sons[3].background = "#3f6dff";

        this.sons[2].background = "#ffff3f";
        this.sons[2].color = "#000";

        this.sons[1].background = "#fff";
        this.sons[1].color = "#000";

        this.sons[0].background = "#000";
    }

    beginBtnColor() {
        this.btn.environment = this;

        this.btn.addEventListener("click", function() {
            this.environment.father.classList.toggle("hidden");
        });
    }
}