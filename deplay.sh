
# 抛出脚本错误
set -e

# 拉取代码
git pull 

# 打包
npm run build

# 删除旧文件
rm -rf /root/nginx/unpoad/vue-admin

# 移动到/root/nginx/upload/vue-admin目录下并改名为vue-admin 
mv dist /root/nginx/upload/vue-admin  