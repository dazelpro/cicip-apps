import FavoriteIdb from '../controllers/database';
import CONFIG from '../controllers/configuration';

const Favorite = {
    async render() {
        return `
            <div class="breadcrumb">
                <div>
                    <a class="page-home" href="/#">Daftar Restoran</a> /
                    <a class="page-now" href="javascript:void(0)">Restoran Favorite</a>
                </div>
            </div>
            <div class="section-title" id="contentbody">
                <div class="favorite-title">
                    <h1 class="fav-h1">Favorite</h1>
                    <div class="fav-div">Daftar Restoran yang kamu Sukai</div>
                </div>
                <div class="wrapper col-4" id="contentList"></div>
                <div class="no-data"></div>
            </div>
        `;
    },

    async afterRender() {
        const resto = await FavoriteIdb.getAllFavorite();
        let listFavorite = '';
        if (resto.length === 0) {
            document.querySelector('.no-data').innerHTML = 'Oops.. Belum ada Resto yang kamu sukai 😞';
        } else {
            resto.forEach((d) => {
                listFavorite += `
                <a href="/#/detail/${d.id}" class="card">
                    <img src="${CONFIG.BASE_IMAGE_URL_SMALL + d.pictureId}" alt="${d.name}">
                    <div class="card-body">
                        <div class="city">Kota ${d.city}</div>
                        <div class="name">${d.name}</div>
                        <div class="rating">⭐ ${d.rating}</div>
                        <div class="desc">${d.description}</div>
                    </div>
                </a>
                `;
            });
            document.querySelector('#contentList').innerHTML = listFavorite;
        }
    },
};

export default Favorite;
