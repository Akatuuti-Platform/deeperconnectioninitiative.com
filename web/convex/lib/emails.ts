// Email content and sending for the Mental Models follow-up. Plain, short, and honest:
// no diagnosis, no prediction, no outcome promises, always a way to stop.
import { env } from "../_generated/server";
import { MODELS } from "../../src/lib/mental-models/models";
import { HEADLINE, PATTERN_NOTE, REACTION, RESPONSE, COMPATIBLE_HEADING } from "../../src/lib/mental-models/labels";
import type { ModelId } from "../../src/lib/mental-models/types";

export interface Consents {
  fullReport?: boolean;
  followUp?: boolean;
  updates?: boolean;
  research?: boolean;
  dailyCheck?: boolean;
  productInfo?: boolean;
  rememberResult?: boolean;
}

export interface Email {
  subject: string;
  text: string;
}

function siteUrl(): string {
  return (env.SITE_URL ?? "https://www.deeperconnectioninitiative.com").replace(/\/$/, "");
}

export function links(confirmToken: string | null, manageToken: string) {
  const site = siteUrl();
  return {
    site,
    confirm: confirmToken ? `${site}/mental-models/confirm?token=${encodeURIComponent(confirmToken)}` : null,
    stop: `${site}/mental-models/stop?token=${encodeURIComponent(manageToken)}`,
    oneClickStop: `${env.CONVEX_SITE_URL}/mm/unsubscribe?token=${encodeURIComponent(manageToken)}`,
    scorecard: `${site}/mental-models`,
    check: `${site}/mental-models/14-day-check`,
    tracker: `${site}/toolkit#toolkit-products`,
    support: `${site}/support`,
  };
}

function hello(firstName: string | null): string {
  return firstName ? `Hello ${firstName},` : "Hello,";
}

function footer(stopUrl: string, supportUrl: string): string {
  return [
    "",
    "You are getting this because you asked for it on the DCI Mental Models Scorecard.",
    `Stop these emails and delete your details: ${stopUrl}`,
    "",
    `DCI is not an emergency service. If you are in danger, contact your local emergency services. Support options: ${supportUrl}`,
    "",
    "DCI Wellness (Deeper Connection Initiative), Kampala, Uganda",
  ].join("\n");
}

export function confirmationEmail(firstName: string | null, l: ReturnType<typeof links>): Email {
  return {
    subject: "Please confirm, and we will send your full report",
    text: [
      hello(firstName),
      "",
      "You asked DCI Wellness to email you your full Mental Models report. Please confirm it was you, and we will send it straight away:",
      l.confirm ?? "",
      "",
      "If you did not ask for this, ignore this email. We will delete this address within 7 days and never write again.",
      footer(l.stop, l.support),
    ].join("\n"),
  };
}

/** The full report, built from the same Model content as the results page. */
export function fullReportEmail(
  firstName: string | null,
  report: { primary: ModelId; underPressure: ModelId | null },
  c: Consents,
  l: ReturnType<typeof links>,
): Email {
  const m = MODELS[report.primary];
  const u = report.underPressure ? MODELS[report.underPressure] : null;
  const learn = MODELS[m.learnFrom.model];
  const lines = [
    hello(firstName),
    "",
    "Here is your full DCI Mental Models report.",
    "",
    HEADLINE,
    `Go-to: ${m.name}. "${m.signature}"`,
    ...(u ? [`Under pressure: ${u.name}`] : []),
    "",
    `${REACTION.label} (${REACTION.definition.toLowerCase().replace(/\.$/, "")}): ${m.reaction}`,
    `${RESPONSE.label} (${RESPONSE.definition.toLowerCase().replace(/\.$/, "")}): ${m.response}`,
    `Your tiny step: ${m.tinyStep}`,
    `Blind spot: ${m.blindSpot}`,
    "",
    `Your strength: ${m.strength}`,
    `When it gets too much: ${m.tooMuch}`,
    `What it may be protecting: ${m.protecting}`,
    ...(u ? ["", `Under pressure: ${u.name}. When your go-to stops working, you may land here.`, `${REACTION.label}: ${u.reaction}`, `${RESPONSE.label}: ${u.response}`, `Blind spot: ${u.blindSpot}`] : []),
    "",
    `Explore your story (optional, one possible influence, not the cause): ${m.origin.stage} (${m.origin.ageNote}, DCI Reflection Journal, ${m.origin.journalLetter} letter). ${m.origin.body}`,
    `Reflect: ${m.origin.reflect}`,
    "",
    `${COMPATIBLE_HEADING} ${learn.name}. Why: ${m.learnFrom.why} ${m.learnFrom.tryVerb}: ${m.learnFrom.tryText}`,
    `What you bring: ${m.canTeach}`,
    "",
    PATTERN_NOTE,
    "",
  ];
  const next: string[] = [];
  if (c.followUp) next.push("In 90 days we will send one email inviting you to take the scorecard again.");
  if (c.updates) next.push("You will get occasional DCI updates.");
  if (c.research) next.push("We may contact you about taking part in DCI research on this scorecard.");
  lines.push(next.length ? next.join(" ") : "That is all. We will not email you again, and we have deleted your email address.");
  lines.push(footer(l.stop, l.support));
  return { subject: `Your DCI Mental Models report: ${m.name}`, text: lines.join("\n") };
}

export function checkInEmail(firstName: string | null, c: Consents, l: ReturnType<typeof links>): Email {
  const lines = [hello(firstName), ""];
  if (c.dailyCheck) {
    lines.push(
      "It has been 14 days. If you kept the daily check, take a minute to look back over it. Which colours came up most? Was there a day that surprised you?",
      "Noticing a pattern earlier is the point. There is no right answer.",
    );
  }
  if (c.productInfo) {
    lines.push(
      "",
      "If you would like to keep going, the DCI Mood Tracker gives you a full year, one colour a day, on paper. It costs 31,000 UGX and you can pay with Mobile Money or card:",
      l.tracker,
    );
  }
  lines.push(footer(l.stop, l.support));
  return { subject: c.dailyCheck ? "14 days of noticing" : "The DCI Mood Tracker", text: lines.join("\n") };
}

export function followUpEmail(
  firstName: string | null,
  c: Consents,
  remembered: ModelId | null,
  l: ReturnType<typeof links>,
): Email {
  const lines = [hello(firstName), "", "It has been three months since you took the DCI Mental Models Scorecard."];
  if (remembered) {
    lines.push("", `Last time, your go-to pattern was ${MODELS[remembered].name}. It may be the same now, or it may have shifted. Both are normal.`);
  }
  lines.push("", `How do you tend to respond to stress now? It takes about four minutes: ${l.scorecard}`);
  if (c.productInfo) {
    lines.push("", `If you would like to notice your mood day by day, the DCI Mood Tracker is 31,000 UGX: ${l.tracker}`);
  }
  lines.push("", "This is the last scheduled email we will send.", footer(l.stop, l.support));
  return { subject: "Three months on: how do you respond to stress now?", text: lines.join("\n") };
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function toHtml(text: string): string {
  return text
    .split("\n\n")
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br>").replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1">$1</a>')}</p>`)
    .join("");
}

/**
 * Sends one email through Resend. Never logs the address. Without a Resend key, a development
 * deployment that sets MM_DEV_ECHO_LINKS=true logs the links so the flow can be tested.
 */
export async function sendEmail(to: string, email: Email, oneClickStop: string): Promise<"sent" | "skipped" | "failed"> {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey || !env.MM_FROM_EMAIL) {
    if (env.MM_DEV_ECHO_LINKS === "true") {
      const urls = email.text.match(/https?:\/\/\S+/g) ?? [];
      console.log(`[mm dev email] "${email.subject}" links: ${urls.join(" ")}`);
    } else {
      console.warn(`[mm] email not sent: RESEND_API_KEY or MM_FROM_EMAIL is not set ("${email.subject}")`);
    }
    return "skipped";
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.MM_FROM_EMAIL,
        to,
        subject: email.subject,
        text: email.text,
        html: toHtml(email.text),
        headers: {
          "List-Unsubscribe": `<${oneClickStop}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      }),
    });
    if (!res.ok) {
      console.error(`[mm] Resend rejected "${email.subject}": ${res.status}`);
      return "failed";
    }
    return "sent";
  } catch {
    console.error(`[mm] Resend request failed for "${email.subject}"`);
    return "failed";
  }
}
