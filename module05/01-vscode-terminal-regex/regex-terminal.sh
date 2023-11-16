# From the root folder in order to search in all the files with .test.js
find . -name '*.test.js'
# Let's remove the node_module folders
# -not -path remove folders containing *node_modules* the sencond * is to ignore its files as well
find . -name '*.test.js' -not -path '*node_modules**'
find . -name '*.js' -not -path '*node_modules**'

# Let's install this library (made by Brazilians devs) to work better with command line
npm i -g ipt
# now we can send the search result to ipt to have an interactive panel
find . -name '*.js' -not -path '*node_modules**' | ipt

# back to the module5 folder:
# let's copy 05-tdd... folder to here
cp -r ../../module01/05-tdd-desafio-resolvido .
# | ipt -o <- to select multiple files
# xargs to execute a command for each item returned from 'find' and we give to this itme the name {file}

# first test just to see how the selected items get 'myItem:' text
find . -name '*.js' -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' echo 'myItem:' {file}

# Good! 
# Now, let's replace every selected .js file's 1st line by adding 'use strict;' text.
# sed is a tool for replacement (from Unix)
# -e -> to edit
# 1s -> happens in the first row
# ^ -> first column in the row's (first position)
# \'$CONTENT'\ -> each bar is to break the line + the CONTENT variable
# finally, an ENTER ater \'$CONTENT'\ and in the next row /g' {file}, so Unix break a line and closes it. An implicity \n
CONTENT="'use strict';"
find . -name '*.js' -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}

# if you want to change (add) in all files:
find . -name '*.js' -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}
