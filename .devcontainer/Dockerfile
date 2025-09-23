FROM mcr.microsoft.com/devcontainers/base:jammy

RUN apt update && apt install -y \
    wget \
    curl \
    imagemagick 

# Install Node.js (LTS) and Yarn
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn@1.22.22

# Set up Yarn cache similar to a local environment
ENV YARN_CACHE_FOLDER="/yarn-cache"
RUN mkdir -p $YARN_CACHE_FOLDER && \
    chown -R vscode:vscode $YARN_CACHE_FOLDER && \
    echo "export YARN_CACHE_FOLDER=$YARN_CACHE_FOLDER" >> /home/vscode/.bashrc

# Use bash as the default command
CMD ["bash"]
