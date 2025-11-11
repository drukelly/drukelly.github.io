# 🚀 Quick Start - Get Your Site Running in 10 Minutes

## Step 1: Update fstab.yaml (2 minutes)

1. Create a new folder in your Google Drive named "drukelly-website-content"
2. Right-click the folder → Share → Add `helix@adobe.com` as a Viewer
3. Copy the folder ID from the URL: `https://drive.google.com/drive/folders/[COPY_THIS_PART]`
4. Edit `fstab.yaml` and replace the placeholder with your folder ID:

```yaml
mountpoints:
  /: https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE
```

## Step 2: Connect on da.live (2 minutes)

1. Go to https://da.live
2. Sign in with your GitHub account
3. Click "+" to add a repository
4. Select `drukelly/drukelly.github.io`
5. Connect the Google Drive folder you just created

## Step 3: Create Your Homepage (3 minutes)

In your Google Drive folder, create a new Google Doc named `index`:

**Type this in the doc:**

```
# Hi, I'm Dru.

A person with an enthusiasm creating and building for the web.

---
```

**Save it.**

## Step 4: Preview (1 minute)

**Branch Preview URL:**
```
https://aem-franklin-migration--drukelly-github-io--drukelly.hlx.page/
```

**Main Site (unchanged):**
```
https://main--drukelly-github-io--drukelly.hlx.page/
```

You should see your new content on the branch URL!

## Step 5: Push Changes (Already Done! ✅)

Your AEM Franklin files are already committed to the `aem-franklin-migration` branch and pushed to GitHub.

**Branch Preview URL:**
```
https://aem-franklin-migration--drukelly-github-io--drukelly.hlx.page/
```

> 💡 **Smart move using a branch!** This keeps your production site safe while testing.

## That's It! 🎉

Your site is now:
- ✅ Editable in Google Docs  
- ✅ Auto-deployed on save
- ✅ Blazing fast (edge delivery)
- ✅ Ready to customize

## Next Steps

### Add More Content
Create more Google Docs in your Drive folder:
- `about` → becomes `/about`
- `projects` → becomes `/projects`

### Use Blocks
Add a Cards block to show your projects:

```
---
Cards
| Adobe Photoshop | Dashcam Compiler | Adobe MAX |
| --- | --- | --- |
| I manage the Photoshop pages | Video editing POC | Going to MAX! |
| [Visit](https://adobe.com/products/photoshop.html) | [GitHub](https://github.com/...) | [MAX](https://max.adobe.com) |
---
```

### Customize Styling
Edit `styles/styles.css` to match your brand.

### Add Analytics
Add your Google Analytics code to `head.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR-ID');
</script>
```

## Publish to Production

When you're ready:
1. Open da.live
2. Click the "Publish" button next to your content
3. Your changes go live at https://drukelly.github.io/

## Need Help?

- 📖 Read `AEM_MIGRATION_GUIDE.md` for detailed instructions
- 📝 Check `CONTENT_EXAMPLE.md` for content formatting examples
- 📊 Review `SETUP_SUMMARY.md` for complete overview
- 🌐 Visit https://www.aem.live/docs/

---

**Tip**: Keep your old site running until you've fully tested AEM Franklin. Both can coexist!

