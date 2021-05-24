import LikeButtonInitiator from '../src/scripts/utils/initiator.favorite';
import FavoriteIdb from '../src/scripts/controllers/database';

describe('Like a Restaurant', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };
   
    beforeEach(() => {
        addLikeButtonContainer();
    });
   
    // Harusnya tombol like tampil
    it('Should show the like button when the Restaurant has not been liked before', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            data: {
                id: 1,
            },
        });
        expect(document.querySelector('[aria-label="Klik kalau suka"]')).toBeTruthy();
    });
   
    // Harusnya tombol dont like tidak tampil
    it('Should not show the unlike button when the Restaurant has not been liked before', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            data: {
                id: 1,
            },
        });
        expect(document.querySelector('[aria-label="Klik kalau gak jadi suka"]')).toBeFalsy();
    });
   
    // Harusnya berhasil like resto
    it('Should be able to like a Restaurant', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            data: {
                id: 1,
            },
        });
   
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));
        const resto = await FavoriteIdb.getFavorite(1);

        expect(resto).toEqual({ id: 1 });
        
        FavoriteIdb.deleteFavorite(1);
    });

    // Harusnya resto yg sudah ada di db tidak diinsert kembali
    it('Should not add a Restaurant again when its already liked', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            data: {
                id: 1,
            },
        });
        await FavoriteIdb.putFavorite({ id: 1 });
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));
        expect(await FavoriteIdb.getAllFavorite()).toEqual([{ id: 1 }]);
        FavoriteIdb.deleteFavorite(1);
    });
  });