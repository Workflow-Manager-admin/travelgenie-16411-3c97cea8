#!/bin/bash
cd /home/kavia/workspace/code-generation/travelgenie-16411-3c97cea8/travelgenie_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

