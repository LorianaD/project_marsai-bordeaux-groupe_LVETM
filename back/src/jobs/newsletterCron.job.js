import cron from "node-cron";
import { pool } from "../db/index.js";
import {
  lockNewsletterForSending,
  markNewsletterSent,
} from "../models/newsletterDeliveries.model.js";
import { sendNewsletterToAllActive } from "../services/newsletterSend.service.js";

export function startNewsletterCron() {
  let running = false;

  cron.schedule(
    "* * * * *", // toutes les minutes
    async () => {
      if (running) {
        console.log("[newsletterCron] skipped (already running)");
        return;
      }

      running = true;
      const startTime = Date.now();

      try {
        console.log("[newsletterCron] checking scheduled newsletters...");

        const [rows] = await pool.execute(`
          SELECT id
          FROM newsletters
          WHERE status = 'scheduled'
            AND scheduled_at IS NOT NULL
            AND scheduled_at <= NOW()
          ORDER BY scheduled_at ASC
          LIMIT 1
        `);

        if (!rows.length) {
          console.log("[newsletterCron] nothing to send");
          return;
        }

        const newsletterId = rows[0].id;

        const locked = await lockNewsletterForSending(newsletterId);
        if (!locked) {
          console.log(
            `[newsletterCron] newsletter ${newsletterId} already locked`,
          );
          return;
        }

        console.log(`[newsletterCron] sending newsletter ${newsletterId}...`);

        await sendNewsletterToAllActive(newsletterId);

        await markNewsletterSent(newsletterId);

        console.log(
          `[newsletterCron] newsletter ${newsletterId} sent successfully`,
        );
      } catch (e) {
        console.error("[newsletterCron] error:", e?.stack || e?.message || e);
      } finally {
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`[newsletterCron] finished in ${duration}s`);
        running = false;
      }
    },
    {
      timezone: "Europe/Paris",
    },
  );
}
