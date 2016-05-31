#!/bin/bash

set -o errexit

HERE="$(dirname $0)"
$HERE/vendor/cake/cake $HERE/cc/anthros.cpp
