# VisionGuard AI

![VisionGuard AI Screenshot](src/assets/screenshot.png)

An AI-powered web application for the preliminary detection of Diabetic Retinopathy from retinal fundus images.

---

## 📖 About The Project

Diabetic Retinopathy (DR) is a leading cause of vision loss for people with diabetes. Early detection is critical to preventing severe outcomes. **VisionGuard AI** is a tool designed to provide a fast, accessible, and preliminary assessment of DR severity by leveraging a deep learning model.

This project was built to demonstrate a full-stack approach to deploying a machine learning solution. It features:
*   A **Convolutional Neural Network (CNN)**, utilizing the EfficientNetB3 architecture, trained on the APTOS 2019 dataset to classify images into five stages of DR.
*   A lightweight **Python/Flask backend** that serves the trained TensorFlow model through a REST API.
*   A responsive and interactive **React frontend** that allows users to upload an image and view the analysis in a user-friendly interface.

---

## ✨ Key Features

### AI & Backend

*   **Deep Learning Model:** A Convolutional Neural Network (CNN) based on the **EfficientNetB3** architecture, trained on the extensive **APTOS 2019 dataset** to classify retinal images.
*   **5-Stage Classification:** The model accurately categorizes fundus images into five distinct stages of Diabetic Retinopathy (No DR, Mild, Moderate, Severe, Proliferative).
*   **REST API for Inference:** A lightweight **Flask** server exposes the trained **TensorFlow/Keras** model, making it accessible via a simple `/predict` endpoint.
*   **Image Preprocessing Pipeline:** The backend automatically handles resizing (to 224x224) and normalization of uploaded images to match the model's input requirements.

### Frontend Interface

*   **Interactive Analysis Tool:** A clean and responsive UI built with **React** that allows users to easily upload an image (via click or drag-and-drop) and receive the model's prediction.
*   **Session-Based History:** Keeps a gallery of all analyses performed in a session, allowing for easy review and comparison of results.
*   **Detailed & Visualized Results:** Clearly displays the diagnosis, severity stage, and a detailed description for each analysis in a clickable modal view.

---

## 🛠️ Tech Stack

**Frontend:**
*   React.js
*   Vite
*   Tailwind CSS
*   Framer Motion
*   React Scroll

**Backend:**
*   Python
*   Flask
*   TensorFlow / Keras
*   Pillow

---

## 🚀 Running The Project Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   Python (v3.9 or later)
*   npm & pip
*   Git LFS (for handling the large model file)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/AnouarAdel/VisionGuard-AI.git
    cd VisionGuard-AI
    ```

2.  **Setup the Backend:**
    ```sh
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt 
    ```

3.  **Setup the Frontend:**
    ```sh
    cd .. 
    npm install
    ```

### Running the Application

1.  **Start the Backend Server:**
    *   Navigate to the `backend` directory and ensure your virtual environment is active.
    *   Run the Flask server:
        ```sh
        python3 app.py
        ```
    *   The backend will be running on `http://localhost:5000`.

2.  **Start the Frontend Application:**
    *   In a **new terminal window**, navigate to the project's root directory.
    *   Run the React development server:
        ```sh
        npm run dev
        ```
    *   Open [http://localhost:5173](http://localhost:5173) (or the address shown in your terminal) to view the application.

---

## 👤 Author

**Anouar Adel**
*   Recent graduate with a Master's degree in Artificial Intelligence & Big Data from the University of Khemis Miliana. Passionate about applying machine learning to solve real-world challenges in healthcare and beyond.

*   **GitHub:** [@AnouarAdel](https://github.com/AnouarAdel)
*   **LinkedIn:** [Anouar Adel](https://www.linkedin.com/in/anouar-adel-0a4928323/)
*   **Email:** [adelanouar60@gmail.com](mailto:adelanouar60@gmail.com)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.