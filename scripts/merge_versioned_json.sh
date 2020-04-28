#!/bin/bash

# The arguments are the paths pointing to:
#   the version of the file in the current branch
#   the concestor of the current and the incoming branch
#   the version of the file in the incoming branch

CURRENT_FILE_PATH=$1
BASE_FILE_PATH=$2
INCOMING_FILE_PATH=$3

ADJUSTED_INCOMING_FILE_PATH=$(mktemp /tmp/$INCOMING_FILE_PATH.XXXXXX)

jq .version=$(jq .version $CURRENT_FILE_PATH) $INCOMING_FILE_PATH > $ADJUSTED_INCOMING_FILE_PATH

git merge-file $CURRENT_FILE_PATH $BASE_FILE_PATH $ADJUSTED_INCOMING_FILE_PATH

MERGE_RESULT=$?

rm $ADJUSTED_INCOMING_FILE_PATH

exit $MERGE_RESULT
