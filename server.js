const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from node_modules/reveal.js
app.use('/reveal.js', express.static(path.join(__dirname, 'node_modules/reveal.js')));

// Serve static files from presentations directories
app.use('/presentations', express.static(__dirname));

// Serve the main presentation loader
app.get('/', (req, res) => {
  const presentation = req.query.p;
  
  // If no presentation specified, serve the index page
  if (!presentation) {
    return res.sendFile(path.join(__dirname, 'index.html'));
  }
  
  // Check if presentation directory exists
  const presentationPath = path.join(__dirname, presentation);
  if (!fs.existsSync(presentationPath)) {
    return res.status(404).send(`
      <h1>Presentation not found</h1>
      <p>Available presentations:</p>
      <ul>
        <li><a href="/?p=nodejs-intro">Node.js Introduction</a></li>
        <li><a href="/?p=typescript-intro">TypeScript Introduction</a></li>
        <li><a href="/?p=serverlesspresso">Serverlesspresso</a></li>
        <li><a href="/?p=broken-access-control">Broken Access Control</a></li>
      </ul>
    `);
  }

  // Check if README.md exists
  const readmePath = path.join(presentationPath, 'README.md');
  const hasMarkdown = fs.existsSync(readmePath);
  
  // Generate the HTML
  const html = generatePresentationHTML(presentation, hasMarkdown);
  res.send(html);
});

// Serve individual presentation assets
app.use('/:presentation/images', (req, res, next) => {
  const presentation = req.params.presentation;
  express.static(path.join(__dirname, presentation, 'images'))(req, res, next);
});

app.use('/:presentation/assets', (req, res, next) => {
  const presentation = req.params.presentation;
  express.static(path.join(__dirname, presentation, 'assets'))(req, res, next);
});

// Serve markdown files
app.get('/:presentation/README.md', (req, res) => {
  const presentation = req.params.presentation;
  const markdownPath = path.join(__dirname, presentation, 'README.md');
  
  if (fs.existsSync(markdownPath)) {
    res.sendFile(markdownPath);
  } else {
    res.status(404).send('Markdown file not found');
  }
});

function generatePresentationHTML(presentation, hasMarkdown) {
  const title = presentation.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Check for custom configuration
  const configPath = path.join(__dirname, presentation, 'config.json');
  let config = {};
  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
      console.warn(`Warning: Could not parse config.json for ${presentation}`);
    }
  }

  const theme = config.theme || 'black';
  const transition = config.transition || 'slide';

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />

    <title>${title}</title>

    <link rel="stylesheet" href="/reveal.js/dist/reset.css" />
    <link rel="stylesheet" href="/reveal.js/dist/reveal.css" />
    <link rel="stylesheet" href="/reveal.js/dist/theme/${theme}.css" />

    <!-- Theme used for syntax highlighted code -->
    <link rel="stylesheet" href="/reveal.js/plugin/highlight/monokai.css" />
    
    <!-- Custom styles if they exist -->
    <link rel="stylesheet" href="/presentations/${presentation}/css/custom.css" />
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        ${hasMarkdown ? `
        <section
          data-markdown="/${presentation}/README.md"
          data-separator="^---$"
          data-separator-vertical="^(\`-\`|---)$"
          data-separator-notes="^Note:"
          data-charset="utf-8"
        ></section>
        ` : `
        <section>
          <h1>${title}</h1>
          <p>No README.md found for this presentation</p>
          <p>Please add content to ${presentation}/README.md</p>
        </section>
        `}
      </div>
    </div>

    <script src="/reveal.js/dist/reveal.js"></script>
    <script src="/reveal.js/plugin/notes/notes.js"></script>
    <script src="/reveal.js/plugin/markdown/markdown.js"></script>
    <script src="/reveal.js/plugin/highlight/highlight.js"></script>
    <script src="/reveal.js/plugin/search/search.js"></script>
    <script src="/reveal.js/plugin/zoom/zoom.js"></script>
    <script src="/reveal.js/plugin/math/math.js"></script>

    <script>
      // More info about initialization & config:
      // - https://revealjs.com/initialization/
      // - https://revealjs.com/config/
      Reveal.initialize({
        hash: true,
        controls: true,
        progress: true,
        center: true,
        transition: '${transition}', // none/fade/slide/convex/concave/zoom
        
        // Learn about plugins: https://revealjs.com/plugins/
        plugins: [
          RevealMarkdown, 
          RevealHighlight, 
          RevealNotes,
          RevealSearch,
          RevealZoom,
          RevealMath.KaTeX
        ],
        
        // Markdown configuration
        markdown: {
          smartypants: true
        },
        
        // Math configuration  
        math: {
          mathjax: 'https://cdn.jsdelivr.net/gh/mathjax/mathjax@2.7.8/MathJax.js',
          config: 'TeX-AMS_HTML-full',
          // pass other options into \`MathJax.Hub.Config()\`
          TeX: { Macros: { RR: "{\\\\bf R}" } }
        }
      });
      
      // Custom keyboard shortcuts
      Reveal.addKeyBinding({keyCode: 82, key: 'R', description: 'Reload presentation'}, () => {
        window.location.reload();
      });
    </script>
  </body>
</html>
  `;
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Available presentations:`);
  console.log(`  - Node.js Introduction: http://localhost:${PORT}/?p=nodejs-intro`);
  console.log(`  - TypeScript Introduction: http://localhost:${PORT}/?p=typescript-intro`);
  console.log(`  - Serverlesspresso: http://localhost:${PORT}/?p=serverlesspresso`);
  console.log(`  - Broken Access Control: http://localhost:${PORT}/?p=broken-access-control`);
});