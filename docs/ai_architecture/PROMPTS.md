# AI Prompts

AI prompts are stored as versioned JSON files.

Location:

server/ai/prompts/

Example:

server/ai/prompts/quickVideoPrompt.v1.json
server/ai/prompts/deepVideoPrompt.v1.json

Reasons:

- prompt versioning
- easier experimentation
- clear separation between AI logic and provider code
- safer prompt iteration without touching business logic

Each prompt file defines:

role
task
output format
rules

Providers load prompt files and construct the final model input.
