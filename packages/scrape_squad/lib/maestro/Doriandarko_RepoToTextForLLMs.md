├── readme.md
└── repototxt.py


/readme.md:
--------------------------------------------------------------------------------
 1 | # RepoToTextForLLMs
 2 | ![hero](https://cdn.discordapp.com/attachments/1047006708813271100/1216931386032656445/im.jpeg?ex=66022eab&is=65efb9ab&hm=d472a26ec77b50ce5ee094578f888fa8b6c893bc523a5633f6987a850ae3b8d8&)
 3 | 
 4 | Automates the analysis of GitHub repositories specifically tailored for usage with large context LLMs. This Python script efficiently fetches README files, repository structure, and non-binary file contents. Additionally, it provides structured outputs complete with pre-formatted prompts to guide further analysis of the repository's content.
 5 | 
 6 | ## Features
 7 | 
 8 | - **README Retrieval:** Automatically extracts the content of README.md to provide an initial insight into the repository.
 9 | - **Structured Repository Traversal:** Maps out the repository's structure through an iterative traversal method, ensuring thorough coverage without the limitations of recursion.
10 | - **Selective Content Extraction:** Retrieves text contents from files, intelligently skipping over binary files to streamline the analysis process.
11 | 
12 | ## Prerequisites
13 | 
14 | To use **RepoToTextForLLMs**, you'll need:
15 | 
16 | - Python installed on your system.
17 | - The `github` Python package.
18 | - A GitHub Personal Access Token configured as an environment variable (`GITHUB_TOKEN`).
19 | 
20 | ## Getting Started
21 | 
22 | 1. Ensure Python and the required package (`PyGithub`) are installed:
23 | 
24 | ```bash
25 | pip install PyGithub tqdm
26 | ```
27 | 
28 | 2. Set your GitHub Personal Access Token as an environment variable:
29 | 
30 | ```python
31 | GITHUB_TOKEN = os.getenv('GITHUB_TOKEN', 'YOUR TOKEN HERE')
32 | ```
33 | 
34 | ## How to Use
35 | 
36 | 1. Place the script in your desired directory.
37 | 2. Execute the script in your terminal:
38 | 
39 | ```bash
40 | python repototxt.py
41 | ```
42 | 
43 | 3. Enter the GitHub repository URL when prompted. The script will process the repository and output its findings, including the README, structure, and file contents (excluding binary files), accompanied by analysis prompts.
44 | 
45 | ## Contributing
46 | 
47 | Contributions to **RepoToTextForLLMs** are welcomed. Whether it's through submitting pull requests, reporting issues, or suggesting improvements, your input helps make this tool better for everyone.
48 | 
49 | ## License
50 | 
51 | This project is licensed under the MIT License.
52 | 


--------------------------------------------------------------------------------
/repototxt.py:
--------------------------------------------------------------------------------
  1 | import os
  2 | from github import Github
  3 | from tqdm import tqdm
  4 | 
  5 | # Set your GitHub token here
  6 | GITHUB_TOKEN = os.getenv('GITHUB_TOKEN', 'YOUR TOKEN HERE')
  7 | 
  8 | def get_readme_content(repo):
  9 |     """
 10 |     Retrieve the content of the README file.
 11 |     """
 12 |     try:
 13 |         readme = repo.get_contents("README.md")
 14 |         return readme.decoded_content.decode('utf-8')
 15 |     except:
 16 |         return "README not found."
 17 | 
 18 | def traverse_repo_iteratively(repo):
 19 |     """
 20 |     Traverse the repository iteratively to avoid recursion limits for large repositories.
 21 |     """
 22 |     structure = ""
 23 |     dirs_to_visit = [("", repo.get_contents(""))]
 24 |     dirs_visited = set()
 25 | 
 26 |     while dirs_to_visit:
 27 |         path, contents = dirs_to_visit.pop()
 28 |         dirs_visited.add(path)
 29 |         for content in tqdm(contents, desc=f"Processing {path}", leave=False):
 30 |             if content.type == "dir":
 31 |                 if content.path not in dirs_visited:
 32 |                     structure += f"{path}/{content.name}/\n"
 33 |                     dirs_to_visit.append((f"{path}/{content.name}", repo.get_contents(content.path)))
 34 |             else:
 35 |                 structure += f"{path}/{content.name}\n"
 36 |     return structure
 37 | 
 38 | def get_file_contents_iteratively(repo):
 39 |     file_contents = ""
 40 |     dirs_to_visit = [("", repo.get_contents(""))]
 41 |     dirs_visited = set()
 42 |     binary_extensions = [
 43 |         # Compiled executables and libraries
 44 |         '.exe', '.dll', '.so', '.a', '.lib', '.dylib', '.o', '.obj',
 45 |         # Compressed archives
 46 |         '.zip', '.tar', '.tar.gz', '.tgz', '.rar', '.7z', '.bz2', '.gz', '.xz', '.z', '.lz', '.lzma', '.lzo', '.rz', '.sz', '.dz',
 47 |         # Application-specific files
 48 |         '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.odt', '.ods', '.odp',
 49 |         # Media files (less common)
 50 |         '.png', '.jpg', '.jpeg', '.gif', '.mp3', '.mp4', '.wav', '.flac', '.ogg', '.avi', '.mkv', '.mov', '.webm', '.wmv', '.m4a', '.aac',
 51 |         # Virtual machine and container images
 52 |         '.iso', '.vmdk', '.qcow2', '.vdi', '.vhd', '.vhdx', '.ova', '.ovf',
 53 |         # Database files
 54 |         '.db', '.sqlite', '.mdb', '.accdb', '.frm', '.ibd', '.dbf',
 55 |         # Java-related files
 56 |         '.jar', '.class', '.war', '.ear', '.jpi',
 57 |         # Python bytecode and packages
 58 |         '.pyc', '.pyo', '.pyd', '.egg', '.whl',
 59 |         # Other potentially important extensions
 60 |         '.deb', '.rpm', '.apk', '.msi', '.dmg', '.pkg', '.bin', '.dat', '.data',
 61 |         '.dump', '.img', '.toast', '.vcd', '.crx', '.xpi', '.lockb', 'package-lock.json', '.svg' ,
 62 |         '.eot', '.otf', '.ttf', '.woff', '.woff2',
 63 |         '.ico', '.icns', '.cur',
 64 |         '.cab', '.dmp', '.msp', '.msm',
 65 |         '.keystore', '.jks', '.truststore', '.cer', '.crt', '.der', '.p7b', '.p7c', '.p12', '.pfx', '.pem', '.csr',
 66 |         '.key', '.pub', '.sig', '.pgp', '.gpg',
 67 |         '.nupkg', '.snupkg', '.appx', '.msix', '.msp', '.msu',
 68 |         '.deb', '.rpm', '.snap', '.flatpak', '.appimage',
 69 |         '.ko', '.sys', '.elf',
 70 |         '.swf', '.fla', '.swc',
 71 |         '.rlib', '.pdb', '.idb', '.pdb', '.dbg',
 72 |         '.sdf', '.bak', '.tmp', '.temp', '.log', '.tlog', '.ilk',
 73 |         '.bpl', '.dcu', '.dcp', '.dcpil', '.drc',
 74 |         '.aps', '.res', '.rsrc', '.rc', '.resx',
 75 |         '.prefs', '.properties', '.ini', '.cfg', '.config', '.conf',
 76 |         '.DS_Store', '.localized', '.svn', '.git', '.gitignore', '.gitkeep',
 77 |     ]
 78 | 
 79 |     while dirs_to_visit:
 80 |         path, contents = dirs_to_visit.pop()
 81 |         dirs_visited.add(path)
 82 |         for content in tqdm(contents, desc=f"Downloading {path}", leave=False):
 83 |             if content.type == "dir":
 84 |                 if content.path not in dirs_visited:
 85 |                     dirs_to_visit.append((f"{path}/{content.name}", repo.get_contents(content.path)))
 86 |             else:
 87 |                 # Check if the file extension suggests it's a binary file
 88 |                 if any(content.name.endswith(ext) for ext in binary_extensions):
 89 |                     file_contents += f"File: {path}/{content.name}\nContent: Skipped binary file\n\n"
 90 |                 else:
 91 |                     file_contents += f"File: {path}/{content.name}\n"
 92 |                     try:
 93 |                         if content.encoding is None or content.encoding == 'none':
 94 |                             file_contents += "Content: Skipped due to missing encoding\n\n"
 95 |                         else:
 96 |                             try:
 97 |                                 decoded_content = content.decoded_content.decode('utf-8')
 98 |                                 file_contents += f"Content:\n{decoded_content}\n\n"
 99 |                             except UnicodeDecodeError:
100 |                                 try:
101 |                                     decoded_content = content.decoded_content.decode('latin-1')
102 |                                     file_contents += f"Content (Latin-1 Decoded):\n{decoded_content}\n\n"
103 |                                 except UnicodeDecodeError:
104 |                                     file_contents += "Content: Skipped due to unsupported encoding\n\n"
105 |                     except (AttributeError, UnicodeDecodeError):
106 |                         file_contents += "Content: Skipped due to decoding error or missing decoded_content\n\n"
107 |     return file_contents
108 | 
109 | def get_repo_contents(repo_url):
110 |     """
111 |     Main function to get repository contents.
112 |     """
113 |     repo_name = repo_url.split('/')[-1]
114 |     if not GITHUB_TOKEN:
115 |         raise ValueError("Please set the 'GITHUB_TOKEN' environment variable or the 'GITHUB_TOKEN' in the script.")
116 |     g = Github(GITHUB_TOKEN)
117 |     repo = g.get_repo(repo_url.replace('https://github.com/', ''))
118 | 
119 |     print(f"Fetching README for: {repo_name}")
120 |     readme_content = get_readme_content(repo)
121 | 
122 |     print(f"\nFetching repository structure for: {repo_name}")
123 |     repo_structure = f"Repository Structure: {repo_name}\n"
124 |     repo_structure += traverse_repo_iteratively(repo)
125 | 
126 |     print(f"\nFetching file contents for: {repo_name}")
127 |     file_contents = get_file_contents_iteratively(repo)
128 | 
129 |     instructions = f"Prompt: Analyze the {repo_name} repository to understand its structure, purpose, and functionality. Follow these steps to study the codebase:\n\n"
130 |     instructions += "1. Read the README file to gain an overview of the project, its goals, and any setup instructions.\n\n"
131 |     instructions += "2. Examine the repository structure to understand how the files and directories are organized.\n\n"
132 |     instructions += "3. Identify the main entry point of the application (e.g., main.py, app.py, index.js) and start analyzing the code flow from there.\n\n"
133 |     instructions += "4. Study the dependencies and libraries used in the project to understand the external tools and frameworks being utilized.\n\n"
134 |     instructions += "5. Analyze the core functionality of the project by examining the key modules, classes, and functions.\n\n"
135 |     instructions += "6. Look for any configuration files (e.g., config.py, .env) to understand how the project is configured and what settings are available.\n\n"
136 |     instructions += "7. Investigate any tests or test directories to see how the project ensures code quality and handles different scenarios.\n\n"
137 |     instructions += "8. Review any documentation or inline comments to gather insights into the codebase and its intended behavior.\n\n"
138 |     instructions += "9. Identify any potential areas for improvement, optimization, or further exploration based on your analysis.\n\n"
139 |     instructions += "10. Provide a summary of your findings, including the project's purpose, key features, and any notable observations or recommendations.\n\n"
140 |     instructions += "Use the files and contents provided below to complete this analysis:\n\n"
141 | 
142 |     return repo_name, instructions, readme_content, repo_structure, file_contents
143 | 
144 | if __name__ == '__main__':
145 |     repo_url = input("Please enter the GitHub repository URL: ")
146 |     try:
147 |         repo_name, instructions, readme_content, repo_structure, file_contents = get_repo_contents(repo_url)
148 |         output_filename = f'{repo_name}_contents.txt'
149 |         with open(output_filename, 'w', encoding='utf-8') as f:
150 |             f.write(instructions)
151 |             f.write(f"README:\n{readme_content}\n\n")
152 |             f.write(repo_structure)
153 |             f.write('\n\n')
154 |             f.write(file_contents)
155 |         print(f"Repository contents saved to '{output_filename}'.")
156 |     except ValueError as ve:
157 |         print(f"Error: {ve}")
158 |     except Exception as e:
159 |         print(f"An error occurred: {e}")
160 |         print("Please check the repository URL and try again.")
161 |