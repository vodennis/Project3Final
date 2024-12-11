# Project Setup Guide

## Setup Instructions

**Create two terminals in your IDE**

**Terminal 1: Backend Setup**
- `cd backend`
- `npm install typedi express pg cors body-parser cookie-parser dotenv @supabase/supabase-js`
- `npm run build`
- `npm run start`
- Should output: "Database loaded"

**Terminal 2: Frontend Setup**
- `cd project3`
- `npm install @hookstate/core @hookstate/localstored axios react react-dom react-router-dom`
- `npm run dev`

## Using the Application
**To generate a recipe:**
1. Select ingredients from the list provided.

![Screenshot 2024-12-11 at 4 57 44 PM](https://github.com/user-attachments/assets/f714e65d-0b80-4272-b1da-eda1ce3f374f)
**Note: If not ingredients are selected, an error message will occur**

![Screenshot 2024-12-11 at 4 59 07 PM](https://github.com/user-attachments/assets/2b59e178-5536-460b-aeb5-433664f7b8b5)

3. Fill out the form.

![Screenshot 2024-12-11 at 4 59 28 PM](https://github.com/user-attachments/assets/838f6842-650f-4c32-acf5-85afbff8a5df)

4. Click the Save Recipe button.

![Screenshot 2024-12-11 at 4 11 32 PM](https://github.com/user-attachments/assets/af0f90d0-5c45-466c-b973-109b5ef5a539)

6. Click Go to Search to view recipes with selected ingredients and saved recipes.

![Screenshot 2024-12-11 at 4 11 59 PM](https://github.com/user-attachments/assets/0a219b74-112e-4bd3-8f7d-519e2cb9d4c1)

8. Search among the recipes available by typing in the search bar

![Screenshot 2024-12-11 at 4 12 11 PM](https://github.com/user-attachments/assets/23afb3f4-f14b-4da5-ab06-d759afd28a25)
