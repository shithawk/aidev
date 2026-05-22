// Wait for the DOM to fully load before injecting the nav
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Define your Navigation HTML here
    const navHTML = `
        <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="dj.html">DJ</a></li>
            <li><a href="sacred.html">Sacred Geometry</a></li>
            <li><a href="sounds.html">Sound Trails</a></li>
            <li><a href="touch.html">Touch Chords</a></li>
            <li><a href="songs.html">Songs</a></li>
            <li><a href="walk.html">Random Walk</a></li>
        </ul>
    `;

    // 2. Define your Navigation CSS here
    const navStyles = `
        :root {
            /* Calculated standard height for the navigation header */
            --nav-height: 60px;
            /* Colors from the Elemental Brand Palette */
            --color-basalt: #282828;
            --color-ocean: #0E63B4;
            --color-seafoam: #0AD39A;
            --color-foam: #FAFAFA;
            --color-sand: #B8B6AC;
        }
        
        body {
            /* Prevent unwanted edge-gaps in layout structures */
            margin: 0;
            padding: 0;
        }

        #global-nav {
            position: relative;
            width: 100%;
            height: var(--nav-height);
            background-color: var(--color-basalt);
            color: var(--color-foam);
            display: flex;
            align-items: center;
            box-sizing: border-box;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            z-index: 9999;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }

        #global-nav .nav-links {
            list-style: none;
            display: flex;
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: auto;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            /* Hide default scrollbars for an app-like navigation aesthetic */
            scrollbar-width: none; /* Firefox */
        }

        #global-nav .nav-links::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
        }

        #global-nav .nav-links li {
            height: 100%;
            display: flex;
            flex-shrink: 0; /* Keep items from compressing on smaller layouts */
        }

        /* Expands the hit area of each anchor tag to fill the entire header cell */
        #global-nav .nav-links a {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 0 1.5rem;
            color: var(--color-sand);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.95rem;
            letter-spacing: 0.3px;
            transition: background-color 0.15s ease, color 0.15s ease;
            position: relative;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        }

        /* Hover and focus styles utilizing brand "Ocean" blue color */
        #global-nav .nav-links a:hover,
        #global-nav .nav-links a:focus {
            background-color: var(--color-ocean);
            color: var(--color-foam);
            outline: none;
        }

        /* Active link gets a subtle brand accent indicator at the bottom */
        #global-nav .nav-links a.active {
            color: var(--color-foam);
            background-color: rgba(255, 255, 255, 0.03);
        }

        #global-nav .nav-links a.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background-color: var(--color-seafoam);
        }

        /* Helper responsive style: ensures canvases still sit perfectly underneath */
        .fit-canvas {
            display: block;
            width: 100vw !important;
            height: calc(100vh - var(--nav-height)) !important;
            margin: 0;
            padding: 0;
            position: relative; 
        }

        /* Adjustments on extra small viewports for touch spacing */
        @media (max-width: 480px) {
            #global-nav .nav-links a {
                padding: 0 1.15rem;
                font-size: 0.9rem;
            }
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
    document.body.insertBefore(navElement, document.body.firstChild);

    // 5. Detect and highlight active tab based on current URL file path
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = navElement.querySelectorAll(".nav-links a");
    
    let activeFound = false;
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPath) {
            link.classList.add("active");
            activeFound = true;
            // Scroll the active item into view on load if it's overflowing (mobile swipe)
            setTimeout(() => {
                link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }, 100);
        }
    });

    // Fallback: If no match found (e.g., bare root url without "index.html"), highlight Home
    if (!activeFound && navLinks.length > 0) {
        navLinks[0].classList.add("active");
    }
});
