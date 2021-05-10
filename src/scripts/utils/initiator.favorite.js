import FavoriteIdb from '../controllers/database';

const LikeButtonInitiator = {
    async init({ likeButtonContainer, data }) {
        this._likeButtonContainer = likeButtonContainer;
        this._data = data;

        await this._renderButton();
    },

    async _renderButton() {
        const { id } = this._data;
        if (await this._isDataExist(id)) {
            this._renderLiked();
        } else {
            this._renderLike();
        }
    },

    async _isDataExist(id) {
        const restoran = await FavoriteIdb.getFavorite(id);
        return !!restoran;
    },

    _renderLike() {
        this._likeButtonContainer.innerHTML = `
        <button aria-label="Klik kalau suka" id="likeButton" class="btn-favorite">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#b98f65" d="M21.406 9.558c-1.21-.051-2.87-.278-3.977-.744.809-3.283 1.253-8.814-2.196-8.814-1.861 0-2.351 1.668-2.833 3.329-1.548 5.336-3.946 6.816-6.4 7.401v-.73h-6v12h6v-.904c2.378.228 4.119.864 6.169 1.746 1.257.541 3.053 1.158 5.336 1.158 2.538 0 4.295-.997 5.009-3.686.5-1.877 1.486-7.25 1.486-8.25 0-1.648-1.168-2.446-2.594-2.506zm-17.406 10.442h-2v-8h2v8zm15.896-5.583s.201.01 1.069-.027c1.082-.046 1.051 1.469.004 1.563l-1.761.099c-.734.094-.656 1.203.141 1.172 0 0 .686-.017 1.143-.041 1.068-.056 1.016 1.429.04 1.551-.424.053-1.745.115-1.745.115-.811.072-.706 1.235.109 1.141l.771-.031c.822-.074 1.003.825-.292 1.661-1.567.881-4.685.131-6.416-.614-2.239-.965-4.438-1.934-6.959-2.006v-6c3.264-.749 6.328-2.254 8.321-9.113.898-3.092 1.679-1.931 1.679.574 0 2.071-.49 3.786-.921 5.533 1.061.543 3.371 1.402 6.12 1.556 1.055.059 1.024 1.455-.051 1.584l-1.394.167s-.608 1.111.142 1.116z"/></svg>
        </button>`;

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await FavoriteIdb.putFavorite(this._data);
            this._renderButton();
        });
    },

    _renderLiked() {
        this._likeButtonContainer.innerHTML = `
        <button aria-label="Klik kalau gak jadi suka" id="likedButton" class="btn-favorite">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#f89835" d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z"/></svg>
        </button>`;

        const likeButton = document.querySelector('#likedButton');
        likeButton.addEventListener('click', async () => {
            await FavoriteIdb.deleteFavorite(this._data.id);
            this._renderButton();
        });
    },
};

export default LikeButtonInitiator;
