FROM alpine:latest AS build

ARG PROTOC_VERSION

RUN ARCH=$(apk --print-arch) && \
    case ${ARCH} in \
        aarch64) export PROTOC_ARCH=aarch_64 ;; \
        x86_64) export PROTOC_ARCH=x86_64 ;; \
    esac && \
    wget https://github.com/protocolbuffers/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-linux-${PROTOC_ARCH}.zip && \
    unzip protoc-${PROTOC_VERSION}-linux-${PROTOC_ARCH}.zip

FROM alpine:latest

COPY --from=build /bin /bin
COPY --from=build /include /include

ENTRYPOINT ["/bin/protoc", "-I", "/include", "-I."]
