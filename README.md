<h1>Introduction</h1>
<h3>Store Front Backend</h3>
<p>An online store front backend built for educational purposes for Udacity's Advanced full Stack development Nanodegree</p>
<h1>Project Overview</h1>
<p>The project requires you to create a backend for an onine store that would be connected to a front end that displays several cool products from your stackholders</p>
<h1>Instructions For Running The Project</h1>

<h3>Clonning the project using git bash: </h3>

```bash
git clone <repo url>
```

<h3>Installing the project: </h3>

```bash
npm i
```

<h3>Building: </h3>

```bash
npm run build
```

<h3>Start the server: </h3>

```bash
npm run start
```

<h3>Testing: </h3>

```bash
npm run test
```

<h3>Prettier: </h3>

```bash
npm run prettier
```

<h3>ESLint: </h3>

```bash
npm run lint
```

<h3>Databse config </h3>

1. Connect to the postgres with your username you can use the following command to do so `psql -U <username>`
2. Create `store_development` and `store_testing` databases:

```
CREATE DATABASE store_development;
CREATE DATABASE store_testing;
```
3. the third and final step, use `db-migrate up` to fill the databse ith the required tables. now your databse is set 😉
4. PS: Databse is running on port: 5432 

<h3> .env config </h3>

Create `.env` file in the root directory and use the following data as your setup.

```
# global env variable
ENV = dev

# databse variables 
DATABASE_HOST
DATABASE_PORT
DATABASE_DEV_DB
DATABASE_TEST_DB
DATABASE_USER
DATABASE_PASSWORD

# password protection varibales  
BCRYPT_PASSWORD
SALT_ROUNDS

# Token secret varibales
TOKEN_SECRET
```
<h3 align="center">Now that you have set the env file you are all set and ready good to go😉</h3>

<h1>File Structure</h1>

![image](https://user-images.githubusercontent.com/53512084/218422994-90746bdd-f258-4a04-8680-364d0cc4f630.png)

<h1>Technologies used</h1>

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Jasmine](https://img.shields.io/badge/jasmine-%238A4182.svg?style=for-the-badge&logo=jasmine&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
