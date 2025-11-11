# 📋 How to Get Your Google Drive Folder ID

## Quick Reference

Your `fstab.yaml` file needs to look like this:

```yaml
mountpoints:
  /: https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE
```

## Detailed Steps

### 1. Create Google Drive Folder

- Go to: https://drive.google.com
- Click: **New** → **Folder**
- Name: `drukelly-website-content` (or any name you prefer)
- Click: **Create**

### 2. Share with AEM

**Right-click the folder** → **Share**

Add this email address:
```
helix@adobe.com
```

**Important Settings:**
- ✅ Permission: **Viewer** (NOT Editor)
- ✅ Uncheck "Notify people"
- ✅ Click "Share"

### 3. Get Folder ID from URL

**Open the folder** you just created, then look at the browser URL:

```
https://drive.google.com/drive/folders/1MGzOt7ubUh3gu7zhZIPMdYaHcJiTdRAx
                                        └─────────────┬─────────────┘
                                              COPY THIS PART
```

**The folder ID is everything after `/folders/`**

### 4. Update fstab.yaml

Replace the current content with your folder ID:

**Before:**
```yaml
mountpoints:
  /: https://drive.google.com/drive/folders/1MGzOt7ubUh3gu7zhZIPMdYaHcJiTdRAx
```

**After (with YOUR folder ID):**
```yaml
mountpoints:
  /: https://drive.google.com/drive/folders/[YOUR_ACTUAL_FOLDER_ID]
```

### 5. Commit & Push

```bash
git add fstab.yaml
git commit -m "Configure Google Drive folder for content"
git push
```

## Example

Let's say you created a folder and the URL is:
```
https://drive.google.com/drive/folders/1a2B3c4D5e6F7g8H9i0JkLmNoPqRsTuV
```

Your `fstab.yaml` should be:
```yaml
mountpoints:
  /: https://drive.google.com/drive/folders/1a2B3c4D5e6F7g8H9i0JkLmNoPqRsTuV
```

## Verify It Works

After updating:

1. **Commit & push** your changes
2. **Go to da.live**: https://da.live
3. **Connect your repository**
4. **You should see** your Google Drive folder connected
5. **Create a test doc** in the folder
6. **Preview** at: `https://aem-franklin-migration--drukelly-github-io--drukelly.hlx.page/`

## Troubleshooting

### "Folder not found" error
- ✅ Check that you shared with `helix@adobe.com`
- ✅ Verify permission is "Viewer"
- ✅ Copy the ENTIRE folder ID

### "Permission denied"
- ✅ Make sure the folder is shared
- ✅ Check that helix@adobe.com has Viewer access

### "Invalid URL"
- ✅ Format must be: `https://drive.google.com/drive/folders/[ID]`
- ✅ No extra spaces or characters
- ✅ No trailing slashes

## Pro Tips

### Organize Your Content

In your Google Drive folder, create subfolders for organization:

```
drukelly-website-content/
├── drafts/
├── published/
├── images/
└── archive/
```

### Use Multiple Mountpoints (Advanced)

You can mount different folders to different paths:

```yaml
mountpoints:
  /: https://drive.google.com/drive/folders/[MAIN_FOLDER_ID]
  /blog: https://drive.google.com/drive/folders/[BLOG_FOLDER_ID]
  /docs: https://drive.google.com/drive/folders/[DOCS_FOLDER_ID]
```

### Test with a New Doc

After setup, create a Google Doc in your folder:

**Filename:** `test`

**Content:**
```
# Test Page

This is a test to verify my AEM Franklin setup is working.

Hello from Google Docs! 👋
```

**Preview at:**
```
https://aem-franklin-migration--drukelly-github-io--drukelly.hlx.page/test
```

## Security Notes

✅ **Safe to share with helix@adobe.com** - This is Adobe's official service account
✅ **Viewer permission only** - They can't modify your content
✅ **Your content stays private** - Only you and AEM can access it
✅ **Folder ID is not sensitive** - Safe to commit to public repo

## Alternative: Use SharePoint or OneDrive

If you prefer Microsoft tools:

```yaml
mountpoints:
  /: https://[your-org].sharepoint.com/sites/[site]/[folder]
```

Or OneDrive:

```yaml
mountpoints:
  /: https://onedrive.live.com/[folder-path]
```

(Same sharing principles apply - share with helix@adobe.com)

## Next Steps After Setup

1. ✅ Update fstab.yaml
2. ✅ Commit & push
3. ✅ Connect on da.live
4. ✅ Create your first content doc
5. ✅ Preview your site
6. ✅ Start building!

---

**Need help?** Check out the other docs:
- `QUICK_START.md` - Get running fast
- `BRANCH_WORKFLOW.md` - Working with branches
- `CONTENT_EXAMPLE.md` - Creating content

