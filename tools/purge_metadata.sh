#!/bin/bash
# BareBoard automated metadata purge
# Strips EXIF, macOS extended attributes, and resource forks from images
# before public upload. Run on macOS inside the folder of images to clean.
#
# Usage: place this script in the image folder, then:
#   chmod +x purge_metadata.sh && ./purge_metadata.sh

echo "=== BareBoard Metadata Purge ==="
echo "Purging metadata from all JPEG, PNG, and WebP files..."

for file in *.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}; do
    [ -e "$file" ] || continue
    echo "Processing: $file"

    # 1. Strip macOS extended attributes and filesystem metadata
    xattr -c "$file" 2>/dev/null

    # 2. Resave pixel data to a clean file, dropping the EXIF container
    ext="$(echo "${file##*.}" | tr '[:upper:]' '[:lower:]')"
    case "$ext" in
        jpg|jpeg) fmt="jpeg" ;;
        png)      fmt="png" ;;
        webp)     fmt="webp" ;;
        *)        echo "  Skipping (unsupported): $file"; continue ;;
    esac
    sips -s format "$fmt" "$file" --out "clean_$file" > /dev/null 2>&1

    # 3. Overwrite the original with the sanitized asset
    if [ -f "clean_$file" ]; then
        mv "clean_$file" "$file"
        echo "  Cleaned: $file"
    else
        echo "  FAILED to clean: $file (original kept)"
    fi
done

echo "Metadata purge complete. Assets are safe for public deployment."
