const { execSync } = require("child_process");
const fs = require("fs");

const COMPONENT_PATH = "src/components/nued";

function getTags() {
  return execSync("git tag --sort=creatordate")
    .toString()
    .split("\n")
    .filter(Boolean);
}

function getCommits(fromTag, toTag) {
  const range = fromTag ? `${fromTag}..${toTag}` : toTag;
  const command = `git log ${range} --no-merges --pretty=format:"%s" -- ${COMPONENT_PATH}`;
  const output = execSync(command).toString().trim();
  return output
    .split("\n")
    .filter(Boolean)
    .flatMap((msg) =>
      msg
        .split(",")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => line.charAt(0).toUpperCase() + line.slice(1))
    );
}

function buildChangelog() {
  const tags = getTags();
  const changelog = [];

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    const prevTag = i > 0 ? tags[i - 1] : null;
    const commits = getCommits(prevTag, tag);

    if (commits.length > 0) {
      changelog.unshift({
        version: tag,
        changes: commits,
      });
    }
  }

  return changelog;
}

const changelog = buildChangelog();
fs.writeFileSync(
  "playground/public/changelog.json",
  JSON.stringify(changelog, null, 2)
);

console.log("✅ changelog.json generated in playground/public/");