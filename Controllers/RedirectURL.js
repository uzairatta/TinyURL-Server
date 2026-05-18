import { URLs } from "../Models/urls.js";

export const RedirectURL = async (req, res) => {
  const { shortId } = req.params;
  try {
    console.log(shortId);
    const url = await URLs.findOne({ shortId: shortId });
    if (!url) return res.status(404).json({ ok: false });
    res.redirect(url.longUrl);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
    });
  }
};