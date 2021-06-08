import sourceData from '../controllers/source';
import CONFIG from '../controllers/configuration';

const Home = {
    async render() {
        return `
            
            <div id="loading"><img src="./images/loading.svg" alt="Loading..." loading="lazy"></div>
            <div class="section-title" id="contentbody">
                <h2>Explore Restaurant</h2>
                <p>Lihat makanan-makanan enak dan pilih yang kamu suka.</p>
            </div>
            <div class="wrapper col-4" id="contentList"></div>
        `;
    },

    async afterRender() {
        let dataList = '';
        let notifError = '';
        notifError += `
            <div class="error">
                <img class="img-error" src="./images/error.svg" alt="Error" loading="lazy">
                <h2 class="text-error">Ooops... Ada yang gak beres nih. Sabar ya, Tim kami sedang memperbaikinya.</h2>
            </div>
        `;

        const resto = await sourceData.listResto();
        if (resto.error !== true) {
            resto.restaurants.forEach((d) => {
                dataList += `
                <a href="/#/detail/${d.id}" class="card">
                    <img loading="lazy" src="${CONFIG.BASE_IMAGE_URL_SMALL + d.pictureId}" alt="${d.name}">
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
        } else {
            document.querySelector('#maincontent').innerHTML = notifError;
        }
        document.querySelector('#loading').innerHTML = '';
    },
};

export default Home;
