import { quadtree } from 'd3-quadtree';

const solveCollision = (e, t = {}) => {
  const n = quadtree()
    .x(e => e.xp)
    .y(e => e.yp);
  void 0 !== t.extent && n.extent(t.extent);
  let r = 0;
  e.forEach(function(e) {
    (e.xp = e.x0),
      (e.yp = e.y0),
      void 0 !== t.r0 && (e.r0 = t.r0),
      (e.r = e.r0),
      (e.xMin = e.x0 - e.r0),
      (e.xMax = e.x0 + e.r0),
      (e.yMin = e.y0 - e.r0),
      (e.yMax = e.y0 + e.r0),
      n.visit(
        (function(e) {
          function t(t) {
            let n = e.xp - t.xp,
              r = e.yp - t.yp,
              a = n * n + r * r,
              i = e.r + t.r;
            if (a < i * i) {
              let o,
                c,
                f,
                u,
                l,
                s,
                h = Math.sqrt(a);
              e.r < t.r ? ((o = t), (c = e)) : ((o = e), (c = t));
              let d = o.r,
                b = c.r,
                p = (d + b + h) / 4;
              if (a > 0) (l = (c.xp - o.xp) / h), (s = (c.yp - o.yp) / h);
              else {
                let g = 2 * Math.PI * Math.random();
                (l = Math.cos(g)), (s = Math.sin(g));
              }
              b >= p
                ? ((f = p / d), (u = p / b))
                : ((f = (d - b + h) / (2 * d)) > 1 && console.log(f), (u = 1)),
                (o.r *= f),
                (c.r *= u),
                (o.xp += (f - 1) * d * l),
                (o.yp += (f - 1) * d * s),
                (c.xp += (1 - u) * b * l),
                (c.yp += (1 - u) * b * s),
                (o.xMin = o.xp - o.r),
                (o.xMax = o.xp + o.r),
                (o.yMin = o.yp - o.r),
                (o.yMax = o.yp + o.r),
                (c.xMin = c.xp - c.r),
                (c.xMax = c.xp + c.r),
                (c.yMin = c.yp - c.r),
                (c.yMax = c.yp + c.r);
            }
          }
          return function(n, a, i, o, c) {
            if (!n.length)
              do {
                n.data != e &&
                  e.xMax > n.data.xMin &&
                  e.xMin < n.data.xMax &&
                  e.yMax > n.data.yMin &&
                  e.yMin < n.data.yMax &&
                  t(n.data);
              } while ((n = n.next));
            return (
              a > e.xMax + r ||
              o + r < e.xMin ||
              i > e.yMax + r ||
              c + r < e.yMin
            );
          };
        })(e)
      ),
      (r = Math.max(r, e.r)),
      n.add(e);
  }),
    void 0 !== t.zoom &&
      e.forEach(function(e) {
        (e.cache = e.cache || {}),
          (e.cache[t.zoom] = {
            x: e.xp,
            y: e.yp,
            r: e.r,
          });
      });
  const a = quadtree()
    .x(e => e.xp)
    .y(e => e.yp);

  let i = 0;
  return (
    e.forEach(function(e) {
      a.add(e), (i = Math.max(i, e.r));
    }),
    (a.rMax = i),
    a
  );
};

export default solveCollision;
