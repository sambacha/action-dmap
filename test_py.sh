curl -X POST -H "accept: application/vnd.github.v4+json" -H "authorization: token <YOUR-TOKEN>" \
-H "content-type: application/json" \
--data @<path-to-your-json-file> \
https://api.github.com/repos/<owner>/<repo>/dependency-graph/snapshots
