FROM node:alpine
WORKDIR /app
COPY package.json ./
RUN npm install\
    && npm install typescript -g
# Copy TypeScript source files to the container
COPY . .
# Build TypeScript files
RUN tsc
# Command to run your TypeScript file
CMD ["sh", "-c", "node dist/*.js"]