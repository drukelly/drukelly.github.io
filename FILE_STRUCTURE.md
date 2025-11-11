# 📁 AEM Franklin File Structure

## New Files Created for AEM Franklin

\`\`\`
drukelly.github.io/
│
├── 📄 Configuration Files
│   ├── fstab.yaml                 ⚠️ UPDATE THIS - Connect to Google Drive
│   ├── head.html                  ✅ Common HTML head tags
│   ├── package.json               ✅ Node.js dependencies
│   └── .hlxignore                 ✅ Files to exclude from AEM
│
├── 📦 Blocks/ (Your Components)
│   ├── hero/
│   │   ├── hero.js               ✅ Hero block logic
│   │   └── hero.css              ✅ Hero block styling
│   ├── cards/
│   │   ├── cards.js              ✅ Cards block logic (for projects)
│   │   └── cards.css             ✅ Cards block styling
│   ├── header/
│   │   ├── header.js             ✅ Navigation logic
│   │   └── header.css            ✅ Header styling
│   └── footer/
│       ├── footer.js             ✅ Footer logic
│       └── footer.css            ✅ Footer styling
│
├── 🎨 Styles/
│   └── styles.css                ✅ Global styles for entire site
│
├── ⚡ Scripts/
│   ├── aem.js                    ✅ Core AEM Franklin library (21KB)
│   ├── scripts.js                ✅ Main application logic
│   └── delayed.js                ✅ Delayed loading functionality
│
├── 🛠️ Tools/
│   └── sidekick/
│       └── config.json           ✅ AEM Sidekick configuration
│
├── 📚 Documentation
│   ├── QUICK_START.md            ✅ 10-minute setup guide
│   ├── AEM_MIGRATION_GUIDE.md    ✅ Complete migration guide
│   ├── CONTENT_EXAMPLE.md        ✅ Content creation examples
│   ├── SETUP_SUMMARY.md          ✅ What was done & next steps
│   └── FILE_STRUCTURE.md         ✅ This file
│
└── 📦 Legacy Files (Your Current Site)
    ├── index.html                Keep for now, archive later
    ├── css/                      Your old CSS
    ├── js/                       Your old JS
    ├── img/                      ✅ Keep - can reuse images
    ├── content/                  Can archive after migration
    ├── templates/                Can archive after migration
    ├── src/                      Can archive after migration
    └── requirements.txt          Can archive after migration
\`\`\`

## How It Works

### Content Creation Flow

\`\`\`
┌─────────────────┐
│  Google Docs    │  1. Create/edit content in familiar tools
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Google Drive   │  2. Content stored in Drive folder
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   fstab.yaml    │  3. Links Drive to your GitHub repo
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   AEM Franklin  │  4. Processes content + blocks
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Edge CDN      │  5. Delivered blazing fast worldwide
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Your Visitors  │  6. See beautiful, fast site
└─────────────────┘
\`\`\`

### Block Architecture

\`\`\`
┌──────────────────────────────────┐
│     Your Google Doc Content      │
│                                  │
│  ---                             │
│  Cards                           │  ← Block declaration
│  | Title 1 | Title 2 |           │
│  | Desc 1  | Desc 2  |           │
│  ---                             │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│    AEM Franklin Processing       │
│  1. Finds "Cards" block          │
│  2. Looks for blocks/cards/      │
│  3. Runs cards.js                │
│  4. Applies cards.css            │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│       Rendered HTML              │
│  <div class="cards">             │
│    <div class="card">...</div>   │
│  </div>                          │
└──────────────────────────────────┘
\`\`\`

## File Purposes

### Must Modify
- **fstab.yaml** - REQUIRED: Connect to your Google Drive folder

### Modify to Customize
- **styles/styles.css** - Change colors, fonts, spacing
- **blocks/\*/\*.css** - Customize individual block styling
- **blocks/\*/\*.js** - Add block functionality
- **head.html** - Add analytics, fonts, meta tags

### Don't Touch (Unless You Know What You're Doing)
- **scripts/aem.js** - Core Franklin library
- **scripts/scripts.js** - Main app (advanced customization only)

## URLs You'll Use

| Purpose | URL |
|---------|-----|
| Edit Content | https://da.live/#/drukelly/drukelly-github-io |
| Preview | https://main--drukelly-github-io--drukelly.hlx.page/ |
| Production | https://drukelly.github.io/ |
| GitHub Repo | https://github.com/drukelly/drukelly.github.io |

## What's Integrated

✅ **Blocks**: Hero, Cards, Header, Footer
✅ **Styling**: Global + per-block CSS
✅ **Scripts**: Core library + custom scripts
✅ **Performance**: Lazy loading, delayed scripts
✅ **SEO**: Metadata support in head.html
✅ **Analytics Ready**: Add to head.html or delayed.js
✅ **Development Tools**: Sidekick configuration

## What You Need to Add

⚠️ **Google Drive Folder ID** in fstab.yaml
📝 **Content** in Google Docs
🔐 **Share folder** with helix@adobe.com
🔗 **Connect on** da.live

## Legacy vs New

| Feature | Old Setup | New AEM Franklin |
|---------|-----------|------------------|
| Content | HTML files | Google Docs |
| Build | Python script | No build! |
| Deploy | Manual push | Auto on save |
| Edit | Code editor | Google Docs |
| Preview | Local server | .hlx.page URL |
| Components | HTML templates | Blocks |
| Speed | Good | Blazing ⚡ |

## Ready to Go!

Follow these docs in order:
1. **QUICK_START.md** - Get running in 10 minutes
2. **CONTENT_EXAMPLE.md** - Learn content formatting
3. **AEM_MIGRATION_GUIDE.md** - Deep dive
4. **SETUP_SUMMARY.md** - Full overview

