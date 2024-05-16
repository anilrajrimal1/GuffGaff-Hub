# GuffGaff-Hub - Realtime Chat Application

## Introduction

GuffGaff Hub is a messaging app that keeps your messages super safe. It looks nice with React and Tailwind CSS on the front part, and it runs securely on the backend with Spring Boot (JAVA). Your login is extra secure using JWT. What's cool is that we added AES encryption to make sure your messages are private. Plus, you can share images smoothly thanks to Cloudinary. It's a friendly and secure place for your chats!
## Features

- **Realtime Messaging:** Experience seamless, real-time messaging with instant delivery.

- **TimeStamp:** Know when your friend sent messages (full date and time).

- **Group Creation:** Create groups for efficient communication and collaboration.

- **Individual Messaging:** Send private messages to individuals for one-on-one communication.

- **Login and Signup:** Securely access the application with a login and signup system.

- **Image Uploading:** Share images easily by uploading and storing them with Cloudinary.

## Technologies Used

- **Frontend:** React, Tailwind CSS, Redux
- **Backend:** Java Spring Boot
- **Database:** MySQL Database
- **Authentication:** Spring Security, JWT
- **Encryption:** Advanced Encryption Standard (AES)
- **Image Upload:** Cloudinary
- **Other Tools and Tech** IntelliJ IDEA

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/anilrajrimal1/GuffGaff-Hub.git
   ```

2. **Navigate to Frontend and Install Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Navigate to Backend and Install Dependencies:**
   ```bash
   cd backend
   mvn clean install
   ```

4. **Configure Environment Variables:**
   - Set up Cloudinary credentials.
   - Configure Spring Boot application.properties for database and other configurations.

5. **Run the Application:**
   - Start the frontend:
     ```bash
     npm start
     ```
   - Start the backend:
     ```bash
     mvn spring-boot:run
     ```

6. **Access the Application:**
   Open your browser and go to `http://localhost:3000` to use the Application.

7. **ScreenShots**

 ![image](https://github.com/anilrajrimal1/GuffGaff-Hub/blob/master/login.png)
    <br/>

 ![image](https://github.com/anilrajrimal1/GuffGaff-Hub/blob/master/landing.png)

   <br/>

![image](https://github.com/anilrajrimal1/GuffGaff-Hub/blob/master/profile.png)

   <br/>
 ![image](https://github.com/anilrajrimal1/GuffGaff-Hub/blob/master/group.png)
  <br/>
  
![image](https://github.com/anilrajrimal1/GuffGaff-Hub/blob/master/chat.png)
  <br/>
  
![image](https://github.com/anilrajrimal1/GuffGaff-Hub/blob/master/logout.png)


## Contribution Guidelines

We welcome contributions! If you have ideas for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

Thank you for using and contributing to this Chat Application 😁🙏
