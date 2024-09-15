import os

# Define the project structure
project_structure = {
    ".": [
        "components",    # Holds the reusable UI components
        "data",          # Holds the static data (books.json, etc.)
        "pages",         # HTML pages (index, book reader, about)
        "assets/images", # Static images folder
        "assets/fonts",  # Static fonts folder
        "styles",        # CSS files for styling
        "scripts"        # JavaScript files for app logic
    ],
    "public": [],        # Optional public folder for static files
    "docs": []           # Documentation folder (optional)
}

# Initialize base files in the project
base_files = {
    "pages/index.html": """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>eBook Reader</title>
    <link rel="stylesheet" href="../styles/main.css">
</head>
<body>
    <header>
        <h1>Welcome to the eBook Reader</h1>
    </header>
    <main>
        <div id="book-list"></div>
    </main>
    <script src="../scripts/app.js"></script>
</body>
</html>
    """,
    "styles/main.css": """
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

header {
    background-color: #333;
    color: #fff;
    padding: 10px;
    text-align: center;
}

main {
    padding: 20px;
}

#book-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

#book-list div {
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    width: 150px;
    text-align: center;
}

#book-list a {
    text-decoration: none;
    color: #333;
}

#book-list a:hover {
    color: #007BFF;
}
    """,
    "scripts/app.js": """
document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/books.json')
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById('book-list');
            data.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.innerHTML = `<a href="book.html?id=${book.id}">${book.title}</a>`;
                bookList.appendChild(bookItem);
            });
        });
});
    """,
    "data/books.json": """
[
    {
        "id": 1,
        "title": "Book One",
        "author": "Author One",
        "chapters": [
            { "id": 1, "title": "Chapter 1", "file": "chapter1.html" },
            { "id": 2, "title": "Chapter 2", "file": "chapter2.html" }
        ]
    },
    {
        "id": 2,
        "title": "Book Two",
        "author": "Author Two",
        "chapters": [
            { "id": 1, "title": "Chapter 1", "file": "chapter1.html" },
            { "id": 2, "title": "Chapter 2", "file": "chapter2.html" }
        ]
    }
]
    """
}

# Function to create directories
def create_directory(path):
    try:
        os.makedirs(path, exist_ok=True)
        print(f"Created directory: {path}")
    except OSError as e:
        print(f"Error creating directory {path}: {e}")

# Function to create files
def create_file(path, content):
    try:
        with open(path, 'w') as f:
            f.write(content.strip())
        print(f"Created file: {path}")
    except OSError as e:
        print(f"Error creating file {path}: {e}")

# Main initialization function
def initialize_project():
    for folder, subfolders in project_structure.items():
        if isinstance(subfolders, list):
            for subfolder in subfolders:
                if isinstance(subfolder, str):
                    create_directory(os.path.join(folder, subfolder))
                elif isinstance(subfolder, list):
                    for inner_folder in subfolder:
                        create_directory(os.path.join(folder, inner_folder))
        else:
            create_directory(folder)

    for file_path, file_content in base_files.items():
        create_file(file_path, file_content)

if __name__ == "__main__":
    initialize_project()
