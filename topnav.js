// Wait for the DOM to fully load before injecting the nav
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Define your Navigation HTML here
    const navHTML = `
        <!--<div class="nav-brand">My Website</div>-->
        <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="dj.html">DJ Loops</a></li>
            <li><a href="sacred.html">Sacred Geometry</a></li>
            <li><a href="sounds.html">Sound Trails</a></li>
            <li><a href="touch.html">Touch Chords</a></li>
            <li><a href="songs.html">Dog Songs</a></li>
        </ul>
    `;

    // 2. Define your Navigation CSS here
    const navStyles = `
        :root {
            /* This variable helps us calculate the remaining screen height for your canvases */
            --nav-height: 60px;
        }
        
        body {
            /* Remove default body margins so the nav sits flush against the edges */
            margin: 0;
            padding: 0;
        }

        #global-nav {
            position: relative; /* Keeps it in standard document flow to push everything down */
            width: 100%;
            height: var(--nav-height);
            background-color: #1e293b;
            color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 2rem;
            box-sizing: border-box;
            font-family: system-ui, -apple-system, sans-serif;
            z-index: 9999;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2);
        }

        #global-nav .nav-brand {
            font-size: 1.25rem;
            font-weight: 700;
            letter-spacing: 0.5px;
        }

        #global-nav .nav-links {
            list-style: none;
            display: flex;
            gap: 2rem;
            margin: 0;
            padding: 0;
        }

        #global-nav .nav-links a {
            color: #cbd5e1;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease-in-out;
        }

        #global-nav .nav-links a:hover {
            color: #38bdf8;
        }

        /* CRITICAL HELPER CLASS FOR YOUR CANVAS PAGES
           Apply class="fit-canvas" to any canvas that needs to be full screen.
           It automatically subtracts the nav height so you don't get unwanted scrollbars.
        */
        .fit-canvas {
            display: block;
            width: 100vw !important;
            height: calc(100vh - var(--nav-height)) !important;
            margin: 0;
            padding: 0;
            /* If you were using position: absolute previously, you can remove it or set it to relative */
            position: relative; 
        }
    `;

    // 3. Inject the styles into the <head> of the document
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = navStyles;
    document.head.appendChild(styleSheet);

    // 4. Create the <nav> element and inject it
    const navElement = document.createElement("nav");
    navElement.id = "global-nav";
    navElement.innerHTML = navHTML;
    
    // Insert the nav as the very first child of the body.
    // This physically pushes all your subsequent HTML down.
    document.body.insertBefore(navElement, document.body.firstChild);
});
