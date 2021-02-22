#!/bin/bash


START=$(date +%s.%N)
echo "`date` start" 


if [[ $@  =~ "-f" ]]; then
    echo "clear and all recalculate " 
    head -3 ./docs/checksum_.md>./docs/checksum.md
fi
 

checksum="`cat ./docs/checksum.md`"

 

##遍历dl目录下的文件
find ./dl -type f -print0 | while IFS= read -r -d $'\0' file; 
  do 
  if [[ "$checksum" != *"$file"* ]]; then
    echo "new file $file" ; 
    md5=$(    md5sum    "$file"| cut -d ' ' -f 1) 
    sha1=$(   sha1sum   "$file"| cut -d ' ' -f 1) 
    sha256=$( sha256sum "$file"| cut -d ' ' -f 1) 
    
    ##懒得计算该如何显示KB/MB/GB 直接 -h
    size=`du -h "$file" | cut -f1`
    mdate=`date -r "$file"  "+%Y-%m-%d"`

    echo "| `printf "%-32s" $mdate` | `printf "%-40s" $size` | `printf "%-64s" "$file"` |"  >> ./docs/checksum.md;
    echo "| $md5 | $sha1 | $sha256 |" >> ./docs/checksum.md;
    
  fi
done




END=$(date +%s.%N)
DIFF=$(echo "$END - $START" | bc)

echo "`date` end , cost $DIFF" 
 
 