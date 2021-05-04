class App {
    constructor({ openBtn, closeBtn, sideNav, contentList, dataResto }) {
        this._openBtn = openBtn;
        this._closeBtn = closeBtn;
        this._sideNav = sideNav;
        this._dataResto = dataResto;
        this._contentList = contentList;
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

    readJSON() {
        const resto = this._dataResto['default']['restaurants'];
        let listResto = '';
        resto.forEach((d) => {
            listResto += `
            <div class="card">
                <img src="${d.pictureId}" alt="${d.name}">
                <div class="card-body">
                    <div class="city">Kota ${d.city}</div>
                    <div class="name">${d.name}</div>
                    <div class="rating">⭐ ${d.rating}</div>
                    <div>${d.description.substring(0,80)+'...'}</div>
                </div>
            </div>
            `
        });
        this._contentList.innerHTML = listResto;
    }
}

export default App;
