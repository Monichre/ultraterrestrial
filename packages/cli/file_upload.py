from xata.client import XataClient
from xata.helpers import Transaction
import os
import csv
# We can now add insert, update, delete or get operations to
# the transaction helper. Max is 1000, if you exceed this treshold
# an exception is thrown.
# Please ensure the SDK version is > 0.10.0
api_key = os.getenv("XATA_API_KEY")
db_url = os.getenv("XATA_DB_URL")
xata = XataClient(api_key=api_key, db_url=db_url)
trx = Transaction(xata)

def upload_csv_to_table(csv_file_path, table_name):
    print(csv_file_path)
    print(table_name)
    # Read the CSV file
    with open(csv_file_path, 'r') as file:
        reader = csv.reader(file)
        records = [row for row in reader]

        for record in records:
          print(record)
          trx.insert(table_name, record)

        results = trx.run()
        print(results)
        return results