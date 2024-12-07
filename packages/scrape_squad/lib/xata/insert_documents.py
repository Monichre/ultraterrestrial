import json                                         
   import os                                           
                                                       
   def load_metadata(json_file):                       
       """Load metadata from a JSON file."""           
       try:                                            
           with open(json_file, 'r', encoding='utf-8   
   as f:                                               
               records = json.load(f)                  
           print(f"Loaded {len(records)} records fro   
   '{json_file}'.")                                    
           return records                              
       except Exception as e:                          
           print(f"Error loading JSON file             
   '{json_file}': {str(e)}")                           
           return []                                   
                                                       
   def insert_into_database(records):                  
       """Insert records into the Xata database."""    
       # Uncomment and configure the following lines   
   with your database details                          
       # from xata.client import XataClient            
       # xata =                                        
   XataClient(api_key=os.getenv('XATA_API_KEY'))       
                                                       
       # for record in records:                        
       #     try:                                      
       #         response =                            
   xata.records().insert("documents", record)          
       #         print(f"Inserted record for           
   {record['title']}: {response}")                     
       #     except Exception as e:                    
       #         print(f"Error inserting record for    
   {record['title']}: {str(e)}")                       
                                                       
       # Placeholder for future implementation         
       print("Database insertion logic is not yet      
   implemented.")                                      
                                                       
   def main():                                         
       # Specify the path to your metadata JSON file   
       json_file = 'documents_metadata.json'           
                                                       
       # Load the metadata                             
       records = load_metadata(json_file)              
                                                       
       # Insert records into the database              
       insert_into_database(records)                   
                                                       
       print("Database insertion script is ready. Ad   
   your database logic to proceed.")                   
                                                       
   if __name__ == "__main__":                          
       main()                 