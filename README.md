# PenCraft

<img width="1226" alt="image" src="https://github.com/user-attachments/assets/f075039a-a8a2-4330-b7c8-b26d66ca2e8c">


This project aims to create a blogging platform using modern technologies for both frontend and backend. It utilizes a robust stack including React for the frontend, Cloudflare Workers for the backend, and a combination of other tools for validation, ORM, database, and authentication.

## Technologies Used

- **Frontend:**

  - React: A popular JavaScript library for building user interfaces.
  - Zod: A TypeScript-first schema declaration and validation library.
  - TypeScript: A statically typed superset of JavaScript that compiles to plain JavaScript.

  - **Styling:**
  - Tailwind CSS: A utility-first CSS framework that provides low-level utility classes to build custom designs.
  - Aceternity UI: A collection of reusable UI components built with Tailwind CSS, designed for rapid development and consistent styling.

- **Backend:**
  - Cloudflare Workers: A serverless execution environment that allows you to create lightweight, scalable backend applications.
  - Prisma: A modern database toolkit for TypeScript and Node.js that simplifies database access.
  - Postgres: A powerful, open-source relational database system.
  - JWT (JSON Web Tokens): A compact, URL-safe means of representing claims to be transferred between two parties securely.
  - Using WebCrypto for hashing passsword before storing in the database.

## Setup Instructions

### Frontend

1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the development server.
4. Access the development server at `http://localhost:3000`.

### Backend

1. Navigate to the `backend` directory.
2. Run `npm install` to install dependencies.
3. Set up your Postgres database and configure the connection in `prisma/schema.prisma`.
4. Run `npx prisma migrate dev` to apply migrations and generate Prisma client.
5. Run `npm run dev` to start the backend server.
6. Access the backend server at `http://localhost:8080`.

## Authentication (Cookies Approach)

For authentication, this project utilizes JSON Web Tokens (JWT) along with a cookies-based approach.

1. Upon successful login, a JWT token is generated server-side and sent to the client.
2. The JWT token is then stored in an HTTP-only cookie for enhanced security.
3. Subsequent requests from the client include this token in the cookie header.
4. The server validates the JWT token to authenticate the user for protected routes.

## Additional Functionalities

### Bookmark Functionality

Users can bookmark their favorite posts for quick access.

### Search Functionality

Users can search for posts based on keywords or tags.

### Delete Bookmark with Confirmation Model

Users can delete bookmarks with a confirmation model to prevent accidental deletion.

###

## Image Upload Feature

Working on to supports image uploads, allowing users to enhance their blog posts with images. (Will add it after I get my credit card)

## Add rich text editor

Added jodit editor .

## Images:

<img width="1710" alt="image" src="https://github.com/user-attachments/assets/f7c0adb4-6e0b-4de2-b914-34a9d3bdd47e">

<img width="1710" alt="image" src="https://github.com/user-attachments/assets/4c11eff6-fe58-4304-ab25-ec4b26883022">


## ❤️Our Valuable Contributors

[![Contributors](https://contrib.rocks/image?repo=AkshitLakhera/PenCraft-Full-Stack-Blogging-Application)](https://github.com/AkshitLakhera/PenCraft-Full-Stack-Blogging-Application/graphs/contributors)

## Contributors

- **Abhi-hertz** - [@93651229+AE-Hertz](https://github.com/93651229+AE-Hertz)
- **Akshit lakhera** - [@akshitlakhera14](https://github.com/akshitlakhera14)
- **Ananya Gupta** - [@145869907+ananyag309](https://github.com/145869907+ananyag309)
- **Aryan Ramesh Jain** - [@138214350+jainaryan04](https://github.com/138214350+jainaryan04)
- **Bhumika** - [@sharmabhmi](https://github.com/sharmabhmi)
- **Edasgh** - [@edas25564](https://github.com/edas25564)
- **MIGHTY1o1** - [@shubhagarwalcse](https://github.com/shubhagarwalcse)
- **Nikhil Saxena** - [@91839763+Cleveridiot07](https://github.com/91839763+Cleveridiot07)
- **Pavan Shanmukha Madhav Gunda** - [@pavanshanmukhmadhav](https://github.com/pavanshanmukhmadhav)
- **Rahul Kumar** - [@rahulbarnwalonlyu2](https://github.com/rahulbarnwalonlyu2)
- **Risheendra183** - [@yannamrishee](https://github.com/yannamrishee)
- **Saksham Saraf** - [@122025299+sakshamsaraf23](https://github.com/122025299+sakshamsaraf23)
- **Samyak Aditya** - [@91079592+samyak-aditya](https://github.com/91079592+samyak-aditya)
- **Shariq** - [@shariqsd2003](https://github.com/shariqsd2003)
- **Shubham Pandey** - [@69081168+heizshubham](https://github.com/69081168+heizshubham)
- **Siddhi Sahu** - [@himanisahu739](https://github.com/himanisahu739)
- **Umesh Kumar** - [@149981630+UmeshKumar0143](https://github.com/149981630+UmeshKumar0143)
- **UmeshKumar0143** - [@umeshkumar153654](https://github.com/umeshkumar153654)
- **ayushrana83** - [@168258223+ayushrana83](https://github.com/168258223+ayushrana83)
- **dependabot** - [@49699333+dependabot[bot]](https://github.com/49699333+dependabot[bot])
- **dev129** - [@76431221+dev129](https://github.com/76431221+dev129)
- **iamDyeus** - [@dyeusyt](https://github.com/dyeusyt)
- **kartikeyyy** - [@kartikeykvk369](https://github.com/kartikeykvk369)
- **khaulanauman** - [@khaulanauman](https://github.com/khaulanauman)
- **sezallagwal** - [@sezal1470](https://github.com/sezal1470)
- **smog-root** - [@machha.shashank](https://github.com/machha.shashank)
- **tarunkumar2005** - [@tarunkumar6258278](https://github.com/tarunkumar6258278)
- **tejasbenibagde** - [@124677750+tejasbenibagde](https://github.com/124677750+tejasbenibagde)
