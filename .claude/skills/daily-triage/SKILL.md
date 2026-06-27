---
name: daily-triage
description: Morning triage of open issues and CI status for indian-otp
---

# Daily Triage Skill

When invoked, do the following:

1. Check GitHub Issues for anything labeled "bug" or "enhancement"
2. Check the most recent CI run for failures
3. If CI is failing, identify exactly which test file and test name is failing
4. Write a prioritized action list to TODO.md

Output format:
## Today's Priority
- [ ] Fix CI: specific file — specific test name
- [ ] Issue #XX: brief description

Rules:
- CI failures always go first
- Keep it under 10 items
- Only include what is actionable today
- Note the timestamp at the bottom of every write
