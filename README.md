# SimpleCAM

Lightweight 2D drawing to G-code for the Genmitsu 3030-PROVer Ultra CNC router (GRBL 1.1, millimetres).

Draw a part or import a DXF, nest copies on the sheet, check the job in the simulator, then send it straight to the machine from the Machine tab, or download the `.nc` file for Candle or UGS.

## Using it

Double-click `SimpleCAM.html`. It is one self-contained file with no install and no internet connection needed. Use **Chrome or Edge**: the Machine tab needs Web Serial, which Firefox does not have.

To connect to the machine, the CH340 USB driver must be installed so the controller shows up as a COM port. Click **Connect** on the Machine tab and pick the device; there is no COM number to set. **Simulated machine** gives a pretend controller for practice and training.

The user manual opens inside SimpleCAM with **? Help** (or F1) as a searchable wiki, at the section for the current tab. It is also `SimpleCAM-Manual.pdf`.

Live link: https://jwright-smartsystems.github.io/SimpleCAM/ (installs as an app from Edge or Chrome). Pushing to `main` republishes it.

## Files

| File | What it is |
| --- | --- |
| `SimpleCAM.html` | The program: drawing, DXF import and export, nesting, G-code, simulator, machine sender, simulated machine |
| `docs/manual.html` | The manual: a wiki on screen (contents, search), and the source of the PDF |
| `SimpleCAM-Manual.pdf` | The manual printed to PDF |
| `index.html`, `manifest.webmanifest`, `sw.js`, `icons/` | Install-as-app and offline support |
| `logo.svg` | Logo (also built into the program) |

## Rebuilding the PDF manual

Edit `docs/manual.html`, then print it to PDF with Edge (the wiki sidebar and search are screen-only, so the PDF is a plain document):

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$PWD\SimpleCAM-Manual.pdf" "file:///$($PWD -replace '\\','/')/docs/manual.html"
```

## Defaults

Sheet 310 × 300 × 2 mm, 6 mm cutter, 20 mm gap, 25 mm edge margin, 1 tab per part, feed 600, plunge 200, 3 mm step down. Spindle runs at full speed (`M3 S10000`; GRBL caps it at the machine's maximum). Saved settings reset once when the defaults change (`SET_VERSION` in `SimpleCAM.html`).

## Limitations

- Round holes only; no other inside cut-outs.
- Nesting packs bounding rectangles, so shapes don't interlock.
- One cutter per job.
- Feeds and speeds are starting values; adjust after test cuts.
