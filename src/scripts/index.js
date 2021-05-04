import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/small.css';
import '../styles/medium.css';
import '../styles/large.css';
import '../styles/xlarge.css';
import * as data from '../DATA.json';
import App from './app';

console.log('Halo...');

const app = new App({
    openBtn: document.querySelector('#openNav'),
    closeBtn: document.querySelector('#closeNav'),
    sideNav: document.querySelector('.sidenav'),
    contentList: document.querySelector('#contentList'),
    dataResto: data
});

const resultData = app.readJSON();
window.onload = resultData;
