const express = require('express');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const cors = require('cors');

const app = express();
app.use(cors()); 

i18next.use(Backend).init({
    lng: 'vi', 
    fallbackLng: 'zh',
    backend: { loadPath: './locales/{{lng}}.json' }
}, (err, t) => {
    if (err) return console.error(err);
    console.log('多國語系系統就緒');
});

app.get('/guide/:lang', (req, res) => {
    const lang = req.params.lang;
    i18next.changeLanguage(lang, () => {
        res.json({
            title: i18next.t('CPR.TITLE'),
            steps: [
                { text: i18next.t('CPR.STEP_1'), img: "/images/cpr1.jpg" },
                { text: i18next.t('CPR.STEP_2'), img: "/images/cpr2.png" }
            ]
        });
    });
});

app.use('/images', express.static('images'));
app.listen(3000, () => {
    console.log('伺服器執行在 http://localhost:3000');
});