find . -name 'node_modules' -type d -prune -exec rm -rf {} +
bun pm cache rm
rm bun.lockb