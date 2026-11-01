Acadex website (plain HTML, CSS, JS - no build step)

Files
  index.html          the page
  css/style.css       all styles (colors and spacing are variables at the top)
  js/script.js        menu, docs expand/collapse, "Learn more" links, scroll reveal,
                      screenshot fallback
  assets/             logo, favicon, fonts, screens/

Add your screenshots
  Put phone screenshots in assets/screens/ with these exact names:
    home.png  calendar.png  map.png  reminders.png  settings.png
  Until a file exists, its frame shows "Screenshot coming soon".
  (map.png replaces the old directory.png because the page is now called Map.)
  Portrait shots work best, roughly 9:19. Keep each under ~300 KB.

Replace these if you want
  assets/acadex-logo.png   wide, transparent PNG, same file name
  assets/favicon.png       square icon, 64x64 or larger

Download button
  index.html, section id="download": the href points to
  https://github.com/kalabasaa/Acadex/releases/latest
  Swap it for a direct APK link when you have one.

Deploy
  Upload the whole folder to Vercel (or open index.html locally).
