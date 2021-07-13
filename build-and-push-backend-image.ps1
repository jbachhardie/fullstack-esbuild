param([string]$version)

$image = "gcr.io/test-fullstack-319621/backend:$version"

docker build -t $image .
docker push $image
gcloud compute instance-templates create-with-container "backend-$version" `
  --container-image $image `
  --machine-type e2-micro `
  --container-env-file backend/server/.env
