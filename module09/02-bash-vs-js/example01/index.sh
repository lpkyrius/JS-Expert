# Use Homebrew to install jq with 'brew install jq'

FOLDER_AMOUNT=4
for index in $(seq 1 $FOLDER_AMOUNT); do
# 1, 2 -> bash01, bash02
# 3, 4 -> shell01, shell02
folder=$([ $index -ge 3 ] && echo bash-0$index || echo shell-0$index)
# -p to create even if it already exists
mkdir -p $folder

# pwd bring the file exit
cd $(pwd)/$folder
npm init -y --scope @leandropassos --silent > /dev/null
cat package.json | jq '{n: .name, v: .version}'
cd ..

done

# to delete the folders created above:
rm -rf bash* shell*

# to check the time spent for this, use the command:
# time sh index.sh