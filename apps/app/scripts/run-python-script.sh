#!/bin/bash

# Path to the Python script
PYTHON_SCRIPT="./download-images.py"

# Check if the Python script exists
if [ ! -f "$PYTHON_SCRIPT" ]; then
    echo "Error: Python script not found at $PYTHON_SCRIPT"
    exit 1
fi

# Execute the Python script
echo "Running Python script..."
python3 $PYTHON_SCRIPT

# Check the exit status of the Python script
EXIT_STATUS=$?
if [ $EXIT_STATUS -eq 0 ]; then
    echo "Python script executed successfully."
else
    echo "Python script failed with exit status $EXIT_STATUS."
fi
