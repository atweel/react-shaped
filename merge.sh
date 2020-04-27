#!/bin/bash

# diff <(jq .version=$(jq .version $1) $3 | jq -S .) <(jq . -S $1) ||

jq .version=$(jq .version $1) $3 > $3.patched

git merge-file $1 $2 $3.patched

rm $3.patched