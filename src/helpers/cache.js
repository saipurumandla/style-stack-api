var mCache = require("memory-cache");
exports.cache = (key, duration) => {
  return (req, res, next) => {
    const id = req.params.id;
    const cacheKey = `${key}${id ? "/" + id : ""}`;
    let cachedBody = mCache.get(cacheKey);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        if (body.includes(`"success":true`)) {
          mCache.put(cacheKey, body, duration * 1000);
        }
        res.sendResponse(body);
      };
      next();
    }
  };
};

exports.getCacheValue = (key) => {
  return mCache.get(key);
};

exports.deCache = (key) => {
  return (req, res, next) => {
    const id = req.params.id;
    const cacheKey = `${key}${id ? "/" + id : ""}`;
    res.sendResponse = res.send;
    res.send = (body) => {
      if (body.includes(`"success":true`)) {
        mCache.del(cacheKey);
        if (id) {
          const allCacheKey = `${key}`;
          mCache.del(allCacheKey);
        }
      }
      res.sendResponse(body);
    };
    next();
  };
};
