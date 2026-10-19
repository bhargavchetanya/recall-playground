# Recall Playground

A tiny to-do API for showing what the **Recall** VS Code extension does for a team. The code is deliberately simple.
What matters is the terminal work around it: installing, running, fixing errors, using git. Recall turns that work into
knowledge the whole team shares.

You play it with two or more people on the **same Recall team**:

- **Pathfinder** (friend A) goes first, hits each problem and fixes it the normal way.
- **Newcomer** (friend B) goes second, hits the same problems, and Recall hands them the pathfinder's fixes.
- **Presenter** (you) narrates and shows the instructor what Recall did.

Nobody writes documentation. Recall learns every fix from the pathfinder's terminal.

## Before you start (everyone, 5 minutes)

1. **Install Node.js 20 or newer** (`node -v`) and **VS Code**.
2. **Install the Recall extension:** download `recall.vsix` from the
   [Recall releases page](https://github.com/bhargavchetanya/Recall-cloud-/releases/latest), then in VS Code:
   Extensions → **⋯** → **Install from VSIX…** → reload when asked.
3. **Connect to the team's Recall server:** Command Palette (**Cmd+Shift+P** / **Ctrl+Shift+P**) →
   **Recall: Set server URL** → paste the server address the presenter shares (for the AWS deployment, the
   stack's `RecallUrl`, for example `https://3-80-65-109.sslip.io`).
4. **Join the team:** the presenter runs **Recall: Sign in** → **Create a team** once and shares the invite code.
   Everyone else runs **Recall: Sign in** → **Join a team** with that code.
5. **Get this project** and open the folder in VS Code:
   ```bash
   git clone https://github.com/bhargavchetanya/recall-playground.git
   ```
   **Do not run `npm install` yet**: challenge 1 needs it missing.
6. Check the status bar at the bottom left shows **`Recall ●`**.

Run every command in **VS Code's own terminal** (**Ctrl+`**). Recall only sees VS Code terminals.

## The challenges

The pathfinder does each challenge first. Then the newcomer does the same one and watches for the Recall
notification. Run a fix **in the same terminal** as the error, **straight after it**: Recall learns a fix from the next
successful command within 10 minutes and 5 commands.

### 1. Run it before installing

| | |
|---|---|
| **Do** | `npm start` |
| **You see** | `Error: Cannot find module 'express'` |
| **Pathfinder fixes it** | `npm install`, then `npm start` works (stop it with **Ctrl+C**) |
| **Newcomer sees** | Their `npm start` fails the same way, and Recall pops up: *a teammate fixed this: `npm install`* |

### 2. Port already in use

| | |
|---|---|
| **Do** | Open a terminal and run `npm start`. Leave it running. Open a **second** terminal (**+** in the terminal panel) and run `npm start` again |
| **You see** | `Error: listen EADDRINUSE: address already in use :::3000` in the second terminal |
| **Pathfinder fixes it** | In that second terminal: `npx kill-port 3000` (answer `y` if npx asks to install it), then `npm start` |
| **Newcomer sees** | The same error, and Recall offers `npx kill-port 3000` |

### 3. A script that will not run

| | |
|---|---|
| **Do** | `./scripts/reset-data.sh` |
| **You see** | `permission denied: ./scripts/reset-data.sh` |
| **Pathfinder fixes it** | `chmod +x scripts/reset-data.sh`, then run the script again |
| **Newcomer sees** | Recall offers `chmod +x scripts/reset-data.sh` |

On Windows, use Git Bash for this one.

### 4. Undo a commit (search by meaning)

| | |
|---|---|
| **Pathfinder** | Make a commit, then undo it but keep the changes: `git add -A`, `git commit -m "wip"`, `git reset --soft HEAD~1` |
| **Newcomer** | Press **Cmd+Alt+R** (**Ctrl+Alt+R**) and type *undo my last commit but keep the changes* |
| **Newcomer sees** | `git reset --soft HEAD~1`, with the pathfinder's name and when they used it |

Try other questions in plain words too, for example *port 3000 is already in use* or *make a script executable*:
Recall answers with the team's own commands from challenges 2 and 3.

### 5. Secrets stay on your laptop

| | |
|---|---|
| **Do** | With the server running: `curl -H "Authorization: Bearer my-secret-token-123" http://localhost:3000/todos` |
| **Then** | Search *call the todos API with curl* |
| **You see** | The command, stored as `Authorization: Bearer ***`. The token never left the laptop |
| **Also try** | ` echo hidden` with a **space before it**: commands starting with a space are never sent |

### 6. Fix the bug

| | |
|---|---|
| **Do** | `npm test` |
| **You see** | `counts what is left to do` fails: `remaining` is wrong |
| **Fix** | In `src/todos.js`, `remaining` should count to-dos that are **not** done (`!t.done`). Run `npm test` again |
| **Recall** | Stays quiet. The fix was a code change, not a command, so there is nothing to learn: Recall only offers fixes someone actually ran |

### 7. Work offline

| | |
|---|---|
| **Do** | Turn Wi-Fi off, run a few commands (`npm test`, `git status`), and watch the status bar |
| **You see** | `Recall ○ (3 queued)`: the commands wait on your laptop |
| **Then** | Turn Wi-Fi back on: the status bar returns to `Recall ●` and the queue is sent. Nothing is lost |

### 8. Another team sees nothing

| | |
|---|---|
| **Do** | A third friend runs **Recall: Sign in** → **Create a team** (a different team), then searches *undo my last commit but keep the changes* |
| **You see** | No answer from your team: each team's history is private to that team |

## A 10-minute live demo for the instructor

1. **Before:** the pathfinder does challenges 1–4 on their laptop (about 5 minutes).
2. **Live:** the newcomer, on a fresh copy of the project, does challenges 1, 2 and 3. Each error is answered by Recall
   with the pathfinder's fix. Click **Why?** on one to show who fixed it and how closely the error matches.
3. **Live:** the newcomer searches *undo my last commit but keep the changes* (challenge 4).
4. **Live:** challenge 5 (secrets) and challenge 7 (offline).
5. **Say:** "None of this was written down. Recall learned it from one teammate's terminal and gave it to the next."

## If Recall does not react

| Problem | Fix |
|---|---|
| No notification after an error | Check the status bar shows `Recall ●`. The pathfinder must run the fix in the same terminal, right after the error. Notifications can be turned off in the `recall.autoFixNotifications` setting |
| Search finds nothing | The pathfinder has to run the command first. Recall only answers with commands someone on the team ran |
| `Recall ○` | Is the server running? Run **Recall: Set server URL** with the current address and **Recall: Sign in** again |
| Commands are not captured | Use VS Code's terminal (bash, zsh, fish or PowerShell) so shell integration is on |

## Reset for another run

Delete `node_modules` (`rm -rf node_modules`), set the script back (`chmod -x scripts/reset-data.sh`) and put the
bug back in `src/todos.js` (`git checkout src/todos.js`). Recall remembers the team's fixes, so on the next run even the
pathfinder gets them.
