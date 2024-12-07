# prepare_documents.py                                                                                           
                                                                                                                
import os                                                                                                        
import glob                                                                                                      
import json                                                                                                      
from datetime import datetime                                                                                    
from PyPDF2 import PdfReader                                                                                     
import openai                                                                                                    
from rake_nltk import Rake                                                                                       
import nltk                                                                                                      
                                                                                                                
# Download NLTK data (only needs to be done once)                                                                
nltk.download('punkt')                                                                                           
                                                                                                                
# Set your OpenAI API key from environment variables                                                             
openai.api_key = os.getenv('OPENAI_API_KEY')                                                                     
                                                                                                                
def clean_filename_to_title(filename):                                                                           
    """Convert filename to a cleaner title."""                                                                   
    title = filename.replace('.pdf', '')                                                                         
    title = title.replace('_', ' ').replace('-', ' ').title()                                                    
    return title                                                                                                 
                                                                                                                
def extract_text(filepath):                                                                                      
    """Extract text from a PDF file."""                                                                          
    try:                                                                                                         
        reader = PdfReader(filepath)                                                                             
        text = ""                                                                                                
        for page in reader.pages:                                                                                
            extracted_text = page.extract_text()                                                                 
            if extracted_text:                                                                                   
                text += extracted_text + "\n"                                                                    
        return text                                                                                              
    except Exception as e:                                                                                       
        print(f"Error extracting text from {filepath}: {str(e)}")                                                
        return ""                                                                                                
                                                                                                                
def generate_summary(text):                                                                                      
    """Generate a summary using OpenAI's GPT-4."""                                                               
    try:                                                                                                         
        response = openai.ChatCompletion.create(                                                                 
            model="gpt-4",                                                                                       
            messages=[                                                                                           
                {"role": "system", "content": "You are a helpful assistant that summarizes documents."},         
                {"role": "user", "content": f"Please provide a concise summary of the following                  
text:\n\n{text}"}                                                                                                
            ],                                                                                                   
            max_tokens=150,                                                                                      
            n=1,                                                                                                 
            stop=None,                                                                                           
            temperature=0.5,                                                                                     
        )                                                                                                        
        summary = response.choices[0].message['content'].strip()                                                 
        return summary                                                                                           
    except Exception as e:                                                                                       
        print(f"Error generating summary: {str(e)}")                                                             
        return "Summary not available."                                                                          
                                                                                                                
def generate_embedding(text):                                                                                    
    """Generate embeddings using OpenAI's API."""                                                                
    try:                                                                                                         
        response = openai.Embedding.create(                                                                      
            input=text,                                                                                          
            model="text-embedding-ada-002"                                                                       
        )                                                                                                        
        embedding = response['data'][0]['embedding']                                                             
        return embedding                                                                                         
    except Exception as e:                                                                                       
        print(f"Error generating embedding: {str(e)}")                                                           
        return [0] * 768  # Default embedding size for ada-002                                                   
                                                                                                                
def extract_keywords(text):                                                                                      
    """Extract keywords using RAKE."""                                                                           
    try:                                                                                                         
        rake = Rake()                                                                                            
        rake.extract_keywords_from_text(text)                                                                    
        keywords = rake.get_ranked_phrases()[:10]  # Top 10 keywords                                             
        return keywords                                                                                          
    except Exception as e:                                                                                       
        print(f"Error extracting keywords: {str(e)}")                                                            
        return []                                                                                                
                                                                                                                
def extract_metadata(filepath):                                                                                  
    """Extract metadata and additional information from a PDF."""                                                
    try:                                                                                                         
        filename = os.path.basename(filepath)                                                                    
        relative_path = os.path.relpath(filepath, './case_files')                                                
        folder_path = os.path.dirname(relative_path)                                                             
                                                                                                                
        # Get file stats                                                                                         
        stats = os.stat(filepath)                                                                                
        creation_time = datetime.fromtimestamp(stats.st_ctime)                                                   
        file_size = stats.st_size                                                                                
                                                                                                                
        # Determine organization from folder structure                                                           
        organization = folder_path.split('/')[0] if '/' in folder_path else 'unknown'                            
                                                                                                                
        # Extract text                                                                                           
        text = extract_text(filepath)                                                                            
                                                                                                                
        if not text.strip():                                                                                     
            print(f"No text extracted from {filepath}. Skipping summary, embedding, and keywords.")              
            summary = "No text available for summary."                                                           
            embedding = [0] * 768                                                                                
            keywords = []                                                                                        
        else:                                                                                                    
            # Generate summary, embedding, and keywords                                                          
            summary = generate_summary(text)                                                                     
            embedding = generate_embedding(text)                                                                 
            keywords = extract_keywords(text)                                                                    
                                                                                                                
        # Create the record structure                                                                            
        record = {                                                                                               
            "file": [                                                                                            
                {                                                                                                
                    "name": filename,                                                                            
                    "mediaType": "application/pdf",                                                              
                    "enablePublicUrl": True,                                                                     
                    "signedUrlTimeout": 300,                                                                     
                    "size": file_size                                                                            
                    # "base64Content": base64.b64encode(open(filepath, 'rb').read()).decode('utf-8')  # Option   
                }                                                                                                
            ],                                                                                                   
            "title": clean_filename_to_title(filename),                                                          
            "date": creation_time.strftime("%Y-%m-%dT%H:%M:%SZ"),                                                
            "summary": summary,                                                                                  
            "embedding": embedding,                                                                              
            "keywords": keywords,                                                                                
            "author": "unknown",                                                                                 
            "organization": organization,                                                                        
            "url": f"file://{filepath}",                                                                         
            "folder_path": folder_path                                                                           
        }                                                                                                        
                                                                                                                
        return record                                                                                            
                                                                                                                
    except Exception as e:                                                                                       
        print(f"Error processing {filepath}: {str(e)}")                                                          
        return None                                                                                              
                                                                                                                
def main():                                                                                                      
    # Get all PDFs recursively                                                                                   
    pdf_files = glob.glob('./case_files/**/*.pdf', recursive=True)                                               
    print(f"Total PDFs found: {len(pdf_files)}\n")                                                               
                                                                                                                
    # Process all PDFs and collect records                                                                       
    all_records = []                                                                                             
    for idx, pdf_file in enumerate(pdf_files, 1):                                                                
        print(f"Processing ({idx}/{len(pdf_files)}): {pdf_file}")                                                
        record = extract_metadata(pdf_file)                                                                      
        if record:                                                                                               
            all_records.append(record)                                                                           
                                                                                                                
    # Save all records to a JSON file for review                                                                 
    output_file = 'documents_metadata.json'                                                                      
    try:                                                                                                         
        with open(output_file, 'w', encoding='utf-8') as f:                                                      
            json.dump(all_records, f, ensure_ascii=False, indent=2)                                              
        print(f"\nProcessed {len(all_records)} PDF files. Metadata saved to '{output_file}'.")                   
    except Exception as e:                                                                                       
        print(f"Error saving metadata to JSON file: {str(e)}")                                                   
                                                                                                                
if __name__ == "__main__":                                                                                       
    main()                                        