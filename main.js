import { $ } from "bun";

const MIN_VERSION = "v22.0";
const IMAGES = ["ghcr.io/yegor-usoltsev/protoc", "yusoltsev/protoc"];
const byVersion = (a, b) => a.localeCompare(b, "en", { numeric: true });
const isVersion = (tag) => /^v\d+(?:\.\d+)+$/u.test(tag);
const origin = new Set(await Array.fromAsync($`git tag`.lines()));
const upstream = new Set();

for (let page = 1; ; page += 1) {
  const res = await fetch(
    `https://api.github.com/repos/protocolbuffers/protobuf/releases?per_page=100&page=${page}`,
    { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
  );
  if (!res.ok) {
    throw new Error(`GitHub releases: ${res.status}`);
  }
  const releases = await res.json();
  for (const release of releases) {
    if (!(release.draft || release.prerelease) && isVersion(release.tag_name)) {
      upstream.add(release.tag_name);
    }
  }
  if (releases.length < 100) {
    break;
  }
}

const newTags = [...upstream.difference(origin)]
  .filter((tag) => byVersion(tag, MIN_VERSION) >= 0)
  .toSorted(byVersion);
const latest = [...upstream.union(origin)]
  .filter(isVersion)
  .toSorted(byVersion)
  .at(-1);
console.log(`🆕 New tags: ${newTags.join(", ") || "none"}`);

for (const tag of newTags) {
  console.log(`\n🏷️  Publishing ${tag}...`);
  const dockerTags = IMAGES.flatMap((image) =>
    (tag === latest ? [tag, "latest"] : [tag]).flatMap((v) => [
      "--tag",
      `${image}:${v}`,
    ])
  );
  await $`docker buildx build --platform linux/amd64,linux/arm64 --build-arg PROTOC_VERSION=${tag.slice(1)} ${dockerTags} --push .`;
  await $`git tag ${tag} && git push origin ${tag}`;
}
