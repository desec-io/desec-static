#!/bin/bash

OUTFILE=/dev/null
#OUTFILE=/dev/stdout

# Some colors for output
GREY='\033[1;30m'
GREEN='\033[1;32m'
RED='\033[0;31m'
NOCOLOR='\033[0m'

# Google Spreadsheet key of the translations spreadsheet 
KEY='1KjSRdmU0Fl8S_oYdHWq8H42_iEU811W4GFc9re3rAdM'

# Languages
LANGS='de en'

# exit if a command fails
set -e

# cd to project directoy
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd ${DIR}

# See if there are leftovers from a previous, unsuccessful run
if [ -d "converted" ] ; then
	echo -e "${RED}Previous run unsuccessful. Please clean up and delete 'converted' directory.${NOCOLOR}"
	exit 1
fi

# Check if go is installed
if [ -z "$(which go)" ] ; then
	echo -e "${RED}go needs to be installed first: sudo apt-get install golang${NOCOLOR}"
	exit 1
fi

# Setup go
export GOPATH=/home/$(whoami)/.go

# Check if translations-updater is already installed
if [ ! -d "translations-updater" ] ; then
	# Install translations updater
	echo "INSTALLING TRANSLATIONS-UPDATER"
	echo -e "${GREY}"
	git clone -q git@github.com:dothiv/translations-updater.git 2> $OUTFILE > $OUTFILE
	cd translations-updater
	go get -d -v ./... && go build -v ./...
	cd ..
	echo -e "${NOCOLOR}"
	echo "FINISHED INSTALLING TRANSLATIONS-UPDATER"
fi

# download
URL="https://docs.google.com/spreadsheet/ccc?key=${KEY}&output=csv"
echo -n "Downloading... "
wget -o $OUTFILE -O texts.csv "${URL}"
echo "done."

# Check if download was successful
if [ ! -f "texts.csv" ] ; then
	echo -e "${RED}Spreadsheet download failed. Please check ${URL}.${NOCOLOR}" 
fi

# Create directory for converted files
mkdir converted

# Convert
echo -n "Converting: "
for LANG in ${LANGS};
do 
	echo -n "${LANG} "
	go run translations-updater/main/cli/cli.go \
		-source="texts.csv" \
		-code="key" \
		-val="${LANG}" \
		-target="converted/${LANG}.json" \
		> $OUTFILE \
		2> $OUTFILE
	
	# Check if file present
	if [ ! -f "converted/${LANG}.json" ] ; then
		echo -e "\n${RED}Conversion of ${LANG} failed. Aborting. Sorry :-(${NOCOLOR}"
		exit 1
	fi
done
echo "done."

# move files
for LANG in ${LANGS};
do
	mv converted/${LANG}.json ../app/texts/
done

# cleanup
rmdir converted
rm texts.csv

# done!
git diff --shortstat ../app/texts/
