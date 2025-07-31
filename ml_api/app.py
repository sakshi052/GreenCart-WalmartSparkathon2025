from flask import Flask, request, jsonify
from flask_cors import CORS  # ✅ Add this line

import joblib, numpy as np, os

model = joblib.load('eco_model.pkl')
features = joblib.load('feature_columns.pkl')
app = Flask(__name__)
CORS(app)  # ← Enable CORS here

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    comp, cat = data['composition'], data['Category']
    row = [(1 if f==f"Cat_{cat}" else comp.get(f,0)) if f.startswith('Cat_') else comp.get(f,0) for f in features]
    pred = model.predict(np.array(row).reshape(1,-1))[0]
    return jsonify({'ecoScore': float(pred)})

if __name__=='__main__':
    app.run(port=5000)