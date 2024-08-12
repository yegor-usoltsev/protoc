# protoc

[![Build Status](https://github.com/yegor-usoltsev/protoc/actions/workflows/build.yml/badge.svg)](https://github.com/yegor-usoltsev/protoc/actions)
[![Docker Image (docker.io)](https://img.shields.io/docker/v/yusoltsev/protoc?label=docker.io&sort=semver)](https://hub.docker.com/r/yusoltsev/protoc)
[![Docker Image (ghcr.io)](https://img.shields.io/docker/v/yusoltsev/protoc?label=ghcr.io&sort=semver)](https://github.com/yegor-usoltsev/protoc/pkgs/container/protoc)

A lightweight, multi-platform Docker image for the Protocol Buffer Compiler (`protoc`).

## Overview

This repository provides a Docker image that packages the [Protocol Buffer Compiler (`protoc`)](https://github.com/protocolbuffers/protobuf), a tool developed by Google. `protoc` is integral to the Protocol Buffers framework, which provides a language-neutral, platform-neutral, and extensible mechanism for serializing structured data.

## Usage

To run `protoc` using this Docker image, execute the following command:

```bash
docker run --rm -v $(pwd):$(pwd) -w $(pwd) yusoltsev/protoc [OPTION] PROTO_FILES
```

### Example

Replace `[OPTION]` and `PROTO_FILES` with your specific options and Protocol Buffer files. For instance:

```bash
docker run --rm -v $(pwd):$(pwd) -w $(pwd) yusoltsev/protoc --python_out=. example.proto
```

For detailed help and available options, use:

```bash
docker run --rm yusoltsev/protoc --help
```

## Docker Images

This Docker image is accessible across multiple platforms and can be pulled from the following registries:

- **Docker Hub**: [`yusoltsev/protoc`](https://hub.docker.com/r/yusoltsev/protoc)
- **GitHub Container Registry**: [`ghcr.io/yegor-usoltsev/protoc`](https://ghcr.io/yegor-usoltsev/protoc)

## Contributing

Pull requests are welcome. For major changes, please [open an issue](https://github.com/yegor-usoltsev/protoc/issues/new) first to discuss what you would like to change.

## License

[LICENSE](https://github.com/yegor-usoltsev/protoc/blob/main/LICENSE)

### Acknowledgments

This project is based on the [Protocol Buffer Compiler](https://github.com/protocolbuffers/protobuf) originally developed by Google. The original source code is available under the [Google Protocol Buffers License](https://github.com/protocolbuffers/protobuf/blob/main/LICENSE).
