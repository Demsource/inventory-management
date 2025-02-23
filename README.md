# Inventory Management

1. You've to have **Postgres Server** and **Database** up and running
2. Set your **database credentials** in "/backend/config/config.json" and "/backend/config/database.js" files
3. By default in the "...inventory-seeder.js" will be a seeder which inserts half a million data. However you can modify it in case if you do not have enough **RAM** to process it
    - Open the "...inventory-seeder.js" and for the **total** and **chunked** constants lower the numbers respectively
    - CD into **backend** folder and run the following command: `npm run fresh`
4. CD into **backend** folder and run `npm i` and `npm run dev` afterwards
    - Server should start on localhost **port: 5000**
4. CD into **frontend** folder and run `npm i` and `npm run dev` afterwards
    - Server should start on localhost **port: 5173**