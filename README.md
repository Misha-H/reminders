# reminders

TODO: Description + Add to GitHub.

## Repository

https://github.com/Misha-H/reminders

## View App Codebase (Web)

https://github.dev/Misha-H/reminders

> _Node: You cannot run this application in the web browser, as it relies on Tauri._

## Install App for Development (Windows)

This section guide is used to run the app in development mode.

### Prerequisites

- Installed PowerShell (or equivalent)

- Installed [Git](https://gitforwindows.org/)

- Installed [Visual Studio Code](https://code.visualstudio.com/download) (VSCode)

  > _Recommend: Add VSCode to PATH and Context Menu._

- Installed Node & NPM

  > _Recommend: [NVM](https://github.com/coreybutler/nvm-windows)._

- Installed Tauri (and dependencies such as [Rust](https://www.rust-lang.org/tools/install))

  > _Recommend: See [Tauri Prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites) for the most up to date guide._

### Steps

1. **Open PowerShell**.

2. **Pull code from remote repository to local environment**.

   ```sh
   git clone https://github.com/Misha-H/reminders.git
   ```

3. **Open `reminders` directory in Visual Studio Code**.

   > _Note: You can right click on `reminders`, and click `Open with Code` if Visual Studio Code is in your context menu._

   > _Note: You can a terminal write `code reminders` if Visual Studio Code is added to your PATH._

4. **Open Integrated terminal in Visual Studio Code**.

   > _Keyboard Shortcut: `` ctrl + ` ``._

5. **Install NPM packages**.

   ```sh
   npm install
   ```

6. **Run application in development mode**.

   ```sh
   npm run tauri dev
   ```

## Install App (Windows)

### Steps

1. **Navigate to [reminders Releases](https://github.com/Misha-H/reminders/releases)**.

2. **Download the `.msi` file from Assets in the latest release**.

3. **Run the downloaded `.msi` file and follow instructions in the install wizard**.

   > _Note: Double click on file to run._

4. **Run reminders app**.

   > _Note: You should be able to access like any other application, e.g. search `reminders` in Windows Start Menu._
