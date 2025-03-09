#!/usr/bin/env bash
set -Eeuo pipefail

function move_pages() {
    export IFS=$'\n'
    export LC_ALL=C

    for page in $(find ./dist/* -type f | sort --reverse);
    do
      \cat $page | \
      sed -E 's#\{\{ date \}\}#'"$(echo "${page}" | sed -E 's#\.\/dist\/##g' | sed 's#\.html##g')"'#g' > ./template.html
      mv ./template.html $page
    done
}

# [Install asdf](https://asdf-vm.com/guide/getting-started.html#_1-install-asdf)
# [asdf-nodejs](https://github.com/asdf-vm/asdf-nodejs)
function install_bubblewrap() {
   asdf install nodejs $(\cat ./.nvmrc) && \
   npm i -g @bubblewrap/cli
}

function update_twa() {
    bubblewrap update
}

set +Eeuo pipefail


