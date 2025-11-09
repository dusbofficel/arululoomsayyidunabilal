DarulUloom — GitHub Pages site (Urdu/Hindi/English)
Files:
- index.html
- style.css
- script.js
- assets/   (images)
- pdfs/     (uploaded PDFs)
- pages/    (sub pages like arab1.html, nazerah.html etc.)

How to deploy:
1) Create repo (e.g. dusbofficial/arululoomsayyidunabilal).
2) Upload these files and folders to repo root (Add file → Upload files).
3) Go to Settings → Pages → Source: main / (root) → Save.
4) Wait 1–2 minutes, then open: https://YOURUSERNAME.github.io/REPONAME/

How to add details:
- For each curriculum/department add a file in pages/, e.g. pages/arab1.html.
- In index.html the dropdown links already point to pages/arab1.html etc.
- For PDFs put them in pdfs/ and link from any page using relative path: ../pdfs/YourFile.pdf

Language:
- The site uses client-side language switcher. Language choice is saved in localStorage.
- To add translated text for a specific section, edit script.js CONTENT object and/or edit individual pages.

Security:
- For admin uploads and secure result uploads, use Firebase (admin folder scaffold can be added).
