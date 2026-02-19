#!/bin/bash
# Build standalone Python executable using PyInstaller

echo "Installing dependencies..."
pip3 install -r requirements.txt

echo "Installing PyInstaller..."
pip3 install pyinstaller

echo "Building standalone executable..."
pyinstaller --onefile \
    --name ml_engine \
    --hidden-import sklearn.utils._typedefs \
    --hidden-import sklearn.utils._heap \
    --hidden-import sklearn.utils._sorting \
    --hidden-import sklearn.utils._vector_sentinel \
    --hidden-import sksurv \
    --hidden-import sksurv.ensemble \
    --hidden-import sksurv.linear_model \
    --hidden-import sksurv.metrics \
    ml_engine.py

echo "Build complete! Binary location: dist/ml_engine"
echo ""
echo "To test the binary:"
echo "  echo '{\"mode\": \"info\", \"model_path\": \"test.joblib\"}' | ./dist/ml_engine"
