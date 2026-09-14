# ELH landing page

Next.js landing page for [elh.vn](https://elh.vn/).

## Marketing guide

- [Hướng dẫn dạng Markdown](docs/HUONG-DAN-MARKETING-ELH.md)
- [Hướng dẫn dạng PDF](docs/HUONG-DAN-MARKETING-ELH.pdf)

## Local development

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

## Production build

```bash
pnpm build
```

The site is exported as static HTML to `out/`.

## Cloudflare Workers

- Production branch: `main`
- Build command: `pnpm build`
- Deploy command: `pnpm run deploy`
- Non-production deploy command: `pnpm exec wrangler versions upload`
- Static asset directory: `out` (configured in `wrangler.jsonc`)
- Package manager: `pnpm@8.15.9` (pinned in `package.json`)

Connect the repository under the Worker's **Settings > Builds** page. Workers
Builds creates preview versions for non-production branches and deploys
production automatically when a change is merged into `main`.

Before moving `elh.vn` to Cloudflare nameservers, copy and verify every existing
DNS record. In particular, preserve the MX, SPF, DKIM, `mail`, `smtp`, `imap`,
and `pop` records used by the separate email service.

To roll back a bad release, select a known-good Worker deployment, or revert the
offending Git commit and push/merge the revert into `main`.
