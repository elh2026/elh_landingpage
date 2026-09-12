# ELH CMS rollout and rollback

## Safety baseline

- Production baseline commit: `2a11c58c11008482d1b503d44ca84a5c633ef0f8`
- GitHub backup branch: `backup/pre-cms-2026-09-12`
- Git tag: `pre-cms-2026-09-12`
- CMS development branch: `feature/sanity-cms`

The public site must continue serving its existing hard-coded content until CMS data has been migrated and verified.

## Deployment order

1. Create the Sanity organization and project.
2. Configure a public `production` dataset. Published documents are public; drafts remain authenticated.
3. Deploy the schema and add individual project members.
4. Build and test the Studio locally.
5. Create a separate `elh-admin` Worker for the Studio.
6. Deploy the Studio and require individual Sanity project accounts for access.
7. Add Cloudflare Access later if Zero Trust onboarding becomes available for the account.
8. Integrate read-only CMS queries into the public site with legacy fallback.
9. Migrate and review content.
10. Enable the publish webhook only after the production build passes.

## Access policy

- Use individual identities, never a shared password.
- `admin.elh.vn` currently relies on Sanity authentication and project membership; it does not use a shared password.
- Cloudflare Access is deferred because this Cloudflare account could not complete Zero Trust onboarding without payment details.
- Sanity roles control who can draft, publish, or administer content.
- Require MFA on GitHub and the identity provider used for Sanity.

## Rollback

If the public site fails after CMS integration:

1. Redeploy the Worker version associated with the baseline commit, or deploy the GitHub backup branch.
2. Disable the CMS deploy webhook to prevent an automatic rebuild.
3. Keep Sanity content intact; a Worker code rollback does not restore or delete CMS data.
4. Diagnose on the feature branch and repeat the validation gates before publishing again.

Do not delete Sanity datasets as part of a website code rollback.
