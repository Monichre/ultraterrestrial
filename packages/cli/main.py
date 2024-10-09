#!/usr/bin/env python3

import argparse
import os
from typing import Optional
from file_upload import upload_csv_to_table

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Ultraterrestrial Xata Python CLI")
    parser.add_argument('table', help="Name of the table to upload to")
    parser.add_argument('file_path', help="Path to the CSV file")
    
    args = parser.parse_args()

    if not os.path.exists(args.file_path):
        print(f"Error: The file '{args.file_path}' does not exist.")
        return

    try:
        result = upload_csv_to_table(args.table, args.file_path)
        print(f"Upload successful: {result}")
    except Exception as e:
        print(f"Error during upload: {str(e)}")

if __name__ == "__main__":
    main()
