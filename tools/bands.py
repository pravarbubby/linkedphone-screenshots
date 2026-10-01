# python3 tools/bands.py ref.jpg mine.png y0 y1 [x0 x1] [thr]  -> text bands (top,bottom,left,right) in both
import sys
from PIL import Image
a, b = sys.argv[1], sys.argv[2]; y0, y1 = int(sys.argv[3]), int(sys.argv[4])
x0 = int(sys.argv[5]) if len(sys.argv) > 5 else 0; x1 = int(sys.argv[6]) if len(sys.argv) > 6 else None
thr = int(sys.argv[7]) if len(sys.argv) > 7 else 130
def bands(path):
    im = Image.open(path).convert('L')
    if im.size[0] != 1290 and 'ios' in path: im = im.resize((1290, im.size[1]))
    X1 = x1 or im.size[0]; out = []; cur = None
    px = im.load()
    for y in range(y0, y1):
        xs = [x for x in range(x0, X1) if px[x, y] < thr]
        if xs:
            if cur is None: cur = [y, y, xs[0], xs[-1]]
            else: cur[1] = y; cur[2] = min(cur[2], xs[0]); cur[3] = max(cur[3], xs[-1])
        elif cur: out.append(cur); cur = None
    if cur: out.append(cur)
    return out
for name, p in (('ref ', a), ('mine', b)):
    print(name, ' '.join(f'[{t}-{bt} h{bt-t} x{l}-{r} w{r-l}]' for t, bt, l, r in bands(p)))
