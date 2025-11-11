# Creating Content for AEM Franklin

This file shows you how to structure content in Google Docs for your AEM Franklin site.

## Homepage Example (index.docx)

Your homepage would be a Google Doc named `index` with this structure:

```
# Hi, I'm Dru.

![Dru Kelly](https://your-image-url.com/dk-at-pier-7-sf.webp)

## The Short Version

A person with an enthusiasm creating and building for the web. I'm currently working at Adobe as a Senior Global Web Producer. I'm also a father of two and a husband to my lovely wife.

---
Hero
---

## My Projects

---
Cards
| Adobe Photoshop on adobe.com | Dashcam Video Compiler | Adobe MAX |
| --- | --- | --- |
| ![](image-url) | ![](image-url) | ![](image-url) |
| In the Lab | Off the clock | I'm going to MAX this year! |
| I manage the Adobe Photoshop product and its related pages on adobe.com. | This is a proof of concept for editing videos and randomly compiling clips. | I'm hoping for another "shout it aloud, Creative Cloud" moment. |
| [Open Ps on adobe.com](https://www.adobe.com/products/photoshop.html) | [Github Project](https://github.com/drukelly/dashcam-video-compiler) | [Adobe MAX](https://max.adobe.com) |
---

## Let's Connect!

### Somewhat Anti-Social but adapting to our social world

I rarely post on social media. However, if you'd like to get in touch, feel free to connect!

- [Instagram](https://www.instagram.com/drukelly_/)
- [LinkedIn](https://www.linkedin.com/in/drukelly/)  
- [GitHub](https://github.com/drukelly)
```

## Key Formatting Rules

### Blocks
- Blocks are defined by horizontal rules (---) with the block name between them
- Example:
  ```
  ---
  Hero
  ---
  ```

### Tables = Block Content
- Tables after a block declaration define the block's content
- Each row becomes a card/item
- Example for Cards block:
  ```
  ---
  Cards
  | Card 1 Title | Card 2 Title |
  | --- | --- |
  | Card 1 content | Card 2 content |
  | [Link](url) | [Link](url) |
  ---
  ```

### Metadata
At the end of your document, add metadata:

```
---
Metadata
| Property | Value |
| --- | --- |
| Title | Dru Kelly - Web Producer at Adobe |
| Description | Personal website of Dru Kelly, Senior Global Web Producer at Adobe |
| Keywords | web development, adobe, photoshop |
---
```

## Navigation Example (nav.docx)

Create a `nav` document for your site navigation:

```
[Dru Kelly](/)

- [Home](/)
- [Projects](/projects)
- [About](/about)
- [Contact](/contact)
```

## Footer Example (footer.docx)

Create a `footer` document:

```
## Let's Connect!

- [Instagram](https://www.instagram.com/drukelly_/)
- [LinkedIn](https://www.linkedin.com/in/drukelly/)
- [GitHub](https://github.com/drukelly)

---

© 2025 Dru Kelly. All rights reserved.
```

## Tips

1. **Images**: Upload to Google Drive, right-click > Get link > Use that URL
2. **Links**: Use standard markdown `[text](url)` format
3. **Buttons**: Links automatically become buttons with `.button` class
4. **Headings**: Use # for h1, ## for h2, etc.
5. **Bold/Italic**: Use **bold** and *italic* as normal

## Publishing Workflow

1. Edit your Google Doc
2. Save (auto-saves)
3. Preview at: `https://main--drukelly-github-io--drukelly.hlx.page/`
4. When ready, click "Publish" in da.live
5. Changes go live at: `https://drukelly.github.io/`

