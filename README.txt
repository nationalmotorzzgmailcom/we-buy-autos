WE BUY AUTOS — CLEAN GITHUB / NETLIFY START

Upload the CONTENTS of this folder directly to the ROOT of a new GitHub repository:

index.html
netlify.toml
netlify/
  functions/
    submit-lead.js

Do not upload the ZIP itself.
Do not place these files inside an extra folder in GitHub.

NETLIFY SETTINGS
- Branch: main
- Base directory: leave blank
- Build command: leave blank
- Publish directory: .

EXPECTED TEST
Open:
https://we-buy-autos.com/.netlify/functions/submit-lead

A direct browser visit should say:
Method not allowed. Submit the form using POST.

GOOGLE APPS SCRIPT
Keep doPost(e), processForm(formData), and sendDataToZapier(formData).
Deploy the Apps Script web app as:
- Execute as: Me
- Who has access: Anyone
