# prisma

# litestream

- S3に同期
litestream replicate local.db s3://copilot-hands-on/db/prod

- ローカルに復元
litestream restore -v -if-replica-exists -o prod.db s3://copilot-hands-on/db/prod
