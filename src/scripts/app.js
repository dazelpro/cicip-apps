class App {
    constructor({ openBtn, closeBtn, sideNav }) {
        this._openBtn = openBtn;
        this._closeBtn = closeBtn;
        this._sideNav = sideNav;
        this.onLoad();
    }

    onLoad() {
        this._openBtn.addEventListener('click', (event) => {
            this._sideNav.style.width = "250px";
            event.stopPropagation();
        });

        this._closeBtn.addEventListener('click', (event) => {
            this._sideNav.style.width = "0";
            event.stopPropagation();
        });
    }
}

export default App;
