export default defineEventHandler(async () => {
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
  const REPO_NAME = process.env.GITHUB_REPO;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/releases`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    return { error: 'Failed to fetch releases' };
  }

  const releases = await response.json();

  // Optional: limit or format response
  return releases.map((release: any) => ({
    id: release.id,
    tag_name: release.tag_name,
    name: release.name,
    body: release.body,
    published_at: release.published_at,
  }));
});