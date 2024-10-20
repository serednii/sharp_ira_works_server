
// const express = require('express');
// const multer = require('multer');
// const sharp = require('sharp');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');

// // Створимо директорію для збереження зображень, якщо вона не існує
// const imagesDir = path.join(__dirname, 'processed_images');
// if (!fs.existsSync(imagesDir)) {
//     fs.mkdirSync(imagesDir);
// }

// // Функція для створення сервера
// const createServer = (port) => {
//     const app = express();

//     // Використовуємо CORS для дозволу запитів з інших доменів
//     app.use(cors());

//     // Налаштування multer для завантаження файлів
//     const storage = multer.memoryStorage();
//     const upload = multer({ storage: storage });

//     // Функція обробки зображень
//     const processImages = async (req, res) => {

//         if (!req.files || req.files.length === 0) {
//             return res.status(400).send('Будь ласка, завантажте зображення');
//         }

//         const processType = req.body.processType;
//         const processedImages = [];

//         try {
//             for (let i = 0; i < req.files.length; i++) {
//                 let processedImageBuffer, processedImageFile;
//                 const fileName = `processed_${Date.now()}_${i}.jpg`;
//                 const filePath = path.join(imagesDir, fileName);

//                 // Обробляємо зображення в буфері та зберігаємо його у файл
//                 switch (processType) {
//                     case 'resize':
//                         const width = parseInt(req.body.resizeWidth) || 300;
//                         const height = parseInt(req.body.resizeHeight) || 300;
//                         processedImageBuffer = await sharp(req.files[i].buffer).resize(width, height).toBuffer();
//                         break;
//                     case 'grayscale':
//                         processedImageBuffer = await sharp(req.files[i].buffer).grayscale().toBuffer();
//                         break;
//                     case 'rotate':
//                         const degrees = parseInt(req.body.rotateDegrees) || 90;
//                         processedImageBuffer = await sharp(req.files[i].buffer).rotate(degrees).toBuffer();
//                         break;
//                     case 'blur':
//                         const blurLevel = parseFloat(req.body.blurLevel) || 5;
//                         processedImageBuffer = await sharp(req.files[i].buffer).blur(blurLevel).toBuffer();
//                         break;
//                     case 'brightness':
//                         const brightnessLevel = parseFloat(req.body.brightnessLevel) || 1;
//                         processedImageBuffer = await sharp(req.files[i].buffer).modulate({ brightness: brightnessLevel }).toBuffer();
//                         break;
//                     case 'contrast':
//                         const contrastLevel = parseFloat(req.body.contrastLevel) || 1;
//                         processedImageBuffer = await sharp(req.files[i].buffer).modulate({ contrast: contrastLevel }).toBuffer();
//                         break;
//                     case 'crop':
//                         const cropWidth = parseInt(req.body.cropWidth) || 300;
//                         const cropHeight = parseInt(req.body.cropHeight) || 300;
//                         processedImageBuffer = await sharp(req.files[i].buffer).extract({ width: cropWidth, height: cropHeight, left: 0, top: 0 }).toBuffer();
//                         break;
//                     default:
//                         return res.status(400).send('Невідомий тип обробки');
//                 }

//                 // Записуємо буфер у файл
//                 fs.writeFileSync(filePath, processedImageBuffer);


//                 // Формуємо Base64 та URL для збереженого зображення
//                 const imageBase64 = `data:image/jpeg;base64,${processedImageBuffer.toString('base64')}`;
//                 const imageUrl = `http://localhost:${port}/images/${fileName}`;

//                 // Додаємо об'єкт з посиланням та Base64 у масив
//                 processedImages.push({
//                     imageUrl,
//                     imageBase64,
//                     fileName
//                 });
//             }

//             // Повертаємо масив об'єктів з посиланнями на файли і Base64
//             res.json(processedImages);
//         } catch (error) {
//             if (req.aborted) {
//                 console.log('Запит було скасовано');
//             } else {
//                 res.status(500).send('Помилка під час обробки зображень');
//             }
//         }
//     };

//     // Роут для обробки зображень
//     app.post('/process-images', upload.array('images', 200), processImages);

//     // Надаємо доступ до збережених зображень
//     app.use('/images', express.static(imagesDir));

//     // app.get('/download-image', (req, res) => {
//     //     const filePath = '/images/image.jpg';
//     //     res.download(filePath);  // Відправляємо файл на завантаження
//     // });

//     // Запускаємо сервер
//     app.listen(port, () => {
//         console.log(`Оброблювальний сервер працює на http://localhost:${port}`);
//     });
// };

// // Функція для створення кількох серверів
// const createServers = (numServers, startPort) => {
//     for (let i = 0; i < numServers; i++) {
//         const port = startPort + i;
//         createServer(port);
//     }
// };

// // Кількість серверів і стартовий порт
// const numServers = 10; // Кількість серверів, яку хочете створити
// const startPort = 8001; // Початковий порт

// createServers(numServers, startPort);











//Повертає тільки зображення
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');




// Функція для створення сервера
const createServer = (port) => {
    const app = express();

    // Використовуємо CORS для дозволу запитів з інших доменів
    app.use(cors());

    // Налаштування multer для завантаження файлів
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    // Функція обробки зображень
    const processImages = async (req, res) => {

        if (!req.files || req.files.length === 0) {
            return res.status(400).send('Будь ласка, завантажте зображення');
        }

        const processType = req.body.processType;
        const processedImages = [];

        try {
            for (let i = 0; i < req.files.length; i++) {
                let processedImage;
                console.log(`Обробляється зображення на сервері з портом: ${port}`); // Виводимо номер порта
                switch (processType) {
                    case 'resize':
                        const width = parseInt(req.body.resizeWidth) || 300;
                        const height = parseInt(req.body.resizeHeight) || 300;
                        processedImage = await sharp(req.files[i].buffer).resize(width, height).toBuffer();
                        break;
                    case 'grayscale':
                        processedImage = await sharp(req.files[i].buffer).grayscale().toBuffer();
                        break;
                    case 'rotate':
                        const degrees = parseInt(req.body.rotateDegrees) || 90;
                        processedImage = await sharp(req.files[i].buffer).rotate(degrees).toBuffer();
                        break;
                    case 'blur':
                        const blurLevel = parseFloat(req.body.blurLevel) || 5;
                        processedImage = await sharp(req.files[i].buffer).blur(blurLevel).toBuffer();
                        break;
                    case 'brightness':
                        const brightnessLevel = parseFloat(req.body.brightnessLevel) || 1;
                        processedImage = await sharp(req.files[i].buffer).modulate({ brightness: brightnessLevel }).toBuffer();
                        break;
                    case 'contrast':
                        const contrastLevel = parseFloat(req.body.contrastLevel) || 1;
                        processedImage = await sharp(req.files[i].buffer).modulate({ contrast: contrastLevel }).toBuffer();
                        break;
                    case 'crop':
                        const cropWidth = parseInt(req.body.cropWidth) || 300;
                        const cropHeight = parseInt(req.body.cropHeight) || 300;
                        processedImage = await sharp(req.files[i].buffer).extract({ width: cropWidth, height: cropHeight, left: 0, top: 0 }).toBuffer();
                        break;
                    default:
                        return res.status(400).send('Невідомий тип обробки');
                }

                const imageBase64 = `data:image/jpeg;base64, ${processedImage.toString('base64')}`;
                const fileName = req.files[i].originalname;
                processedImages.push({ imageBase64, fileName });

            }

            res.json(processedImages);
        } catch (error) {
            if (req.aborted) {
                console.log('Запит було скасовано');
            } else {
                res.status(500).send('Помилка під час обробки зображень');
            }
        }
    };

    // Роут для обробки зображень
    app.post('/process-images', upload.array('images', 200), processImages);

    // Запускаємо сервер
    app.listen(port, () => {
        console.log(`Оброблювальний сервер працює на http://localhost:${port}`);
    });

};

// Функція для створення кількох серверів
const createServers = (numServers, startPort) => {
    for (let i = 0; i < numServers; i++) {
        const port = startPort + i;
        createServer(port);
    }
};

// Кількість серверів і стартовий порт
const numServers = 1; // Кількість серверів, яку хочете створити
const startPort = 8001; // Початковий порт

createServers(numServers, startPort);





// const express = require('express');
// const multer = require('multer');
// const sharp = require('sharp');
// const cors = require('cors');

// const app1 = express();
// const app2 = express();
// const app3 = express();

// const port1 = process.env.PORT1 || 8001; // Порт для першого сервера
// const port2 = process.env.PORT2 || 8002; // Порт для другого сервера
// const port3 = process.env.PORT3 || 8003; // Порт для другого сервера

// // Використовуємо CORS для дозволу запитів з інших доменів
// app1.use(cors());
// app2.use(cors());
// app3.use(cors());


// // Налаштування multer для завантаження файлів
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });



// const processImages = (port) => async (req, res) => {
//     if (!req.files || req.files.length === 0) {
//         return res.status(400).send('Будь ласка, завантажте зображення');
//     }

//     const processType = req.body.processType;
//     const processedImages = [];

//     try {
//         for (let i = 0; i < req.files.length; i++) {
//             let processedImage;
//             console.log(`Обробляється зображення на сервері з портом: ${port}`); // Виводимо номер порта
//             switch (processType) {
//                 case 'resize':
//                     const width = parseInt(req.body.resizeWidth) || 300;
//                     const height = parseInt(req.body.resizeHeight) || 300;
//                     processedImage = await sharp(req.files[i].buffer).resize(width, height).toBuffer();
//                     break;
//                 case 'grayscale':
//                     processedImage = await sharp(req.files[i].buffer).grayscale().toBuffer();
//                     break;
//                 case 'rotate':
//                     const degrees = parseInt(req.body.rotateDegrees) || 90;
//                     processedImage = await sharp(req.files[i].buffer).rotate(degrees).toBuffer();
//                     break;
//                 case 'blur':
//                     const blurLevel = parseFloat(req.body.blurLevel) || 5;
//                     processedImage = await sharp(req.files[i].buffer).blur(blurLevel).toBuffer();
//                     break;
//                 case 'brightness':
//                     const brightnessLevel = parseFloat(req.body.brightnessLevel) || 1;
//                     processedImage = await sharp(req.files[i].buffer).modulate({ brightness: brightnessLevel }).toBuffer();
//                     break;
//                 case 'contrast':
//                     const contrastLevel = parseFloat(req.body.contrastLevel) || 1;
//                     processedImage = await sharp(req.files[i].buffer).modulate({ contrast: contrastLevel }).toBuffer();
//                     break;
//                 case 'crop':
//                     const cropWidth = parseInt(req.body.cropWidth) || 300;
//                     const cropHeight = parseInt(req.body.cropHeight) || 300;
//                     processedImage = await sharp(req.files[i].buffer).extract({ width: cropWidth, height: cropHeight, left: 0, top: 0 }).toBuffer();
//                     break;
//                 default:
//                     return res.status(400).send('Невідомий тип обробки');
//             }

//             const imageUrl = `data:image/jpeg;base64,${processedImage.toString('base64')}`;
//             processedImages.push(imageUrl);
//         }

//         res.json(processedImages);
//     } catch (error) {
//         if (req.aborted) {
//             console.log('Запит було скасовано');
//         } else {
//             res.status(500).send('Помилка під час обробки зображень');
//         }
//     }

// }

// app1.post('/process-images', upload.array('images', 200), processImages(port1));
// app2.post('/process-images', upload.array('images', 200), processImages(port2));
// app3.post('/process-images', upload.array('images', 200), processImages(port3));

// // Старт серверів на різних портах
// app1.listen(port1, () => {
//     console.log(`Оброблювальний сервер 1 працює на http://localhost:${port1}`);
// });

// app2.listen(port2, () => {
//     console.log(`Оброблювальний сервер 2 працює на http://localhost:${port2}`);
// });

// app3.listen(port3, () => {
//     console.log(`Оброблювальний сервер 2 працює на http://localhost:${port3}`);
// });



























// // Функція для обробки зображень, яка отримує порт
// const processImages = (port) => async (req, res) => {
//     if (!req.files || req.files.length === 0) {
//         return res.status(400).send('Будь ласка, завантажте зображення');
//     }

//     const processType = req.body.processType; // Отримуємо тип обробки зображень
//     const processedImages = [];

//     try {
//         for (let i = 0; i < req.files.length; i++) {
//             let processedImage;
//             console.log(`Обробляється зображення на сервері з портом: ${port}`); // Виводимо номер порта

//             switch (processType) {
//                 case 'resize':
//                     processedImage = await sharp(req.files[i].buffer).resize(300, 300).toBuffer();
//                     break;
//                 case 'grayscale':
//                     processedImage = await sharp(req.files[i].buffer).grayscale().toBuffer();
//                     break;
//                 case 'rotate':
//                     processedImage = await sharp(req.files[i].buffer).rotate(90).toBuffer();
//                     break;
//                 case 'blur':
//                     processedImage = await sharp(req.files[i].buffer).blur(50).toBuffer();
//                     break;
//                 default:
//                     return res.status(400).send('Невідомий тип обробки');
//             }

//             const imageUrl = `data:image/jpeg;base64,${processedImage.toString('base64')}`;
//             processedImages.push(imageUrl);
//         }

//         res.json(processedImages);
//     } catch (error) {
//         res.status(500).send('Помилка під час обробки зображень');
//     }
// };

// Додаємо роут для обох серверів

