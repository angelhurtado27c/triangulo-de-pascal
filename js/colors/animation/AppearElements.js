function appearDisappearElements(elements, entry, out, t) {
    var appearDisappearElements = {
        elements: elements,
        t: t,
        length: elements.length-1,
        iElement: 0,
        stateAppearDisappear: 0,
        appearDisappear: appearDisappear,
        onlyDisappear: onlyDisappear,
        hidden: hidden,
        disappear: disappear,
        disappearNext: disappearNext,
        disappearAll: disappearAll,
        appear: appear,
        appearNext: appearNext,
        stateOk: stateOk,
        appearAll: appearAll,
        visible: visible,
        interval: null,
        timeout: null
    }
    
    var i = appearDisappearElements.length;
    for ( var element of elements ) {
        element.style.display = "none";
        element.style.zIndex = String(i);
        i--;
        appearDisappearInitiate(element, entry, out);
    }


    /*
        0   hidden          Todos ocultos
        1   appear          Apareciendo con intervalo
        2   appearAll       Apareciendo sin intervalo
        3   visibleAll      Siendo visibles sin animación
        4   visible         Todos visibles
        5   disappear       Desapareciendo con intervalo
        6   disappearAll    Desapareciendo sin intervalo
        7   hiddenAll       Ocultos sin animación ni intervalo
    */

    function appearDisappear() {
        clearInterval(this.interval);
        clearTimeout(this.timeout);

        var state = this.stateAppearDisappear;

        switch (state) {
            case 1:
                this.appearAll();
                break;
            
            case 2:
                this.visible();
                break;
            
            case 3:

            case 4:
                this.disappear();
                break;
            
            case 5:
                this.disappearAll();
                break;
            
            case 6:
                this.hidden();
                break;
            
            case 0:

            case 7:
                this.appear();
                break;
            
            default:
                console.log("I think you're a little lost");
        }
    }

    function onlyDisappear() {
        clearInterval(this.interval);
        clearTimeout(this.timeout);

        var state = this.stateAppearDisappear;

        switch (state) {
            case 5:
                this.disappearAll();
                break;
            
            case 6:
                this.hidden();
                break;
            
            case 0:

            case 7:
                this.appear();
                break;
            
            default:
                this.disappear();
        }
    }



    // appear

    function appear() {
        this.stateAppearDisappear = 1;
        this.elements[this.iElement].appearDisappear.appear();
        this.interval = setInterval(appearNext, this.t, this);
    }

    function appearNext(environment) {
        environment.iElement++;
        var element = environment.elements[environment.iElement];
        element.appearDisappear.appear();

        if ( environment.iElement == environment.length ) {
            clearInterval(environment.interval);
            environment.stateAppearDisappear = 2;
            
            var t = element.appearDisappear.entry[1]*1000;
            environment.timeout = setTimeout(environment.stateOk, t, environment, 4);
        }
    }



    // appearAll

    function appearAll() {
        this.stateAppearDisappear = 2;
        
        while (this.stateAppearDisappear == 2) {
            this.iElement++;
            this.elements[this.iElement].appearDisappear.appear();

            if (this.iElement == this.length)
                break;
        }

        var t = this.elements[this.iElement].appearDisappear.entry[1]*1000;
        this.timeout = setTimeout(this.stateOk, t, this, 4);
    }



    // visible

    function visible() {
        this.stateAppearDisappear = 3;
        this.iElement = -1;

        while (this.stateAppearDisappear == 3) {
            this.iElement++;
            this.elements[this.iElement].appearDisappear.visible();

            if (this.iElement == this.length)
                this.stateAppearDisappear = 4;
        }
    }



    // disappear

    function disappear() {
        this.stateAppearDisappear = 5;
        this.elements[this.iElement].appearDisappear.disappear();
        this.interval = setInterval(disappearNext, this.t, this);
    }

    function disappearNext(environment) {
        environment.iElement--;
        var element = environment.elements[environment.iElement];
        element.appearDisappear.disappear();

        if ( environment.iElement == 0 ) {
            clearInterval(environment.interval);
            environment.stateAppearDisappear = 6;

            var t = element.appearDisappear.out[1]*1000;
            environment.timeout = setTimeout(environment.stateOk, t, environment, 0);
        }
    }



    // disappearAll

    function disappearAll() {
        this.stateAppearDisappear = 6;
        
        while (this.stateAppearDisappear == 6) {
            this.iElement--;
            this.elements[this.iElement].appearDisappear.disappear();

            if (this.iElement == 0)
                break;
        }

        var t = this.elements[this.iElement].appearDisappear.entry[1]*1000;
        this.timeout = setTimeout(this.stateOk, t, this, 0);
    }



    // hidden

    function hidden() {
        this.stateAppearDisappear = 7;
        this.iElement = this.length + 1;

        while (this.stateAppearDisappear == 7) {
            this.iElement--;
            this.elements[this.iElement].appearDisappear.hidden();

            if (this.iElement == 0)
                this.stateAppearDisappear = 0;
        }
    }



    // stateOk

    function stateOk(environment, state) {
        environment.stateAppearDisappear = state;
    }



    return appearDisappearElements;
}