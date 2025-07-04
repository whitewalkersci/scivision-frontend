# Makefile for GCP Docker Build & Push

# === CONFIG ===
GCP_PROJECT_ID = nimble-granite-387107
GAR_REGION = us-central1
GAR_REPO = scivision
IMAGE_NAME = scivision-frontend
IMAGE_TAG = latest

FULL_IMAGE_NAME = $(GAR_REGION)-docker.pkg.dev/$(GCP_PROJECT_ID)/$(GAR_REPO)/$(IMAGE_NAME):$(IMAGE_TAG)

# === TARGETS ===

.PHONY: all build save load push clean

all: build save push

# 🏗️ Build Docker image
build:
	@echo "⏱️ Build started at: $$(date)"
	docker build -t $(FULL_IMAGE_NAME) .
	@echo "✅ Build completed at: $$(date)"

# 📦 Save Docker image to .tar.gz
save:
	@echo "📦 Saving Docker image to image.tar.gz..."
	docker save $(FULL_IMAGE_NAME) | gzip > image.tar.gz

# 📤 Load Docker image from .tar.gz
load:
	@echo "📦 Loading Docker image from image.tar.gz..."
	gunzip -c image.tar.gz | docker load

# 🚀 Push Docker image to Artifact Registry
push:
	@echo "🔐 Configuring Docker to use gcloud auth..."
	gcloud config set project $(GCP_PROJECT_ID)
	gcloud auth configure-docker $(GAR_REGION)-docker.pkg.dev
	@echo "🚀 Pushing image: $(FULL_IMAGE_NAME)"
	docker push $(FULL_IMAGE_NAME)
	@echo "✅ Push completed at: $$(date)"

# 🧹 Clean saved image archive
clean:
	@echo "🧹 Cleaning image archive..."
	rm -f image.tar.gz
