# protoc

[![Build Status](https://github.com/yegor-usoltsev/protoc/actions/workflows/sync.yml/badge.svg)](https://github.com/yegor-usoltsev/protoc/actions) [![Docker Image (docker.io)](https://img.shields.io/docker/v/yusoltsev/protoc?label=docker.io&sort=semver)](https://hub.docker.com/r/yusoltsev/protoc) [![Docker Image (ghcr.io)](https://img.shields.io/docker/v/yusoltsev/protoc?label=ghcr.io&sort=semver)](https://github.com/yegor-usoltsev/protoc/pkgs/container/protoc) [![Docker Image Size](https://img.shields.io/docker/image-size/yusoltsev/protoc?sort=semver&arch=amd64)](https://hub.docker.com/r/yusoltsev/protoc/tags)

Run Google's Protocol Buffer Compiler (`protoc`) in a Docker container to generate code from `.proto` files without installing the compiler on your host. Images are published for Linux AMD64 and ARM64. New stable upstream releases (≥22.0) are automatically synced and published weekly.

## Usage

Put your `.proto` files in the current directory and run:

```sh
docker run --rm \
  --mount "type=bind,source=$PWD,target=/work" \
  --workdir /work \
  yusoltsev/protoc \
  --python_out=. example.proto
```

Replace `--python_out=.` with the output option for your target language. The image adds `/include` and the current directory to the import paths, so it can find bundled `.proto` includes and files mounted from your working directory.

To see the compiler options, run:

```sh
docker run --rm yusoltsev/protoc --help
```

## Image registries

Images are available from [Docker Hub](https://hub.docker.com/r/yusoltsev/protoc) and [GitHub Container Registry](https://github.com/yegor-usoltsev/protoc/pkgs/container/protoc).

See [Docker Hub tags](https://hub.docker.com/r/yusoltsev/protoc/tags) for available versions and the [sync workflow](https://github.com/yegor-usoltsev/protoc/actions/workflows/sync.yml) for publication status. Version tags match upstream releases (for example, `v22.0`); `latest` tracks the newest stable version.

## License and upstream

This image packages [`protoc`](https://github.com/protocolbuffers/protobuf) from Google's Protocol Buffers project. See [LICENSE](https://github.com/yegor-usoltsev/protoc/blob/main/LICENSE) for the included license text.
