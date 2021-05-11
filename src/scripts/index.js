import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/small.css';
import '../styles/medium.css';
import '../styles/large.css';
import '../styles/xlarge.css';
import App from './app';
import swRegister from './pwa/service.worker.register';

const app = new App({
    openBtn: document.querySelector('#openNav'),
    closeBtn: document.querySelector('#closeNav'),
    sideNav: document.querySelector('.sidenav'),
    mainContent: document.querySelector('#maincontent'),
});

window.addEventListener('hashchange', () => {
    app.renderPage();
});

window.addEventListener('load', () => {
    app.renderPage();
    swRegister();
});
