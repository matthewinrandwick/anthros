#!/bin/bash
set -o errexit
HERE="$(dirname $0)"
"$HERE/closure-library/closure/bin/calcdeps.py" \
    -i "$HERE/js"/ \
    --output_file "$HERE/deps.js" --help
echo OK.
