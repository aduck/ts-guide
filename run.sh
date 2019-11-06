#!/bin/bash
save=$1
# 先清掉js文件
rm -f *.js
tsc index.ts
node index.js
# 是否保留js文件
if [ ! $save ]
then
  rm -f *.js
fi