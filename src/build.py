#!/usr/bin/env python3
import os
import markdown2
from jinja2 import Environment, FileSystemLoader
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from tqdm import tqdm
import time
from datetime import datetime

class MarkdownHandler(FileSystemEventHandler):
    def __init__(self, build_script):
        self.build_script = build_script

    def on_modified(self, event):
        if event.src_path.endswith('.md'):
            print(f"\nDetected change in {event.src_path}")
            self.build_script.build_site(specific_file=event.src_path)
    
    def on_deleted(self, event):
        if event.src_path.endswith('.md'):
            print(f"\nDetected deletion of {event.src_path}")
            self.build_script.handle_deleted_file(event.src_path)

class SiteBuilder:
    def __init__(self):
        # Get the project root directory (parent of src)
        self.project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        
        # Define paths relative to project root
        self.template_dir = os.path.join(self.project_root, 'templates')
        self.content_dir = os.path.join(self.project_root, 'content')
        self.env = Environment(
            loader=FileSystemLoader(self.template_dir),
            autoescape=True  # Enable auto-escaping
        )
        
        # Create necessary directories
        os.makedirs(self.template_dir, exist_ok=True)
        os.makedirs(self.content_dir, exist_ok=True)

    def count_files(self, directory, extension=None):
        """Count files in directory with optional extension filter"""
        count = 0
        for root, _, files in os.walk(directory):
            if extension:
                count += sum(1 for f in files if f.endswith(extension))
            else:
                count += len(files)
        return count

    def needs_update(self, md_path, html_path):
        """Check if HTML file needs to be updated based on markdown file"""
        # If HTML doesn't exist, it needs to be created
        if not os.path.exists(html_path):
            return True
        
        # If markdown is newer than HTML, it needs to be updated
        md_mtime = os.path.getmtime(md_path)
        html_mtime = os.path.getmtime(html_path)
        
        # Also check if template is newer than HTML
        template_path = os.path.join(self.template_dir, 'base.html')
        template_mtime = os.path.getmtime(template_path)
        
        return md_mtime > html_mtime or template_mtime > html_mtime

    def build_site(self, specific_file=None):
        if specific_file:
            # Process only the specific file that changed
            if os.path.exists(specific_file) and specific_file.endswith('.md'):
                rel_path = os.path.relpath(specific_file, self.content_dir)
                self.process_markdown_file(os.path.dirname(specific_file), os.path.basename(specific_file))
                print(f"\nRebuilt: {rel_path}")
            return

        print("\nChecking for changes...")
        
        # Process markdown files with progress bar
        md_files_to_process = []
        total_md_files = 0
        updated_files = 0

        # First, collect all files that need updating
        for root, _, files in os.walk(self.content_dir):
            for file in files:
                if file.endswith('.md'):
                    total_md_files += 1
                    md_path = os.path.join(root, file)
                    html_path = os.path.join(
                        self.project_root,
                        os.path.splitext(os.path.relpath(md_path, self.content_dir))[0] + '.html'
                    )
                    if self.needs_update(md_path, html_path):
                        md_files_to_process.append((root, file))
                        updated_files += 1

        if md_files_to_process:
            print(f"\nProcessing {updated_files} changed files:")
            for root, file in tqdm(md_files_to_process, desc="Converting markdown", unit="file"):
                self.process_markdown_file(root, file)
        else:
            print("\nAll markdown files are up to date!")
        
        # Copy static assets only if they've changed
        print("\nChecking static assets...")
        static_dirs = ['css', 'js', 'img']
        updated_static_files = 0
        
        for dir_name in static_dirs:
            src_dir = os.path.join(self.project_root, dir_name)
            if os.path.exists(src_dir):
                dest_dir = os.path.join(self.project_root, dir_name)
                os.makedirs(dest_dir, exist_ok=True)
                updated_static_files += self.copy_directory_if_newer(src_dir, dest_dir)
        
        if updated_static_files > 0:
            print(f"Updated {updated_static_files} static files.")
        else:
            print("All static files are up to date!")

        print(f"\nBuild complete! ✨")
        if updated_files > 0 or updated_static_files > 0:
            print(f"Updated {updated_files} of {total_md_files} markdown files and {updated_static_files} static files.")
        else:
            print("No changes needed!")

    def copy_directory_if_newer(self, src, dest):
        """Copy files from src to dest only if they're newer. Returns count of updated files."""
        updated_files = 0
        for root, _, files in os.walk(src):
            for file in files:
                src_path = os.path.join(root, file)
                dest_path = os.path.join(dest, os.path.relpath(src_path, src))
                
                # Check if file needs updating
                if not os.path.exists(dest_path) or os.path.getmtime(src_path) > os.path.getmtime(dest_path):
                    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
                    with open(src_path, 'rb') as f_src, open(dest_path, 'wb') as f_dest:
                        f_dest.write(f_src.read())
                    updated_files += 1
        return updated_files

    def process_markdown_file(self, root, file):
        # Read markdown content
        md_path = os.path.join(root, file)
        with open(md_path, 'r', encoding='utf-8') as f:
            md_content = f.read()

        # Validate markdown content
        self.validate_markdown_content(md_content)

        # Convert markdown to HTML
        html_content = markdown2.markdown(md_content, safe_mode=True)

        # Get template
        template = self.env.get_template('base.html')

        # Render HTML with current year
        output_html = template.render(
            content=html_content,
            year=datetime.now().year
        )

        # Create output path in root directory
        rel_path = os.path.relpath(md_path, self.content_dir)
        output_path = os.path.join(
            self.project_root,
            os.path.splitext(rel_path)[0] + '.html'
        )

        # Write output file
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(output_html)

    def sanitize_path(self, path):
        # Normalize path and ensure it's within project root
        normalized = os.path.normpath(path)
        if not normalized.startswith(self.project_root):
            raise ValueError("Path traversal attempt detected")
        return normalized

    def is_safe_file(self, filename):
        allowed_extensions = {'.md', '.html', '.css', '.js', '.jpg', '.png', '.gif'}
        return os.path.splitext(filename)[1].lower() in allowed_extensions

    def validate_markdown_content(self, content):
        # Add checks for potentially dangerous content
        if '{%' in content or '{{' in content:  # Check for template injection
            raise ValueError("Template injection attempt detected")

    def handle_deleted_file(self, md_path):
        """Handle deletion of a markdown file by removing its HTML counterpart"""
        try:
            # Get the relative path of the markdown file
            rel_path = os.path.relpath(md_path, self.content_dir)
            # Construct the path of the HTML file
            html_path = os.path.join(
                self.project_root,
                os.path.splitext(rel_path)[0] + '.html'
            )
            
            # Delete the HTML file if it exists
            if os.path.exists(html_path):
                os.remove(html_path)
                print(f"Deleted HTML file: {html_path}")
            
            # Check if the parent directory is empty and remove it if so
            parent_dir = os.path.dirname(html_path)
            if os.path.exists(parent_dir) and not os.listdir(parent_dir):
                os.rmdir(parent_dir)
                print(f"Removed empty directory: {parent_dir}")
                
        except Exception as e:
            print(f"Error handling deleted file: {e}")

def main():
    builder = SiteBuilder()
    
    # Build site initially
    builder.build_site()
    
    print("\nWatching for changes... (Press Ctrl+C to stop)")
    
    # Set up file watching
    event_handler = MarkdownHandler(builder)
    observer = Observer()
    observer.schedule(event_handler, path=builder.content_dir, recursive=True)
    observer.start()
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        print("\nStopping the build server...")
    observer.join()

if __name__ == '__main__':
    main() 