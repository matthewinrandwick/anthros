#!/bin/bash
set -o errexit
HERE="$(dirname $0)"
"$HERE/vendor/closure-library/closure/bin/calcdeps.py" \
    -i "$HERE/js"/ \
    --output_file "$HERE/deps.txt"
echo OK.
