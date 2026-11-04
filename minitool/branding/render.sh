#!/bin/bash
# Renders branding/icon.png (1024x1024) and branding/cover.jpg (1080x1440, 3:4) with headless Chrome.
set -e
cd "$(dirname "$0")"
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=2 --window-size=512,512 --screenshot="$PWD/icon.png" "file://$PWD/icon.html" >/dev/null 2>&1
"$CH" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=2 --window-size=540,720 --screenshot="$PWD/cover.png" "file://$PWD/cover.html" >/dev/null 2>&1
sips -s format jpeg -s formatOptions 90 cover.png --out cover.jpg >/dev/null && rm cover.png
sips -g pixelWidth -g pixelHeight icon.png cover.jpg; ls -l icon.png cover.jpg
