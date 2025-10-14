# Presentations

A centralized reveal.js setup for hosting multiple markdown-based presentations with a single installation.

## 🚀 Quick Start

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the server**:

   ```bash
   npm start
   ```

3. **Open in browser**:

   ```
   http://localhost:3000
   ```

## 📊 Available Presentations

- **Node.js Introduction**: `http://localhost:3000/?p=nodejs-intro` (2020-09 @ Frontend Chapter meeting, Assist)
- **TypeScript Introduction**: `http://localhost:3000/?p=typescript-intro` (2020-06 @ Frontend Chapter meeting, Assist)
- **Serverlesspresso**: `http://localhost:3000/?p=serverlesspresso` (2025-03-12 @ Vacasa Talks, Vacasa Prague)
- **OWASP Broken Access Control**: `http://localhost:3000/?p=broken-access-control` (2020 @ Security Chapter meeting, Assist)

## 🛠 Development

For development with auto-reload:

```bash
npm run dev
```

## 📝 Creating New Presentations

1. **Create a new directory** with your presentation name:

   ```bash
   mkdir my-new-presentation
   ```

2. **Add a README.md file** with your markdown content:

   ```markdown
   # My Presentation Title
   
   Content for first slide
   
   ---
   
   # Second Slide
   
   More content here
   
   `-`
   
   ## Vertical slide
   
   This creates a vertical slide under "Second Slide"
   ```

3. **Access your presentation**:

   ```
   http://localhost:3000/?p=my-new-presentation
   ```

## 📋 Markdown Syntax

- **Horizontal slides**: Use `---` to separate slides
- **Vertical slides**: Use `\`-\`` for vertical slides (sub-slides)
- **Speaker notes**: Add `Note:` followed by your notes
- **Code highlighting**: Use fenced code blocks with language specification
- **Math**: Use KaTeX syntax with `$` for inline or `$$` for block math

### Example structure

```markdown
# Title Slide

---

# Main Topic

`-`

## Subtopic 1

Content here

`-`

## Subtopic 2

More content

Note:
These are speaker notes that won't be visible to the audience

---

# Another Main Topic

```python
def hello_world():
    print("Hello, World!")
```

```

## 🎨 Customization

### Custom CSS
Add a `css/custom.css` file in your presentation directory for custom styles:

```css
/* my-presentation/css/custom.css */
.reveal h1 {
    color: #42affa;
}
```

### Images and Assets

Place images in your presentation directory and reference them relatively:

```markdown
![My Image](./images/diagram.png)
```

### Themes

The default theme is `black`. You can modify the server to use different themes or add theme selection.

## 🎯 Features

- ✅ **Full reveal.js feature set**: All plugins and capabilities
- ✅ **Markdown-based presentations**: Write in markdown, present in style  
- ✅ **Syntax highlighting**: Automatic code highlighting
- ✅ **Speaker notes**: Press `S` to open speaker notes window
- ✅ **Search**: Press `Ctrl/Cmd + Shift + F` to search slides
- ✅ **Zoom**: `Alt + Click` to zoom in/out
- ✅ **Math support**: KaTeX for mathematical expressions
- ✅ **Print/PDF export**: Add `?print-pdf` to URL for print view
- ✅ **Keyboard shortcuts**: Full navigation and custom shortcuts
- ✅ **Responsive**: Works on desktop, tablet, and mobile
- ✅ **Asset serving**: Images, CSS, and other assets per presentation

## 🔧 Advanced Configuration

The `server.js` file can be modified to:

- Add authentication
- Change default themes per presentation
- Add custom reveal.js configurations
- Implement presentation-specific settings
- Add custom middleware

## 📁 Directory Structure

```
talks/
├── package.json                 # Dependencies and scripts
├── server.js                   # Main server file
├── index.html                  # Landing page
├── node_modules/               # Dependencies (includes reveal.js)
├── presentation-name/          # Individual presentation
│   ├── README.md              # Markdown content
│   ├── images/               # Presentation images
│   ├── css/                  # Custom CSS
│   └── assets/               # Other assets
└── ...                       # More presentations
```

## 🎮 Keyboard Shortcuts

- **Navigation**: Arrow keys, Page Up/Down, Space
- **Speaker Notes**: `S`
- **Search**: `Ctrl/Cmd + Shift + F`
- **Fullscreen**: `F`
- **Pause**: `B` or `.` (black screen)
- **Reload**: `R` (custom shortcut)

## 🌐 Deployment

For production deployment:

1. **Set environment variables**:

   ```bash
   export PORT=80
   export NODE_ENV=production
   ```

2. **Use process manager** (PM2, forever, etc.):

   ```bash
   npm install -g pm2
   pm2 start server.js --name presentations
   ```

3. **Reverse proxy** (nginx, Apache) for domain and SSL:

   ```nginx
   location / {
       proxy_pass http://localhost:3000;
       proxy_set_header Host $host;
   }
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Add your presentation or improvements
4. Submit a pull request

## 📄 License

MIT License - feel free to use this setup for your own presentations!
