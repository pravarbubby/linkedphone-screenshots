# python3 tools/versions.py  → versions.json (each vN with its last-updated time)
import os, json, re, datetime
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = []
for d in sorted([d for d in os.listdir(root) if re.fullmatch(r'v\d+', d)], key=lambda d: int(d[1:])):
    newest = 0
    for base in (os.path.join(root, d), os.path.join(root, 'exports', d)):
        for dp, _, fs in os.walk(base):
            for f in fs:
                if f not in ('.DS_Store', 'index.html'): newest = max(newest, os.path.getmtime(os.path.join(dp, f)))
    out.append({'v': d, 'updated': datetime.datetime.fromtimestamp(newest).isoformat(timespec='minutes')})
json.dump(out, open(os.path.join(root, 'versions.json'), 'w'), indent=1)
print(out[-3:])
