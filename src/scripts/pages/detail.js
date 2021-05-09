/* eslint-disable no-shadow */
import sourceData from '../controllers/source';
import CONFIG from '../controllers/configuration';
import UrlParser from '../routes/url-parser';
// import LikeButtonInitiator from '../like-button-initiator';

const Detail = {
    async render() {
        return `
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
        const data = await sourceData.detailResto(url.id);
        console.log(data.restaurant);

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
                        <img src="./images/foods.jpg" alt="${d.name}">
                        <span>${d.name}</span>
                    </div>
                </div>
            `;
        });

        data.restaurant.menus.drinks.forEach((d) => {
            drinkList += `
                <div class="food-card">
                    <div class="food-card-body">
                        <img src="./images/drinks.jpg" alt="${d.name}">
                        <span>${d.name}</span>
                    </div>
                </div>
            `;
        });

        data.restaurant.customerReviews.forEach((d) => {
            reviewList += `
            <table class="review-item" width="100%" border="1">
                <tr>
                    <td width="1%"><img src="./images/user.jpg" alt="User"></td>
                    <td valign="top" width="16%"><span>${d.name || 'Anonymous'}</span></td>
                    <td valign="top"><span>${d.review}</span></td>
                </tr>
            </table>
            `;
        });

        componentDetail += `
            <div class="breadcrumb">
                <div>
                    <a class="page-home" href="/#">Daftar Restoran</a> /
                    <a class="page-now" href="javascript:void(0)">${data.restaurant.name}</a>
                </div>
            </div>

            <div class="wrapper col-2" id="contentbody" style="margin-top: 50px;">
                <div class="img-banner">
                    <img src="${CONFIG.BASE_IMAGE_URL_MEDIUM + data.restaurant.pictureId}" alt="Banner Resto">
                </div>
                <div class="detail-title">
                    <h1>${data.restaurant.name}</h1>
                    <div>
                        ${listCategory}
                    </div>
                    <div class="address-title">Alamat:</div>
                    <div class="address-value">${data.restaurant.address} - ${data.restaurant.city}</div>

                    <div class="desc-title">Deskripsi:</div>
                    <div class="desc-value partial" id="desc">${data.restaurant.description}</div>
                    <a href="javascript:void(0)" onclick="klikSelengkapnya()" id="btnSelengkapnya"
                        class="desc-full show">Selengkapnya</a>
                    <a href="javascript:void(0)" onclick="klikSembunyi()" id="btnSembunyi"
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
                    <span>${data.restaurant.rating}</span> dari 5
                    <div class="star">
                        <img src="./images/star.png" alt="Star Review">
                    </div>
                </div>
                ${reviewList}
            </div>
        `;

        document.querySelector('#detailcontents').innerHTML = componentDetail;

        // document.querySelector('#restoName').innerHTML = 'DETAIL RESTORAN';
        // document.querySelector('#detail').innerHTML = dataDetail;

        // LikeButtonInitiator.init({
        //     likeButtonContainer: document.querySelector('#likeButtonContainer'),
        //     data: {
        //         id: data.restaurant.id,
        //         name: data.restaurant.name,
        //         description: data.restaurant.description,
        //         rating: data.restaurant.rating,
        //         pictureId: data.restaurant.pictureId,
        //         city: data.restaurant.city,
        //     },
        // });
    },
};

export default Detail;
