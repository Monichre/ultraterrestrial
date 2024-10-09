#!/bin/bash

# Directory for storing images
images_dir="enigma_images"
mkdir -p "${images_dir}"

# Chad Underwood
# Sir Eric Gairy and the 1978 U.N. Assembly on UAP
# Edward James Ruppelt - First Director of Project Blue Book
# Edward Condon
# "Bruce Maccabee, physicist and UAP researcher"
# Phillip J. Klass
# Albert M. Chop
# General Parviz Jafari
# List of URLs and titles (titles are unused in the script, just for reference)
declare -a urls=(
https://static.enigmalabs.io/library/94e21b37-7553-42cb-bca6-bf1f9db2e166/6f451863-ccdf-440c-9f2f-325f0baf62a3.png
https://static.enigmalabs.io/library/fe0c6d28-fd9a-4a31-ba64-fc415571645e/52749926-d4d2-40b2-8cd8-ed6cb78c0787.png
https://static.enigmalabs.io/library/c68b0efb-98cc-4cb5-ae8d-dce8c265be0b/023286f1-6948-4363-a856-01bd5451975f.png
https://static.enigmalabs.io/library/81c10540-a1df-4b23-8884-59e2721a8e0e/0713322d-0233-477c-aad5-184a7e2bdc80.png
https://static.enigmalabs.io/library/a41f2538-3ec5-4a0d-bbbe-064b667d5432/79ccadb6-2319-4b26-a4bf-81386feb29e5.jpeg
https://static.enigmalabs.io/library/ae36eded-aed8-4df6-a828-8ae625544058/64e46c50-3d48-42b4-90a4-7a4a1b6664ba.png
https://static.enigmalabs.io/library/2671c880-1cd2-4098-b706-8c1b5c7b0069/7767f4d2-1f50-446f-b227-4997ff687b28.png
https://static.enigmalabs.io/library/3077098c-118a-4311-b071-87e6c2de4a3c/171e0198-2c4c-40d9-abf4-da7738c77c69.png
https://static.enigmalabs.io/library/318296c5-3a18-4a12-9c98-fa62c946c45c/fb7d5a2a-b5be-4e0c-9e04-f7659d932885.jpeg

)

# Loop through URLs and download each one
for url in "${urls[@]}"; do
    file_name=$(basename "${url}")
    save_path="${images_dir}/${file_name}"

    # Download the image
    if curl -o "${save_path}" -sL --fail "${url}"; then
        echo "Downloaded: ${url}"
    else
        echo "Failed to download: ${url}"
    fi

    # Delay to avoid overwhelming the server
    sleep 1
done

echo "Download completed."
