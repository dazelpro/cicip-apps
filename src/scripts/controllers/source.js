import CONFIG from './configuration';

class sourceData {
    static async listResto() {
        const response = await fetch(`${CONFIG.BASE_URL}list`);
        const responseJson = await response.json();
        return responseJson;
    }

    static async detailResto(id) {
        const response = await fetch(`${CONFIG.BASE_URL}detail/${id}`);
        return response.json();
    }
}

export default sourceData;
