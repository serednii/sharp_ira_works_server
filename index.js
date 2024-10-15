const sharp = require('sharp');

sharp('./input_img/2019_0002.jpg')
    .resize(300, 200) // Зміна розміру
    .toFile('./output_img/2019_0002.jpg', (err, info) => {
        if (err) throw err;
        console.log(info);
    });