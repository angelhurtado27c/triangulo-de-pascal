function appearDisappearInitiate(element, entry, out) {
    element.appearDisappear = {
        element: element,
        entry: entry,
        out: out,
        animationEntry: entry[0] + " " + entry[1].toString() + "s " + entry[2] + " " + entry[3],
        animationOut: out[0] + " " + out[1].toString() + "s " + out[2] + " " + out[3],
        tEntry: entry[1]*1000,
        tOut: out[1]*1000,
        stateAppearDisappear: 0,
        appearDisappear: appearDisappear,
        hidden: hidden,
        appear: appear,
        appearOk: appearOk,
        visible: visible,
        disappear: disappear,
        disappearOk: disappearOk,
        callback: callback,
        timeOut: null
    }

    /*
        0 - hidden
        1 - appear
        2 - visible
        3 - disappear
    */

    function appearDisappear() {
        var state = this.stateAppearDisappear;

        switch (state) {
            case 0:
                this.appear();
                break;

            case 1:
                this.visible();
                break;

            case 2:
                this.disappear();
                break;

            case 3:
                this.hidden();
                break
                
            default:
                console.log("I think you're a little lost");
        }
    }

    function hidden() {
        clearTimeout(this.timeOut);
        this.element.style.display = "none";
        this.stateAppearDisappear = 0;
    }

    function appear() {
        clearTimeout(this.timeOut);
        this.stateAppearDisappear = 1;
        var element = this.element;
        element.style.animation = this.animationEntry;
        element.style.display = null;
        this.timeOut = setTimeout(this.appearOk, this.tEntry, this, arguments);
    }

    function appearOk(element, arg) {
        element.stateAppearDisappear = 2;

        if (arg[0] != null)
            element.callback(arg);
    }

    function visible() {
        clearTimeout(this.timeOut);
        var element = this.element;
        element.style.animation = null;
        element.style.display = null;
        this.stateAppearDisappear = 2;
    }

    function disappear() {
        clearTimeout(this.timeOut);
        this.stateAppearDisappear = 3;
        var element = this.element;
        element.style.animation = this.animationOut;
        element.style.display = null;
        this.timeOut = setTimeout(this.disappearOk, this.tOut, this, arguments);
    }

    function disappearOk(element, arg) {
        element.element.style.display = "none";
        element.stateAppearDisappear = 0;

        if (arg[0] != null)
            element.callback(arg);
    }

    function callback(arg) {
        if (arg[1] != null)
            arg[0](arg[1]);
        else
            arg[0]();
    }
}