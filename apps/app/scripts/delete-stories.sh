#!/bin/bash

for dir in "$@"
do
  full_dir="./src/$dir"
  if [ -d "$full_dir" ]; then
    find "$full_dir" -type f -name "*.stories.ts" -exec rm {} \;
    echo "Deleted all .stories.ts files in directory $full_dir"
  else
    echo "Directory $full_dir Does Not Exist."
  fi
done