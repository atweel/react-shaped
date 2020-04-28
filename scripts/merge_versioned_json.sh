#!/bin/bash

# The arguments are the paths pointing to:
#   the version of the file in the current branch
#   the concestor of the current and the incoming branch
#   the version of the file in the incoming branch

CURRENT_FILE_PATH=$1
BASE_FILE_PATH=$2
INCOMING_FILE_PATH=$3

echo -e "Trying to resolve merge conflicts in a versioned JSON file automatically..."

ADJUSTED_INCOMING_FILE_PATH=$(mktemp /tmp/$INCOMING_FILE_PATH.XXXXXX)

echo -e "Pre-resolved file will be written to $ADJUSTED_INCOMING_FILE_PATH"

CURRENT_VERSION=$(jq .version $CURRENT_FILE_PATH)

echo -e "Current version is $CURRENT_VERSION"

INCOMING_VERSION=$(jq .version $INCOMING_FILE_PATH)

echo -e "Incoming version is $INCOMING_VERSION"

jq .version=$(jq .version $CURRENT_FILE_PATH) $INCOMING_FILE_PATH > $ADJUSTED_INCOMING_FILE_PATH

echo -e "After resolving version conflict, the diff is:\n$(diff $CURRENT_FILE_PATH $ADJUSTED_INCOMING_FILE_PATH)"

git merge-file $CURRENT_FILE_PATH $BASE_FILE_PATH $ADJUSTED_INCOMING_FILE_PATH

MERGE_RESULT=$?

if [ $MERGE_RESULT -eq "0" ]
then
    echo -e "Merge successful"
else
    echo -e "Merge Failed"
fi

rm $ADJUSTED_INCOMING_FILE_PATH

exit $MERGE_RESULT
