# Markdown-based Website Generator

This project allows you to create a website using markdown files. It automatically converts markdown content to HTML and provides a live preview feature.

## Setup

1. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Create your content in markdown files inside the `content` directory.

3. Run the build script:
   ```bash
   python src/build.py
   ```

The script will:
- Watch for changes in your markdown files
- Automatically convert markdown to HTML
- Copy static assets (CSS, JS, images) to the root directory
- Generate the site files in the root directory
- Automatically delete HTML files when their source markdown files are deleted
- Clean up empty directories after file deletions

## Project Structure

- `src/` - Contains Python scripts
  - `build.py` - Main build script
- `content/` - Place your markdown files here
- `templates/` - Contains HTML templates
- `css/`, `js/`, `img/` - Static assets

## Writing Content

Create `.md` files in the `content` directory. The file structure in `content` will be reflected in the generated site. For example:

- `content/index.md` → `index.html`
- `content/about.md` → `about.html`
- `content/blog/post1.md` → `blog/post1.html`

When you delete a markdown file, its corresponding HTML file will be automatically removed.

## Customization

- Modify `templates/base.html` to change the site layout
- Add your CSS in the `css` directory
- Add your JavaScript in the `js` directory
- Add images in the `img` directory

## Development

The build script includes a file watcher that automatically:
- Rebuilds the site when you make changes to your markdown files
- Deletes HTML files when their source markdown files are removed
- Cleans up empty directories after deletions

To stop the development server, press Ctrl+C. 