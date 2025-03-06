#!/usr/bin/env bash
set -Eeuo pipefail

function move_pages() {
    export IFS=$'\n'
    export LC_ALL=C

    for page in $(find ./dist/* -type f | sort --reverse);
    do
      local path
      path="$(echo "${page}" | sed -E 's#\.\/dist\/##g' | sed 's#\.html##g')"
      \cat $page | \
      sed -E 's#\{\{ date \}\}#'"${path}"'#g' > ./template.html
      mv ./template.html $page
    done
}

set +Eeuo pipefail
