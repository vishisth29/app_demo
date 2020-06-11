echo "TEST" >&2;

echo "Current directory for frontend: ${PWD}"

# NPM_START=start;

npm run start -- --host 0.0.0.0 --disableHostCheck=true;
# ng serve --host 0.0.0.0
