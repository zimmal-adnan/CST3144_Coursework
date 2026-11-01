const express = require('express');
const chalk = require('chalk');
const path = require('path');

const app = express();
const PORT = 3000;


//Logger Middleware
app.use((req, res, next) =>{
    req.time = new Date(Date.now()).toString();
    console.log(`${chalk.yellow.bgBlack(req.method)}, ${req.hostname}, ${req.path}, ${req.time}`);
    next();
});

//Static Images Middleware
/*const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images', express.static(path.join(__dirname, 'public')));*/

app.get("/lessons", async (request, response) => {
    let courses = [
            {
                id: 1,
                image: "images/placeholder.jpg",
                category: 'Physical Activity',
                subject: 'Swimming',
                description: "Is that a fish? Is that a dolphin? No! That is your little one zooming through our crystal clear pools! Make your child the next Michael Phelps by joining our swimming classes!",
                location: "<b>Tower House Street, Leeds, United Kingdom</b>",
                price: "£15 / week",
                availableSpace: 5,
            },
            {
                id: 2,
                image: "images/placeholder.jpg",
                category: 'Physical Activity',
                subject: 'Dancing',
                description: "Bring out your child's elegance as they grace the stage with their presence! Enroll your little one to our dance classes where they will be trained to shine with our most professional coaches.",
                location: "<b>2 Riverside Way, Leeds, United Kingdom</b>",
                price: "£10 / week",
                availableSpace: 5,

            },
            {
                id: 3,
                image: "images/placeholder.jpg",
                category: 'Physical Activity',
                subject: 'Gymnastics',
                description: "Watch your little one soar through the air! Improve your child's flexibility, strength and coordination with professional coaches and trainers. Unlock your child's true potential by signing up to our gymnastics classes today!",
                location: "<b>63 Main Street, Leeds, United Kingdom</b>",
                price: "£15 / week",
                availableSpace: 5,
            },
            {
                id: 4,
                image: "images/placeholder.jpg",
                category: 'Physical Activity',
                subject: 'Martial Arts',
                description: "Have your little one be your small bodyguard! Learn self defense techniques and basic Kung Fu from professional Chinese Masters. Sign up TODAY!",
                location: "<b>403 Meanwood Road, Leeds, United Kingdom</b>",
                price: '£20 / week',
                availableSpace: 5,
            },
            {
                id: 5,
                image: "images/placeholder.jpg",
                category: 'STEM',
                subject: 'Coding',
                description: "Introduce your child to a world of infinite possibilities. Our coding classes prepares your child to be the next computer genius with engaging quizzes, games and projects for them to do! Register now!",
                location: "<b>126 Hamilton Road, Birmingham, United Kingdom</b>",
                price: '£25 / week',
                availableSpace: 5,
            },
            {
                id: 6,
                image: "images/placeholder.jpg",
                category: 'STEM',
                subject: 'Robotics',
                description: "Learn how to make your own talking robot friend! Enroll your little one into our robotics classes where experts will provide them hands-on training!",
                location: "<b>152 Boulton Road, Birmingham, United Kingdom</b>",
                price: '£30 / week',
                availableSpace: 5,
            },
            {
                id: 7,
                image: "images/placeholder.jpg",
                category: 'STEM',
                subject: 'Science',
                description: "Ready for your child to launch the next scientific breakthrough? Reserve their spot in our science classes today!",
                location: "<b>3 Lexington Gardens, Birmingham, United Kingdom</b>",
                price: '£20 / week',
                availableSpace: 5,
            },
            {
                id: 8,
                image: "images/placeholder.jpg",
                category: 'STEM',
                subject: 'Maths',
                description: "A human calculator?! That is exactly what your child will become after registering with our Mathematics classes from renowned teachers around the world!",
                location: "<b>136 Suffolk Street Queensway, Birmingham, United Kingdom</b>",
                price: '£10 / week',
                availableSpace: 5,
            },
            {
                id: 9,
                image: "images/placeholder.jpg",
                category: 'Literacy',
                subject: 'Language',
                description: "Hola! Bonjour! Hala! Equip your little one with the ability to communicate with anyone from around the world! Sign up to one of our highly-recognised language classes with professional native-speakers and teachers!",
                location: "<b>430 Cable Street, London, United Kingdom</b>",
                price: '£30 / week',
                availableSpace: 5,
            },
            {
                id: 10,
                image: "images/placeholder.jpg",
                category: 'Literacy',
                subject: 'Creative Writing',
                description: "Allow us to help your child express their dreams and fantasies into words and captivate readers with their bedazzling imagination. Enroll your little one in our creative writing classes today!",
                location: "<b>406 Wickham Lane, London, United Kingdom</b>",
                price: '£10 / week',
                availableSpace: 5,
            },
            {
                id: 11,
                image: "images/placeholder.jpg",
                category: 'Literacy',
                subject: 'Journaling',
                description: "Exhausted from school? Overthinking? Let the ink on the page convey your little one's thoughts. Join our journaling classes where we offer the best techniques to set your mind free!",
                location: "<b>159 Druid Street, London, United Kingdom</b>",
                price: '£10 / week',
                availableSpace: 5,
            },
            {
                id: 12,
                image: "images/placeholder.jpg",
                category: 'Literacy',
                subject: 'Tutoring',
                description: "Distractions, distractions and more distractions! Your little one just cannot seem to sit and do their homework. But don't fret! Register your child for our tutoring classes where expert teachers ensure your child stays concentrated and delivers the best results in their studies!",
                location: "<b>200 Pentionville Road, London, United Kingdom</b>",
                price: '£20 / week',
                availableSpace: 5,
            },
            {
                id: 13,
                image: "images/placeholder.jpg",
                category: 'Creative Arts',
                subject: 'Theatre',
                description: "The world's next big Hollywood star is just one step away from immersing themselves in the spotlight! Sign your little one up for our grand theatre classes today!",
                location: "<b>408 Websters Land, Edinburgh, United Kingdom</b>",
                price: '£25 / week',
                availableSpace: 5,
            },
            {
                id: 14,
                image: "images/placeholder.jpg",
                category: 'Creative Arts',
                subject: 'Painting',
                description: "Allow your child to freely express their feelings and emotions into a colorful array on a canvas. Sign up for our painting classes now!",
                location: "<b>Downfield Place, Edinburgh, United Kingdom</b>",
                price: '£15 / week',
                availableSpace: 5,
            },
            {
                id: 15,
                image: "images/placeholder.jpg",
                category: 'Creative Arts',
                subject: 'Music',
                description: "Present your little one with the opportunity to become the world's next Beethovan! Enroll in our music classes today where we offer a wide variety of lessons for any instrument of your child's choice!",
                location: "<b>14 High Street, Edinburgh, United Kingdom</b>",
                price: '£25 / week',
                availableSpace: 5,
            },
            {
                id: 16,
                image: "images/placeholder.jpg",
                category: 'Creative Arts',
                subject: 'Animation',
                description: "What better way to display your child's creativity than encouraging them to bring their drawings to life! Sign up for our animation classes today taught by highly-expertised teachers in the field!",
                location: "<b>Belgrave Crescent, Edinburgh, United Kingdom</b>",
                price: '£30 / week',
                availableSpace: 5,
            }
                        
        ];

    response.json(courses)

});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(chalk.green.bold(`Server is running on http://localhost:${PORT}`));
});




