# AEM Franklin Migration Guide

Welcome! This guide will help you migrate your existing site to AEM Franklin (Edge Delivery Services).

## What I've Set Up For You

I've created the basic AEM Franklin structure in your repository:

### Created Files & Directories:
- ✅ `fstab.yaml` - Connects your site to Google Drive for content authoring
- ✅ `head.html` - Common head metadata for all pages
- ✅ `blocks/` - Directory for your custom blocks (hero, cards)
- ✅ `scripts/` - JavaScript files (scripts.js, delayed.js)
- ✅ `styles/` - CSS files (styles.css)

## Next Steps

### 1. Get the AEM Library File

The `aem.js` library is the core of Franklin. You need to download it:

**Option A: Direct Download**
```bash
cd scripts
curl -L https://raw.githubusercontent.com/adobe/aem-boilerplate/main/scripts/aem.js -o aem.js
```

**Option B: Copy from AEM Boilerplate**
Visit: https://github.com/adobe/aem-boilerplate/blob/main/scripts/aem.js
Copy the contents and paste into `scripts/aem.js`

### 2. Update Your Google Drive Connection

Edit `fstab.yaml` to point to YOUR Google Drive folder:

```yaml
mountpoints:
  /: https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE
```

**To get your folder ID:**
1. Create a Google Drive folder for your content
2. Share it with `helix@adobe.com` (Viewer access)
3. Copy the folder ID from the URL: `https://drive.google.com/drive/folders/[FOLDER_ID]`

### 3. Set Up da.live

Since you mentioned https://da.live/#/drukelly/aem-boilerplate:

1. Go to https://da.live
2. Connect your GitHub repository (drukelly/drukelly.github.io)
3. Link your Google Drive folder
4. You can now author content in Google Docs!

### 4. Create Content in Google Docs

Franklin uses Google Docs for content authoring. Here's how:

**Example Homepage (index.docx):**

```
# Hi, I'm Dru.

![Image](your-image-url)

The Short Version

A person with an enthusiasm creating and building for the web...

---
Hero

---
Cards

| Adobe Photoshop on adobe.com | Dashcam Video Compiler | Adobe MAX |
|---|---|---|
| In the Lab | Off the clock | I'm going to MAX this year! |
| I manage the Adobe Photoshop product... | This is a proof of concept... | I'm hoping for another... |
| [Open Ps on adobe.com](https://adobe.com/products/photoshop.html) | [Github Project](https://github.com/...) | [Adobe MAX](https://max.adobe.com) |

---
```

### 5. Test Your Site

Once set up:

1. **Local Development:**
   ```bash
   npm install @adobe/aem-cli
   aem up
   ```
   Visit: http://localhost:3000

2. **Preview on da.live:**
   - Your changes appear instantly at: `https://main--drukelly-github-io--drukelly.hlx.page/`

3. **Production:**
   - Publish content from da.live
   - Changes go live at: `https://drukelly.github.io/`

### 6. Convert Your Existing Content

Your current site structure can be converted to Franklin blocks:

**Current HTML:**
```html
<div class="grid-item project-1">
  <h2>Adobe Photoshop</h2>
  <p>Description</p>
  <a href="...">Link</a>
</div>
```

**Franklin Blocks (in Google Docs):**
```
---
Cards
---
```
Then create a table with your card content.

## Key Concepts

### Blocks
- Blocks are reusable components (hero, cards, etc.)
- Each block has its own CSS and JS
- Defined in Google Docs using tables with block names

### Authoring Flow
1. Create/edit content in Google Docs
2. Preview changes on `.hlx.page` domain
3. Publish when ready
4. Content goes live on your domain

### File Structure
```
your-site/
├── fstab.yaml              # Content source configuration
├── head.html               # Common head tags
├── blocks/                 # Custom blocks
│   ├── hero/
│   │   ├── hero.js
│   │   └── hero.css
│   └── cards/
│       ├── cards.js
│       └── cards.css
├── scripts/
│   ├── aem.js             # Core Franklin library
│   ├── scripts.js         # Your custom scripts
│   └── delayed.js         # Delayed loading scripts
└── styles/
    └── styles.css         # Global styles
```

## Troubleshooting

### Site Not Loading?
- Check that `scripts/aem.js` exists
- Verify `fstab.yaml` has correct Google Drive URL
- Ensure Google Drive folder is shared with `helix@adobe.com`

### Blocks Not Working?
- Check block name matches folder name exactly
- Verify block has both `.js` and `.css` files
- Check browser console for errors

### Content Not Updating?
- Clear cache: append `?cache=false` to URL
- Check da.live for publishing status
- Verify Google Doc is in the correct folder

## Resources

- [AEM Franklin Documentation](https://www.aem.live/docs/)
- [AEM Boilerplate Repository](https://github.com/adobe/aem-boilerplate)
- [Block Collection](https://www.aem.live/developer/block-collection)
- [Tutorial Videos](https://www.aem.live/developer/tutorial)

## Need Help?

- AEM Discord: https://discord.gg/aem-edge-delivery
- Documentation: https://www.aem.live/docs/
- GitHub Issues: https://github.com/adobe/aem-boilerplate/issues

---

## Migration Checklist

- [ ] Download `aem.js` library
- [ ] Create Google Drive folder for content
- [ ] Share folder with `helix@adobe.com`
- [ ] Update `fstab.yaml` with your folder ID
- [ ] Connect repository on da.live
- [ ] Create first Google Doc for homepage
- [ ] Test locally with `aem up`
- [ ] Preview on .hlx.page domain
- [ ] Configure custom domain (drukelly.github.io)
- [ ] Publish content

Good luck with your migration! 🚀

