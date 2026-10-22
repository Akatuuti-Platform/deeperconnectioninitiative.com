// Structural checks on the Convex backend source. Runs in Node with the site tests; it lives
// outside convex/ because Convex bundles that folder for its own runtime, which has no `fs`.
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const convexDir = join(__dirname, '..', '..', '..', '..', 'convex');
const sources = readdirSync(convexDir, { recursive: true })
	.map(String)
	.filter((f) => f.endsWith('.ts') && !f.startsWith('_generated') && !f.endsWith('.test.ts'))
	.map((f) => ({ file: f, src: readFileSync(join(convexDir, f), 'utf8') }));

describe('Convex backend structure', () => {
	it('registers no public query, mutation or action anywhere: browsers cannot reach data', () => {
		for (const { file, src } of sources) {
			const m = src.match(/import\s*\{([^}]*)\}\s*from\s*"(?:\.\.?\/)+_generated\/server"/);
			const names = (m?.[1] ?? '').split(',').map((s) => s.trim().replace(/^type\s+/, ''));
			for (const n of ['query', 'mutation', 'action']) expect(names, `${file} imports ${n}`).not.toContain(n);
		}
	});

	it('keeps aggregate code apart from contact code', () => {
		const agg = sources.find((s) => s.file === 'aggregate.ts')!.src;
		expect(/contacts|consentEvents|suppressions|email/i.test(agg.replace(/\/\/.*$/gm, ''))).toBe(false);
	});

	it('never logs an email address or a request body', () => {
		// Checks what is interpolated into, or passed to, every console call.
		for (const { file, src } of sources) {
			for (const line of src.split('\n').filter((l) => /console\.(log|warn|error)/.test(l))) {
				const interpolated = [...line.matchAll(/\$\{([^}]*)\}/g)].map((m) => m[1]);
				const args = line.replace(/`[^`]*`|"[^"]*"|'[^']*'/g, '').match(/console\.\w+\(([^)]*)\)/)?.[1] ?? '';
				for (const expr of [...interpolated, args]) {
					expect(/\b(to|email|body|payload|b)\b(?!\.subject)/.test(expr), `${file}: ${line.trim()}`).toBe(false);
				}
			}
		}
	});

	it('has no em dashes in email copy', () => {
		const emails = sources.find((s) => s.file.endsWith('emails.ts'))!.src;
		expect(emails.includes('—')).toBe(false);
	});
});
