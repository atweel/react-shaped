#!/bin/bash

#   This file attempts to implement a merge strategy for "versioned" JSON files like package.json.
#   To use it as a git merge driver in a repository or globally, first set up the driver using
#
#       git config merge.versioned-json.driver $(realpath merge_versioned_json.sh)
#
#   or
#
#       git config --global merge.versioned-json.driver $(realpath merge_versioned_json.sh)
#
#   then associate the new driver with appropriate files using .gitattributes, e.g.
#
#       **/package.json merge=versioned-json
#
#   The script accepts three arguments:
#       the file in the current branch,
#       the nearest common ancestor of the files being merged, and
#       the file in the incoming branch
#
#   Ths script relies on jq (https://stedolan.github.io/jq/) to manipulate JSON files.

CURRENT_FILE_PATH=$1
BASE_FILE_PATH=$2
INCOMING_FILE_PATH=$3

echo -e "Trying to resolve merge conflicts in a versioned JSON file automatically..."

PRE_RESOLVED_INCOMING_FILE_PATH=$(mktemp /tmp/$INCOMING_FILE_PATH.XXXXXX)

echo -e "Pre-resolved file will be written to $PRE_RESOLVED_INCOMING_FILE_PATH"

CURRENT_VERSION=$(jq .version $CURRENT_FILE_PATH)

echo -e "Current version is $CURRENT_VERSION"

INCOMING_VERSION=$(jq .version $INCOMING_FILE_PATH)

echo -e "Incoming version is $INCOMING_VERSION"

jq .version=$(jq .version $CURRENT_FILE_PATH) $INCOMING_FILE_PATH > $PRE_RESOLVED_INCOMING_FILE_PATH

echo -e "After resolving version conflict, the diff is:\n$(diff $CURRENT_FILE_PATH $PRE_RESOLVED_INCOMING_FILE_PATH)"

git merge-file $CURRENT_FILE_PATH $BASE_FILE_PATH $PRE_RESOLVED_INCOMING_FILE_PATH

MERGE_RESULT=$?

if [ $MERGE_RESULT -eq "0" ]
then
    echo -e "Merge successful"
else
    echo -e "Merge Failed"
fi

rm $PRE_RESOLVED_INCOMING_FILE_PATH

exit $MERGE_RESULT
