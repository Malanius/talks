const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from node_modules/reveal.js
app.use(
  "/reveal.js",
  express.static(path.join(__dirname, "node_modules/reveal.js"))
);

// Serve static files from presentations directories
app.use("/presentations", express.static(__dirname));

// Serve the main index page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve individual presentations
app.get("/:presentation", (req, res, next) => {
  const presentation = req.params.presentation;

  // Skip if this is a static asset request or special file
  if (
    req.path.includes(".") ||
    presentation === "favicon.ico" ||
    presentation === "presentations" ||
    presentation === "reveal.js" ||
    presentation === "debug-images.html"
  ) {
    return next();
  }

  // Check if presentation directory exists
  const presentationPath = path.join(__dirname, presentation);
  if (!fs.existsSync(presentationPath)) {
    return res.status(404).send(`
      <h1>Presentation "${presentation}" not found</h1>
      <p>Available presentations:</p>
      <ul>
        <li><a href="/nodejs-intro">Node.js Introduction</a></li>
        <li><a href="/typescript-intro">TypeScript Introduction</a></li>
        <li><a href="/serverlesspresso">Serverlesspresso</a></li>
        <li><a href="/broken-access-control">Broken Access Control</a></li>
      </ul>
      <p><a href="/">← Back to main page</a></p>
    `);
  }

  // Check if README.md exists
  const readmePath = path.join(presentationPath, "README.md");
  const hasMarkdown = fs.existsSync(readmePath);

  // Generate the HTML
  const html = generatePresentationHTML(presentation, hasMarkdown);
  res.send(html);
});

// Serve individual presentation assets
app.use("/:presentation/images", (req, res, next) => {
  const presentation = req.params.presentation;
  const imagesPath = path.join(__dirname, presentation, "images");
  if (fs.existsSync(imagesPath)) {
    express.static(imagesPath)(req, res, next);
  } else {
    res.status(404).send("Image not found");
  }
});

app.use("/:presentation/assets", (req, res, next) => {
  const presentation = req.params.presentation;
  const assetsPath = path.join(__dirname, presentation, "assets");
  if (fs.existsSync(assetsPath)) {
    express.static(assetsPath)(req, res, next);
  } else {
    res.status(404).send("Asset not found");
  }
});

// Serve CSS files
app.use("/:presentation/css", (req, res, next) => {
  const presentation = req.params.presentation;
  const cssPath = path.join(__dirname, presentation, "css");
  if (fs.existsSync(cssPath)) {
    express.static(cssPath)(req, res, next);
  } else {
    res.status(404).send("CSS not found");
  }
});

// Serve all static files from presentation directories (fallback)
app.use("/:presentation", (req, res, next) => {
  const presentation = req.params.presentation;
  const presentationPath = path.join(__dirname, presentation);

  // Only serve static files if the presentation directory exists and it's not the README.md request
  if (fs.existsSync(presentationPath) && !req.path.endsWith("README.md")) {
    express.static(presentationPath)(req, res, next);
  } else {
    next();
  }
});

// Serve markdown files with processed image paths
app.get("/:presentation/README.md", (req, res) => {
  const presentation = req.params.presentation;
  const markdownPath = path.join(__dirname, presentation, "README.md");

  if (fs.existsSync(markdownPath)) {
    const content = fs.readFileSync(markdownPath, "utf8");

    // Replace relative image paths with absolute paths
    const processedContent = content.replace(
      /!\[([^\]]*)\]\(images\/([^)]+)\)/g,
      `![$1](/${presentation}/images/$2)`
    );

    res.set("Content-Type", "text/markdown; charset=utf-8");
    res.send(processedContent);
  } else {
    res.status(404).send("Markdown file not found");
  }
});

function generatePresentationHTML(presentation, hasMarkdown) {
  const title = presentation
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Check for custom configuration
  const configPath = path.join(__dirname, presentation, "config.json");
  let config = {};
  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    } catch (e) {
      console.warn(`Warning: Could not parse config.json for ${presentation}`);
    }
  }

  const theme = config.theme || "black";
  const transition = config.transition || "slide";

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
        ${
          hasMarkdown
            ? `
        <section
          data-markdown="/${presentation}/README.md"
          data-separator="^------$"
          data-separator-vertical="^---$"
          data-separator-notes="^Note:"
          data-charset="utf-8"
        ></section>
        `
            : `
        <section>
          <h1>${title}</h1>
          <p>No README.md found for this presentation</p>
          <p>Please add content to ${presentation}/README.md</p>
        </section>
        `
        }
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
  console.log(
    `  - Node.js Introduction: http://localhost:${PORT}/nodejs-intro`
  );
  console.log(
    `  - TypeScript Introduction: http://localhost:${PORT}/typescript-intro`
  );
  console.log(
    `  - Serverlesspresso: http://localhost:${PORT}/serverlesspresso`
  );
  console.log(
    `  - Broken Access Control: http://localhost:${PORT}/broken-access-control`
  );
});
