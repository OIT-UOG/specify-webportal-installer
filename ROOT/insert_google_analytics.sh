te_fn="index.html"
if [ $# -gt 0 ]
  then
    te_fn=$1
fi

an_fn="google_analytics.html"
if [ $# -gt 1 ]
  then
    an_fn=$2
fi
analytics="<head>\n"$(cat $an_fn)"\n"

awk -v r="$analytics" '!x{x=gsub(/<head>/,r)}1' $te_fn > __temp__.html && mv __temp__.html $te_fn
