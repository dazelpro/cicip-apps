import sourceData from '../controllers/source';
import CONFIG from '../controllers/configuration';

const Home = {
    async render() {
        return `
            <div class="section-title">
                <h2>Explore Restaurant</h2>
                <p>Lihat makanan-makanan enak dan pilih yang kamu suka.</p>
            </div>
            <div class="wrapper col-4" id="contentList"></div>
        `;
    },

    async afterRender() {
        const resto = await sourceData.listResto();
        console.log(resto);
        let dataList = '';
        resto.restaurants.forEach((d) => {
            dataList += `
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
        document.querySelector('#contentList').innerHTML = dataList;
    },
};

export default Home;
