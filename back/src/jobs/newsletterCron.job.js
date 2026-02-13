import cron from "node-cron";
import { pool } from "../db/index.js";
import {
  lockNewsletterForSending,
  markNewsletterSent,
} from "../models/newsletterDeliveries.model.js";
import { sendNewsletterToAllActive } from "../services/newsletterSend.service.js";

export function startNewsletterCron() {
  // toutes les minutes
  cron.schedule("* * * * *", async () => {
    try {
      const [rows] = await pool.execute(
        `
        SELECT id
        FROM newsletters
        WHERE status='scheduled'
          AND scheduled_at IS NOT NULL
          AND scheduled_at <= NOW()
        ORDER BY scheduled_at ASC
        LIMIT 5
        `,
      );

      for (const r of rows) {
        const locked = await lockNewsletterForSending(r.id);
        if (!locked) continue;

        await sendNewsletterToAllActive(r.id);
        await markNewsletterSent(r.id);
      }
    } catch (e) {
      console.error("[newsletterCron] error:", e?.message || e);
    }
  });
}
