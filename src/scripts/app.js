class App {
    constructor({ openbtn, closebtn }) {
        this._openbtn = openbtn;
        this._closebtn = closebtn;
        this.onLoad();
    }

    onLoad() {
        this._openbtn.addEventListener('click', (event) => {
            document.getElementById("mySidenav").style.width = "250px";
            event.stopPropagation();
        });

        this._closebtn.addEventListener('click', (event) => {
            document.getElementById("mySidenav").style.width = "0";
            event.stopPropagation();
        });
    }
}

export default App;
