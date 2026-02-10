import {
  listSubscribers,
  countSubscribers,
  newsletterStats,
} from "../models/newsletter.model.js";

export async function adminListSubscribers(req, res) {
  const status = String(req.query?.status || "all");
  const q = String(req.query?.q || "");
  const limit = Number(req.query?.limit || 50);
  const offset = Number(req.query?.offset || 0);

  const [items, total] = await Promise.all([
    listSubscribers({ status, q, limit, offset }),
    countSubscribers({ status, q }),
  ]);

  return res.json({
    items,
    meta: {
      total,
      limit: Math.min(limit || 50, 200),
      offset: Math.max(offset || 0, 0),
    },
  });
}

export async function adminNewsletterStats(req, res) {
  const stats = await newsletterStats();
  return res.json({ stats });
}
