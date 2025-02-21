# 🎬 YouTube Clone - MERN Stack 🚀

## 🌟 Overview
Welcome to the **YouTube Clone**, your own personal video streaming universe! 🌍✨ Built with the **MERN stack**, this app lets you **upload**, **watch**, and **engage** with videos just like a pro YouTuber! 🎥🔥

## 🔥 Features

### 🎨 Frontend (React)
- **🏠 Home Page**
  - A sleek YouTube-style header and sidebar 
  - Trending video grid that keeps you hooked 
  - Category-based filters to find your favorite content 
  
- **🔐 User Authentication**
  - Secure sign-up and login system 
  - JWT-based authentication to keep things safe 
  - Google form integration for a smooth sign-in experience 
  
- **🎯 Search and Filter**
  - Lightning-fast search to find videos instantly ⚡
  - Filter by category to watch what you love 💕
  
- **🎬 Video Player Page**
  - High-quality video streaming experience 
  - See video details, uploader info, and descriptions 
  - Like 👍/Dislike 👎 and drop comments 💬
  
- **📺 Channel Page**
  - Become a content creator and launch your own channel 🚀
  - Upload, edit, and manage videos effortlessly 🎥
  - Showcase your personal content hub 📜
  
- **📱 Responsive Design**
  - Seamlessly adapts to mobile, tablet, and desktop 📲💻🖥️

### ⚙️ Backend (Node.js, Express, MongoDB)
- **📡 API Endpoints**
  - User authentication (Sign up, login, JWT-based auth) 🔐
  - Channel management (Create, update, fetch channels) 🛠️
  - Video management (Upload, fetch, update, delete videos) 
  - Comment management (Add, fetch comments) 💬

- **🗄️ Database (MongoDB)**
  - Stores users, videos, channels, and comments 📚
  - Maintains file metadata (e.g., video URLs, thumbnails) 🏷️

## 🚀 Technologies Used
- **Frontend:** React, React Router, Axios ⚛️
- **Backend:** Node.js, Express.js 🖥️
- **Authentication:** JWT (JSON Web Tokens) 🔑
- **Database:** MongoDB (Atlas) 🌍
- **Version Control:** Git 🛠️

## 🛠️ Installation & Setup
### Prerequisites
Make sure you have the following installed:
- Node.js 🟢
- MongoDB (Local or Atlas) 🍃
- Git 🧑‍💻

### 📥 Clone the Repository
```sh
$ git clone https://github.com/yourusername/youtube-clone.git
$ cd youtube-clone
```

### 📦 Install Dependencies
#### Backend
```sh
$ cd backend
$ npm install
```
#### Frontend
```sh
$ cd frontend
$ npm install
```

### ⚙️ Configure Environment Variables
Create a `.env` file in the backend directory and add:
```sh
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

```

### ▶️ Run the Application
#### Start the Backend
```sh
$ cd backend
$ npm run dev
```
#### Start the Frontend
```sh
$ cd frontend
$ npm start
```

## 🎯 Usage
1. **Sign up or log in** to unlock epic features 🔐
2. **Browse trending content** and discover new videos 📺
3. **Upload your own awesome content** and go viral 🌟
4. **Like, dislike, and comment** to engage with the community 👍👎💬
5. **Manage your videos** through the intuitive channel page 🏗️


## 📜 License
This project is open-source and available under the MIT License. ⚖️
