import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/small.css';
import '../styles/medium.css';
import '../styles/large.css';
import '../styles/xlarge.css';
import App from './app';

console.log('Hello Coders! :)');

const app = new App({
    openbtn: document.querySelector('#openNav'),
    closebtn: document.querySelector('.main')
});
