This project is assigned for applying as a Full-stack Developer in PT. Deptech Digital Indonesia.

## Setup

Before running this project. Make sure you have these dependencies:

1. MySQL (latest)
2. NodeJS (latest)
3. NPM (latest)

First, copy the `.env.example` into your local file, then rename it as `.env.local`. Below is the example of `.env.local` file. Make sure the setup of database is align with yours.

```
NODE_ENV="development"

API_PORT=8000

DB_HOST="localhost"
DB_USER="user"
DB_PASS="user"
DB_NAME="inventory_db"

JWT_SECRET=your_secret_ley
JWT_EXPIRES_IN=1d
```

Next, install the dependencies by running the command below.

```bash
npm install
# or
yarn install
```

After that, import `inventory_db.sql` database that has already given in this repository to your DBMS

Last, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Author

This project is created by [Daffa Kurnia Fatah](https://dafkur.com)
