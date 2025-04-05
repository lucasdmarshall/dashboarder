import os
import re

def update_page_layout(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Revert margin changes
    box_pattern = r'(ml="250px"(\s+)width="calc\(100% - 250px\)"(\s+))(mt)="100px"'
    box_replacement = r'\1\4="80px"'
    content = re.sub(box_pattern, box_replacement, content)
    
    container_pattern = r'(ml="250px"(\s+))(mt)="100px"'
    container_replacement = r'\1\3="80px"'
    content = re.sub(container_pattern, container_replacement, content)
    
    # Add 5px to margin-top
    box_pattern = r'(ml="250px"(\s+)width="calc\(100% - 250px\)"(\s+))(mt)="80px"'
    box_replacement = r'\1\4="85px"'
    content = re.sub(box_pattern, box_replacement, content)
    
    container_pattern = r'(ml="250px"(\s+))(mt)="80px"'
    container_replacement = r'\1\3="85px"'
    content = re.sub(container_pattern, container_replacement, content)
    
    # Add slight padding to first heading
    heading_pattern = r'(<Heading\s+)(mb={8})'
    heading_replacement = r'\1pt={2} \2'
    content = re.sub(heading_pattern, heading_replacement, content)
    
    with open(file_path, 'w') as f:
        f.write(content)

def main():
    pages_dir = '/Users/leon/Documents/New copy/lms-project/frontend/src/pages'
    
    for filename in os.listdir(pages_dir):
        if filename.endswith('.js'):
            file_path = os.path.join(pages_dir, filename)
            try:
                update_page_layout(file_path)
                print(f"Updated {filename}")
            except Exception as e:
                print(f"Error updating {filename}: {e}")

if __name__ == '__main__':
    main()
