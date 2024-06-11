# TODO

- Create icons for the app.

  - `src-tauri/icons`
    The files needed are specifed in `tauri-conf.json`:

    ```json
    {
      "icon": ["icons/32x32.png", "icons/128x128.png", "icons/128x128@2x.png", "icons/icon.icns", "icons/icon.ico"]
    }
    ```
- Rebuild app `npm run tauri build`
- Check that the icons are in the new built app (you will have to reinstall the app using the generated bundled files `.msi` or `.exe`)
- Upload the `.msi` and `.exe` files to the relases section in the `reminders` github repository.