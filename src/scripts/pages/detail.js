/* eslint-disable no-shadow */
import sourceData from '../controllers/source';
import CONFIG from '../controllers/configuration';
import UrlParser from '../routes/url.parser';
import LikeButtonInitiator from '../utils/initiator.favorite';

const Detail = {
    async render() {
        return `
            <div id="loading"><img src="./images/loading.svg" alt="Loading..." loading="lazy"></div>
            <div id="detailcontents"></div>
        `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        let componentDetail = '';
        let listCategory = '';
        let foodList = '';
        let drinkList = '';
        let reviewList = '';
        let notifError = '';

        const data = await sourceData.detailResto(url.id);

        notifError += `
            <div class="error">
                <img class="img-error" src="./images/error.svg" alt="Error" loading="lazy">
                <h2 class="text-error">Ooops... Ada yang gak beres nih. Sabar ya, Tim kami sedang memperbaikinya.</h2>
            </div>
        `;

        if (data.error !== true) {
            data.restaurant.categories.forEach((d) => {
                listCategory += `
                    <div class="category-item">
                        <span class="tjb-title">${d.name}</span>
                    </div>
                `;
            });

            data.restaurant.menus.foods.forEach((d) => {
                foodList += `
                    <div class="food-card">
                        <div class="food-card-body">
                            <img src="./images/foods.jpg" alt="${d.name}" loading="lazy">
                            <span>${d.name}</span>
                        </div>
                    </div>
                `;
            });

            data.restaurant.menus.drinks.forEach((d) => {
                drinkList += `
                    <div class="food-card">
                        <div class="food-card-body">
                            <img src="./images/drinks.jpg" alt="${d.name}" loading="lazy">
                            <span>${d.name}</span>
                        </div>
                    </div>
                `;
            });

            data.restaurant.customerReviews.forEach((d) => {
                reviewList += `
                <div class="review-layout" id="ree">
                    <div class="review-image">
                        <img class="review-user-image" src="./images/user.jpg" alt="User ${d.name || 'Anonymous'}" loading="lazy">
                    </div> 
                    <div class="review-content">
                        <div class="review-user-name">
                            ${d.name || 'Anonymous'}
                        </div>
                        <div class="review-user-date">
                            ${d.date}
                        </div>
                        <div class="review-user-value">${d.review || 'Komentar mengandung spam'}</div>
                    </div>
                </div>
                `;
            });

            componentDetail += `
                <div class="breadcrumb">
                    <div>
                        <a class="page-home" href="/#">Daftar Restoran</a> /
                        <a class="page-now" href="javascript:void(0)">${data.restaurant.name}</a>
                    </div>
                </div>

                <div class="wrapper col-2" id="contentbody">
                    <div class="img-banner">
                        <img src="${CONFIG.BASE_IMAGE_URL_MEDIUM + data.restaurant.pictureId}" alt="Banner Resto" loading="lazy">
                    </div>
                    <div class="detail-title">
                    
                        <div id="containerFavorite">
                            <div id="titleResto">
                                <h1>${data.restaurant.name}</h1>
                            </div>
                            <div id="likeButtonContainer"></div>
                        </div>

                        <div style="margin-top: 10px;">
                            ${listCategory}
                        </div>
                        <div class="address-title">Alamat:</div>
                        <div class="address-value">${data.restaurant.address} - ${data.restaurant.city}</div>

                        <div class="desc-title">Deskripsi:</div>
                        <div class="desc-value partial" id="desc">${data.restaurant.description}</div>
                        <a href="javascript:void(0)" id="btnSelengkapnya"
                            class="desc-full show">Selengkapnya</a>
                        <a href="javascript:void(0)" id="btnSembunyi"
                            class="desc-secret hide">Sembunyikan</a>
                    </div>
                </div>

                <div class="food-title">Makanan:</div>
                <div class="wrapper col-4">
                    ${foodList}
                </div>

                <div class="drink-title">Minuman:</div>
                <div class="wrapper col-4">
                    ${drinkList}
                </div>

                <div class="review-title">Penilaian:</div>
                <div class="wrapper col-1">  
                    <div class="review">
                        <span class="review-star-value">${data.restaurant.rating}</span> dari 5
                        <div class="star">
                            <img src="./images/star.png" alt="Star Review" loading="lazy">
                        </div>
                        <div class="col-review">
                            <input type="text" name="name" class="input-name" id="reviewName" placeholder="Nama kamu...">
                            <textarea name="review" id="reviewValue" rows="5" placeholder="Tulis review kamu disini..."></textarea><br>
                            <div style="font-size:12px; color: red;" id="errorReview"></div>
                            <button class="btn-kirim" id="kirimReview">Kirim Review</button>
                        </div>
                    </div>
                    <div class="mt-50 mb-50">
                        ${reviewList}
                    </div>
                </div>
            `;

            document.querySelector('#detailcontents').innerHTML = componentDetail;
            document.querySelector('#loading').innerHTML = '';

            document.querySelector('#btnSelengkapnya').addEventListener('click', (event) => {
                const elementDesc = document.getElementById('desc');
                const elementBtnSelengkapnya = document.getElementById('btnSelengkapnya');
                const elementBtnSembunyi = document.getElementById('btnSembunyi');

                elementDesc.className = elementDesc.className.replace(/\bpartial\b/g, 'full');
                elementBtnSelengkapnya.className = elementBtnSelengkapnya.className.replace(/\bshow\b/g, 'hide');
                elementBtnSembunyi.className = elementBtnSembunyi.className.replace(/\bhide\b/g, 'show');
                event.stopPropagation();
            });

            document.querySelector('#btnSembunyi').addEventListener('click', (event) => {
                const elementDesc = document.getElementById('desc');
                const elementBtnSelengkapnya = document.getElementById('btnSelengkapnya');
                const elementBtnSembunyi = document.getElementById('btnSembunyi');

                elementDesc.className = elementDesc.className.replace(/\bfull\b/g, 'partial');
                elementBtnSelengkapnya.className = elementBtnSelengkapnya.className.replace(/\bhide\b/g, 'show');
                elementBtnSembunyi.className = elementBtnSembunyi.className.replace(/\bshow\b/g, 'hide');
                event.stopPropagation();
            });

            document.querySelector('#kirimReview').addEventListener('click', () => {
                const nameReview = document.getElementById('reviewName').value;
                const isiReview = document.getElementById('reviewValue').value;
                this.postReview(data.restaurant.id, nameReview, isiReview);
            });

            LikeButtonInitiator.init({
                likeButtonContainer: document.querySelector('#likeButtonContainer'),
                data: {
                    id: data.restaurant.id,
                    name: data.restaurant.name,
                    description: data.restaurant.description,
                    rating: data.restaurant.rating,
                    pictureId: data.restaurant.pictureId,
                    city: data.restaurant.city,
                },
            });
        } else {
            document.querySelector('#loading').innerHTML = '';
            document.querySelector('#maincontent').innerHTML = notifError;
        }
    },
    async postReview(id, name, review) {
        if (name && review) {
            const addReview = await sourceData.addReview(id, name, review);
            if (addReview.message == 'success') {
                window.location.reload();
            }
        } else {
            document.getElementById('reviewName').classList.add('input-error');
            document.getElementById('reviewValue').classList.add('input-error');
            document.querySelector('#errorReview').innerHTML = 'Harap lengkapi semua input terlebih dahulu !';
        }
    },
};

export default Detail;
