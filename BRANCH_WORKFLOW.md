# 🌿 Working with the AEM Franklin Migration Branch

Great decision to use a branch! This keeps your production site safe while you test AEM Franklin.

## Current Setup

- ✅ **Branch Created**: `aem-franklin-migration`
- ✅ **Committed**: 22 new files (2,320 lines added)
- ✅ **Pushed**: Now on GitHub
- 🔒 **Main Branch**: Your current site is untouched and still live

## Branch-Specific Preview URLs

AEM Franklin creates unique URLs for each branch:

| Branch | Preview URL |
|--------|-------------|
| **main** | `https://main--drukelly-github-io--drukelly.hlx.page/` |
| **aem-franklin-migration** | `https://aem-franklin-migration--drukelly-github-io--drukelly.hlx.page/` |

### URL Pattern
```
https://[BRANCH]--[REPO]--[OWNER].hlx.page/
```

## Workflow

### Phase 1: Test on Branch (Current Phase)

```bash
# You're currently on the branch
git branch
# * aem-franklin-migration

# Make changes as needed
git add .
git commit -m "Update AEM Franklin configuration"
git push
```

**Preview**: `https://aem-franklin-migration--drukelly-github-io--drukelly.hlx.page/`

### Phase 2: Set Up Content

1. **Update fstab.yaml**
   ```bash
   nano fstab.yaml
   # Add your Google Drive folder ID
   ```

2. **Commit & Push**
   ```bash
   git add fstab.yaml
   git commit -m "Configure Google Drive folder"
   git push
   ```

3. **Test on da.live**
   - Go to https://da.live
   - Connect your repository
   - **Important**: da.live can access any branch!
   - Create test content in Google Docs
   - Preview at the branch URL

### Phase 3: Test Thoroughly

Test everything on the branch:

- [ ] All blocks render correctly
- [ ] Styles look good
- [ ] Navigation works
- [ ] Images load
- [ ] Links work
- [ ] Mobile responsive
- [ ] Performance is good
- [ ] Analytics tracking (if added)

### Phase 4: Merge to Main (When Ready)

Only when you're 100% confident:

```bash
# Switch to main
git checkout main

# Merge the branch
git merge aem-franklin-migration

# Push to production
git push origin main

# Your site now lives at:
# https://drukelly.github.io/
```

### Phase 5: Cleanup (Optional)

After successful merge:

```bash
# Delete local branch
git branch -d aem-franklin-migration

# Delete remote branch
git push origin --delete aem-franklin-migration
```

## Parallel Development

### Your Current Site (main branch)
```
main branch:
├── index.html (your current site)
├── css/
├── js/
└── (continues to work)

Preview: https://main--drukelly-github-io--drukelly.hlx.page/
Live: https://drukelly.github.io/
```

### AEM Franklin Site (aem-franklin-migration branch)
```
aem-franklin-migration branch:
├── index.html (legacy)
├── fstab.yaml (NEW - AEM config)
├── blocks/ (NEW - components)
├── scripts/ (NEW - AEM logic)
└── (Google Docs → content)

Preview: https://aem-franklin-migration--drukelly-github-io--drukelly.hlx.page/
```

## Benefits of This Approach

✅ **Zero Risk** - Production site unaffected
✅ **Test Freely** - Break things without consequences  
✅ **Side-by-Side** - Compare old vs new
✅ **Easy Rollback** - Just delete the branch if needed
✅ **Separate Preview** - Each branch gets its own URL
✅ **Gradual Migration** - Move at your own pace

## Making Changes

### On the Branch

```bash
# Make sure you're on the branch
git checkout aem-franklin-migration

# Make changes
nano blocks/hero/hero.css

# Commit
git add blocks/hero/hero.css
git commit -m "Update hero block styling"
git push

# Preview at branch URL
# https://aem-franklin-migration--drukelly-github-io--drukelly.hlx.page/
```

### Switching Between Branches

```bash
# Check current branch
git branch

# Switch to main (old site)
git checkout main

# Switch back to AEM branch
git checkout aem-franklin-migration

# See differences between branches
git diff main..aem-franklin-migration
```

## Content Authoring on Branch

### Setting up da.live for Branch

1. Go to https://da.live
2. Select your repository
3. **Branch selector** will show all branches
4. Choose `aem-franklin-migration`
5. Create content in Google Docs
6. Preview at: `https://aem-franklin-migration--drukelly-github-io--drukelly.hlx.page/`

### Testing Content

- Create test content in Google Docs
- Save changes
- Preview updates instantly at branch URL
- No impact on production site

## When to Merge to Main

✅ Merge when:
- All blocks work correctly
- Content displays properly
- Styles are finalized
- Performance is tested
- You're confident in the setup
- Stakeholders have approved (if applicable)

❌ Don't merge if:
- Still experimenting
- Blocks aren't rendering
- Styles need work
- Haven't tested thoroughly

## Rollback Strategy

If something goes wrong after merging:

```bash
# Find the commit before merge
git log --oneline

# Revert to previous state
git revert HEAD

# Or hard reset (use with caution)
git reset --hard HEAD~1
git push --force origin main
```

## Tips

### Keep Branch Updated
```bash
# If main gets updates, merge them into your branch
git checkout aem-franklin-migration
git merge main
git push
```

### Create Sub-branches
```bash
# For testing specific features
git checkout -b aem-franklin-hero-block
# ... make changes ...
git push -u origin aem-franklin-hero-block

# Preview at:
# https://aem-franklin-hero-block--drukelly-github-io--drukelly.hlx.page/
```

### Archive Old Files Later
```bash
# After successful migration, create archive branch
git checkout -b pre-aem-archive
git checkout aem-franklin-migration
git rm -r content/ templates/ src/
git commit -m "Remove old build system files"
```

## GitHub Pull Request (Optional)

You can create a PR for review:

1. Visit: https://github.com/drukelly/drukelly.github.io/pull/new/aem-franklin-migration
2. Review changes
3. Add description
4. Request reviews (if working with others)
5. Merge when ready

## Current Status

```
Repository: drukelly/drukelly.github.io

Branches:
├── main
│   └── [Your current working site] ✅ Live
│
└── aem-franklin-migration
    └── [AEM Franklin setup] 🚧 Testing
        ├── 22 new files
        ├── 2,320 lines added
        └── Ready to configure
```

## Next Steps

1. [ ] Update `fstab.yaml` with Google Drive folder ID
2. [ ] Push the change to branch
3. [ ] Connect repository on da.live
4. [ ] Select `aem-franklin-migration` branch
5. [ ] Create test content
6. [ ] Preview at branch URL
7. [ ] Test thoroughly
8. [ ] When confident, merge to main

## Questions?

**Q: Can I switch between branches easily?**  
A: Yes! Use `git checkout [branch-name]`

**Q: Will da.live work with my branch?**  
A: Absolutely! You can select which branch to work with in da.live

**Q: Can I have multiple people testing different branches?**  
A: Yes! Each person can create their own branch with unique preview URLs

**Q: What happens to my old site?**  
A: It stays on `main` branch, completely untouched until you merge

**Q: Can I delete the branch if I change my mind?**  
A: Yes! Just `git branch -d aem-franklin-migration` locally and `git push origin --delete aem-franklin-migration` remotely

---

**You made the right call using a branch!** Test safely, merge confidently. 🚀

