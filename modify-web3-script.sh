#!/bin/sh

FILE="node_modules/web3-eth-contract/lib/esm/contract.js"
PATTERN="validator\.validate(\(.*\));"
REPLACEMENT="//\0"

# MacOS için -i '' ve Linux için -i kullanarak platforma özgü davranışı handle edin
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s|$PATTERN|$REPLACEMENT|" "$FILE"
else
    sed -i "s|$PATTERN|$REPLACEMENT|" "$FILE"
fi
