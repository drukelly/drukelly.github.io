# 🔍 Preview URL Troubleshooting Guide

## Issue: .hlx.page URLs Return 404

Your preview URLs are:
- `https://aem-franklin-migration--drukelly-github-io--drukelly.hlx.page/`
- `https://aem-franklin-migration--drukelly-github-io--drukelly.hlx.page/test`

But they're returning 404 errors.

## Root Cause

The `.hlx.page` preview URLs require your repository to be **registered with Adobe's Edge Delivery Services**. Even with all the files in place, Adobe's system needs to know about your repo.

## Solutions (Try These in Order)

### Solution 1: Install AEM Sidekick Browser Extension

The AEM Sidekick extension is often the key to activating preview URLs:

1. **Install the extension**:
   - Chrome: https://chrome.google.com/webstore/detail/helix-sidekick/ccfggkjabjahcjoljmgmklhpaccedipo
   - Firefox: https://addons.mozilla.org/en-US/firefox/addon/aem-sidekick/
   - Edge: https://microsoftedge.microsoft.com/addons/detail/aem-sidekick/kbphkjomaeedaihhikeedglaoppjfkfe

2. **Configure the Sidekick**:
   - Click the Sidekick icon
   - Add project: `https://github.com/drukelly/drukelly.github.io`
   - Select branch: `aem-franklin-migration`

3. **Preview from Sidekick**:
   - Open your Google Doc in Drive
   - Click the Sidekick icon
   - Click "Preview"

This should bootstrap the preview system.

### Solution 2: Use Admin API to Bootstrap

Try accessing these URLs to manually trigger preview generation:

**Status Check:**
```
https://admin.hlx.page/status/drukelly/drukelly.github.io/aem-franklin-migration
```

**Preview Trigger:**
```
https://admin.hlx.page/preview/drukelly/drukelly.github.io/aem-franklin-migration/test
```

**Live Trigger:**
```
https://admin.hlx.page/live/drukelly/drukelly.github.io/aem-franklin-migration/test
```

### Solution 3: Use .hlx.live Instead of .hlx.page

Try the `.hlx.live` domain instead (this is the "live" tier):

```
https://aem-franklin-migration--drukelly-github-io--drukelly.hlx.live/
https://aem-franklin-migration--drukelly-github-io--drukelly.hlx.live/test
```

### Solution 4: Local Preview with AEM CLI

While we troubleshoot, preview locally:

```bash
# Install AEM CLI (one-time)
npm install -g @adobe/aem-cli

# Start local server
cd /Users/drukelly/Projects/drukelly.github.io
aem up

# Open in browser
# http://localhost:3000
```

This will simulate the Franklin environment on your machine.

### Solution 5: Wait and Retry

Sometimes there's a delay of 5-10 minutes after:
- First pushing Franklin files
- Connecting on da.live
- Creating first content

Try waiting 10 minutes and then:
1. Clear browser cache
2. Try the preview URL again
3. Try in incognito/private mode

### Solution 6: Check GitHub Repository Settings

1. Go to: https://github.com/drukelly/drukelly.github.io/settings
2. Check **GitHub Pages** section:
   - Is it enabled?
   - What branch is it deploying? (should be `main`)
3. Check **Visibility**:
   - Is the repo public or private?
   - Franklin works best with public repos

### Solution 7: Verify da.live Connection

Double-check your da.live setup:

1. Go to: https://da.live
2. Find your project
3. Verify:
   - ✅ Repository: `drukelly/drukelly.github.io`
   - ✅ Branch: `aem-franklin-migration`
   - ✅ Google Drive connected
   - ✅ Folder ID: `1S0idw6NEEkUiuYFm0cc0e6tlTCmhDKXX`

4. Try clicking "Preview" from da.live interface

### Solution 8: Check if Main Branch Preview Works

Try the main branch preview URL:

```
https://main--drukelly-github-io--drukelly.hlx.page/
```

**If this works:**
- The issue is specific to your branch
- Franklin might need the branch to have Franklin files on first push

**If this doesn't work either:**
- The repository isn't registered with Edge Delivery Services
- You need to use the AEM Sidekick to bootstrap it

## Common Reasons for 404

### ❌ Repository Not Bootstrapped
**Symptom**: All .hlx.page URLs return 404
**Fix**: Use AEM Sidekick extension to activate the repo

### ❌ Wrong URL Format
**Symptom**: Specific pages return 404
**Fix**: Check URL format: `https://[branch]--[repo-name]--[username].hlx.page/[page]`

### ❌ No Content Yet
**Symptom**: Root works, specific pages 404
**Fix**: Create Google Docs with exact page names

### ❌ Google Drive Not Connected
**Symptom**: Preview loads but shows errors
**Fix**: Verify folder is shared with helix@adobe.com

### ❌ Branch Name Issues
**Symptom**: Branch preview doesn't work, main does
**Fix**: Branch names with special characters can cause issues

## Verification Checklist

Run through this checklist:

- [ ] Files are committed and pushed to GitHub
- [ ] `fstab.yaml` exists with correct Google Drive URL
- [ ] `head.html` exists
- [ ] `scripts/aem.js` exists (21KB)
- [ ] Google Drive folder is shared with helix@adobe.com
- [ ] Repository is connected on da.live
- [ ] Branch is selected correctly on da.live
- [ ] AEM Sidekick extension is installed
- [ ] Google Docs exist in Drive folder with content
- [ ] Waited 5-10 minutes after first setup
- [ ] Tried in incognito/private browsing mode
- [ ] Cleared browser cache

## Alternative: Test on Main Branch

If you want to see it working sooner, you could merge to main:

```bash
# Switch to main
git checkout main

# Merge your branch
git merge aem-franklin-migration

# Push to production
git push

# Preview at:
# https://main--drukelly-github-io--drukelly.hlx.page/
```

**Note**: This will update your production site, so only do this if you're ready!

## Debug URLs to Try

Try these URLs and note what you see:

1. Admin status:
   ```
   https://admin.hlx.page/status/drukelly/drukelly.github.io/aem-franklin-migration
   ```

2. Preview (page domain):
   ```
   https://aem-franklin-migration--drukelly-github-io--drukelly.hlx.page/
   ```

3. Live (live domain):
   ```
   https://aem-franklin-migration--drukelly-github-io--drukelly.hlx.live/
   ```

4. Main branch:
   ```
   https://main--drukelly-github-io--drukelly.hlx.page/
   ```

## Get Help

If none of these work:

1. **AEM Discord**: https://discord.gg/aem-edge-delivery
2. **Franklin Docs**: https://www.aem.live/docs/
3. **GitHub Issues**: https://github.com/adobe/aem-boilerplate/issues

Share:
- Your repository URL
- What you see at the admin status URL
- Whether Sidekick is installed
- Screenshots of any errors

## Expected Behavior

Once working, you should see:
- Preview URLs load instantly
- Content from Google Docs appears
- Blocks render correctly
- Updates appear within 5-10 seconds

## Next Steps

1. **Try AEM Sidekick** - This is most likely to fix it
2. **Try AEM CLI locally** - This will work while debugging
3. **Wait 10 minutes** - Sometimes there's just a delay
4. **Check admin URLs** - See if the repo is recognized
5. **Ask on Discord** - The community can help troubleshoot

---

**Most likely fix**: Install the AEM Sidekick browser extension and use it to preview. This typically bootstraps the entire preview system for your repository.

