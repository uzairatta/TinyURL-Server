import { parse } from "dotenv";
import { URLs } from "../Models/urls.js";

import { getCache, setCache } from "../Utils/redis.js";

export const RedirectURL = async (req, res) => {
  const { shortId } = req.params;
  try {
    const urlFromCache = await getCache(shortId);

    if (urlFromCache) {
      res.redirect(JASON.parse(urlFromCache));
      return;
    }

    const resUrls = await URLs.find({ shortId: shortId });
    const element = resUrls[0];
    await setCache(shortId, element.longUrl, 7400); // 2 hours
    res.redirect(element.longUrl);
  } catch (err) {
    res.status(500).json({
      ok: false,
    });
  }
};
