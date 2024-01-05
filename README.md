# GuffGaff-Hub - Realtime Chat Application

## Introduction

Welcome to the GuffGaff Hub! This project is a full-fledged messaging application with a clean user interface. It enables users to exchange messages individually or within groups, view user statuses, and support image uploading. The project utilizes React for the front end with Tailwind CSS for styling, and the backend is powered by Spring Boot (JAVA), ensuring secure login using Spring Security with JWT-based authentication. Cloudinary is employed for image uploading and storage.
## Features

- **Realtime Messaging:** Experience seamless, real-time messaging with instant delivery.

- **User Status:** Stay connected with friends by viewing their online or offline status.

- **Group Creation:** Create groups for efficient communication and collaboration.

- **Individual Messaging:** Send private messages to individuals for one-on-one communication.

- **Login and Signup:** Securely access the application with a login and signup system.

- **Image Uploading:** Share images easily by uploading and storing them with Cloudinary.

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Spring Boot
- **Database:** MySQL
- **Authentication:** Spring Security, JWT
- **Image Upload:** Cloudinary
- **Other Tools and Tech** Intellij IDEA

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/realtime-chat-app.git
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
   Open your browser and visit `http://localhost:3000` to use the Application.

7. **ScreenShots**

   ![image](https://github.com/anilrajrimal1/GuffGaff-Hub/blob/master/login.png)
    <br/>

   ![image](https://github.com/anilrajrimal1/GuffGaff-Hub/blob/master/landing.png)

   <br/>
   ![image](https://github.com/anilrajrimal1/GuffGaff-Hub/blob/master/profile.png)
   

   ![image](https://github.com/anilrajrimal1/GuffGaff-Hub/blob/master/group.png)

   ![image](https://github.com/anilrajrimal1/GuffGaff-Hub/blob/master/chat.png)

   ![image](https://github.com/anilrajrimal1/GuffGaff-Hub/blob/master/logout.png)


## Contribution Guidelines

We welcome contributions! If you have ideas for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

Thank you for using and contributing to the Realtime Chat Application!
