# copilot

```
APP_NAME="copilot-hands-on"
NAME="my-crawler"

## 初期化
copilot init --app ${APP_NAME} \
--name ${NAME} \
--type "Scheduled Job" \
--dockerfile "./Dockerfile" \
--schedule "10 14 * * *"

## リソース構築
# Credential source: Enter temporary credentials
copilot env init --name production \
--region ap-northeast-1 --app ${APP_NAME}

## デプロイ
copilot env deploy --name production

## 動作確認
copilot task run --app ${APP_NAME} \
--env production \
--follow \
--image alpine:latest \
--command "echo 'Howdy, Copilot'"
```

## シークレット追加

### コマンド実行後、貼り付け＆エンター
DATABASE_URL → file:../prod.db
REPLICA_URL → s3://copilot-hands-on/db/prod

```
copilot secret init --name DATABASE_URL
copilot secret init --name REPLICA_URL
```

### シークレットに設定追記
`copilot/my-crawler/manifest.yml` に下記を追記

```
secrets:
    DATABASE_URL: /copilot/${COPILOT_APPLICATION_NAME}/${COPILOT_ENVIRONMENT_NAME}/secrets/DATABASE_URL
    REPLICA_URL: /copilot/${COPILOT_APPLICATION_NAME}/${COPILOT_ENVIRONMENT_NAME}/secrets/REPLICA_URL
```

参考: https://github.com/jey3dayo/copilot-hands-on/blob/main/copilot/my-crawler/manifest.yml


## 動作確認
Step Functionsから実行

https://ap-northeast-1.console.aws.amazon.com/states/home?region=ap-northeast-1#/statemachines

# litestream

- S3に同期

```
litestream replicate local.db s3://copilot-hands-on/db/prod
```

- ローカルに復元

```
litestream restore -v -if-replica-exists -o prod.db s3://copilot-hands-on/db/prod
```
