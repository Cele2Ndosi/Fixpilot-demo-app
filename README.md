# fixpilot-demo-app

The target app for FixPilot to investigate - not FixPilot itself. This is
the "Iteration 1" seeded demo repo from the build guide: a tiny Node app
with a real, deliberately-introduced bug and a GitHub Actions workflow that
runs on every push.

## What's seeded

Two commits:

1. `Initial checkout flow: confirm order only after payment completes` -
   the correct version. `checkout()` awaits `paymentService.charge()` before
   marking the order confirmed. Both tests pass.
2. `Fire payment and confirm immediately for snappier checkout UX` - the
   seeded bug. `checkout()` now confirms the order synchronously without
   waiting for the (async) payment to actually complete - the exact race
   condition from the original FixPilot pitch doc. This is the current
   `HEAD` of `main`.

Verified locally before packaging this:
```
Tests:       1 failed, 1 passed, 2 total
```
exit code `1`. That output format is exactly what `SandboxService.parseTestCounts`
expects (Jest's summary line), so the evidence report FixPilot generates
will show real "1/2" style counts, not zeroes.

## How to use it

1. Create a **new, empty** repository on GitHub - do NOT use your `fixpilot`
   repo (that's the orchestrator itself; keep them separate). Don't
   initialize it with a README/gitignore, since this folder already has
   both.
2. From inside this folder:
   ```bash
   git remote add origin https://github.com/<you>/fixpilot-demo-app.git
   git push -u origin main
   ```
   Pushing an existing local repo doesn't rewrite its commits, so the two
   commit SHAs stay exactly as they are here (see `git log` yourself, or
   check GitHub after pushing).
3. On GitHub, open the **Actions** tab - the push itself triggers the
   workflow, and it will fail on the seeded-bug commit. Note the run ID
   from that run's URL.
4. Set your FixPilot `.env`:
   ```dotenv
   GITHUB_OWNER=<you>
   GITHUB_REPO=fixpilot-demo-app
   ```
5. You now have everything the testing guide's Step 5/6 needs: a real
   owner, repo, sha (`git log` in this folder, or the Actions page), and
   run ID, all pointing at a genuine failure - not a guess.

## If you want more seeded bugs later

Add more commits the same way: working version, verified locally, then a
commit that breaks one specific thing. Keep each one isolated to a single,
diagnosable cause (a timeout, a null check, a genuinely flaky timing-based
test) so FixPilot's triage step has a clean signal to classify.
