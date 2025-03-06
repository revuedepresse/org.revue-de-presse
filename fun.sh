
function move_pages() {
  	@export IFS=$'\n'

  	for page in $(find ./dist/* -type f | sort --reverse);
  	do
  		\cat $page | sed -E 's#\{\{ date \}\}#'"$(echo "${page}" | sed -E 's#\.\/dist\/##g' | sed 's#\.html##g')"'#g' > ./template.html
  		mv ./template.html $page
  	done
}
