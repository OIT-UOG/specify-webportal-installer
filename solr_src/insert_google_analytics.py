import sys

to_edit = sys.argv[1]
analytics = sys.argv[2]

with open(analytics) as f:
    to_insert = f.read()

with open(to_edit) as f:
    html = f.read()

print(html.replace('<head>', '<head>\n' + to_insert + '\n', 1))
