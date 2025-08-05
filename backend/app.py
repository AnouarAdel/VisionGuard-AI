import os
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import tensorflow as tf

# Suppress TensorFlow informational messages
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# --- 1. Model Definition ---
# This function re-creates the exact same model architecture from your notebook.
# This is a more robust way to load the model.
def create_model():
    # Start with the EfficientNetB3 base, ensuring the input shape is correct
    base_model = tf.keras.applications.EfficientNetB3(
        weights=None,  # We will load our own saved weights
        include_top=False,
        input_shape=(224, 224, 3) # Explicitly define Color Image (3 channels)
    )
    
    # Add the custom layers on top, just like in the notebook
    x = base_model.output
    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    x = tf.keras.layers.Dense(256, activation='relu')(x)
    x = tf.keras.layers.Dropout(0.5)(x)
    predictions = tf.keras.layers.Dense(5, activation='softmax')(x)
    
    # Combine the base and the custom layers into our final model
    model = tf.keras.models.Model(inputs=base_model.input, outputs=predictions)
    return model

# --- 2. Initialize Flask App and CORS ---
app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})

# --- 3. Create Model and Load Weights ---
try:
    # First, create the empty model architecture
    model = create_model()
    # Now, load only the learned weights into this architecture
    model.load_weights('retinaguard_model.keras')
    print("--- Model architecture created and weights loaded successfully ---")
except Exception as e:
    print(f"--- Error creating model or loading weights: {e} ---")
    model = None

# --- 4. Define Diagnosis Labels (same as before) ---
DIAGNOSIS_CLASSES = {
    0: {'name': 'No DR', 'description': 'No signs of diabetic retinopathy detected.'},
    1: {'name': 'Mild DR', 'description': 'Early signs of diabetic retinopathy detected.'},
    2: {'name': 'Moderate DR', 'description': 'Clear signs of diabetic retinopathy are present.'},
    3: {'name': 'Severe DR', 'description': 'Significant and advanced retinopathy detected.'},
    4: {'name': 'Proliferative DR', 'description': 'The most advanced and vision-threatening stage of retinopathy.'}
}

# --- 5. Preprocess Image Function (same as before) ---
def preprocess_image(image_file):
    img = Image.open(image_file.stream).convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# --- 6. Prediction Route (same as before) ---
@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model is not loaded!'}), 500
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400
    try:
        processed_image = preprocess_image(file)
        prediction_probabilities = model.predict(processed_image)
        predicted_class_index = int(np.argmax(prediction_probabilities, axis=1)[0])
        diagnosis = DIAGNOSIS_CLASSES[predicted_class_index]
        response = {
            'stage': predicted_class_index,
            'name': diagnosis['name'],
            'description': diagnosis['description']
        }
        return jsonify(response)
    except Exception as e:
        print(f"--- Prediction Error: {e} ---")
        return jsonify({'error': f'An error occurred during prediction: {str(e)}'}), 500

# --- 7. Run the App (same as before) ---
if __name__ == '__main__':
    app.run(debug=False, port=5000)