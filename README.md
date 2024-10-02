This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
This template project uses Server Actions to manage user authentication and authorization.

## Getting Started

First, as I'm using Prisma ORM, you need to create a DATABASE_URL (This template uses MYSQL), also a SECRET_KEY that will be used to sign the user token.

Create a .env file in the root folder with the following content:
```dotenv
DATABASE_URL: Your database URL
SECRET_KEY: Your secret key
```
Then, you can run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

There are 3 paths:

- /signup
- /login
- /dashboard

Access /dashboard only if you are authenticated. Otherwise, you will be redirected to /login.
Access /signup to create a new user, then you will be redirected to /dashboard.
Inside /dashboard, you can logout.

I'm using cookies to store the user token and validate the user session.

### Tech Stack

- Next.js
- ReactJS
- Prisma ORM
- MySQL
- Tailwind CSS
- Zod
- NextUI
- bcrypt