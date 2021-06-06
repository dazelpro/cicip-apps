/* eslint-disable no-undef */
Feature('Liking Restaurants');

Before(({ I }) => {
    I.amOnPage('/#/');
});

Scenario('Like unlike a restaurant', ({ I }) => {
    // Saya melihat text "Explore Restaurant" di tag "h2"
    I.see('Explore Restaurant', 'h2');

    // Saya melihat list restoran dan mengklik restoran urutan pertama
    I.seeElement('#contentList a');
    I.click(locate('#contentList a').first());

    // Pada restoran yang saya klik, saya melihat tombol like dan mengklik tombol tersebut
    I.seeElement('#likeButton');
    I.click('#likeButton');

    // Lalu saya pergi ke halaman Favorite dan mengklik restoran yang telah saya sukai sebelumya
    I.amOnPage('/#/favorite');
    I.seeElement('#contentList a');
    I.click(locate('#contentList a').first());

    // Pada restoran favorit yang saya klik, saya melihat tombol unlike dan mengklik tombol tersebut
    I.seeElement('#likedButton');
    I.click('#likedButton');

    // Kemudian saya pergi ke halaman Favorite lagi dan memastikan tidak ada restoran yg disukai
    I.amOnPage('/#/favorite');
    I.see('Maaf... Belum ada Resto yang kamu sukai.', 'h2');
});
