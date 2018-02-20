echo "{
    name: \"Fluency in Topicwise English 2\",
    component: [
"
while read line 
do
topic=`echo $line | sed "s/\(.*\.\) \(.*\)./\2/"`
# echo $topic | sed "s/ //g"
echo "{
    name: \"$topic\",
    component: Functional
},"
done << EOF
1). Action Clusters.
2). Noun Compounds.
3). Idea Units for Pronunciation Practice.
EOF
echo "]
}
"