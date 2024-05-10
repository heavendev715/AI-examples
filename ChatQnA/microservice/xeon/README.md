# Build Mega Service of ChatQnA on Xeon

This document outlines the deployment process for a ChatQnA application utilizing the [GenAIComps](https://github.com/opea-project/GenAIComps.git) microservice pipeline on Intel Xeon server. The steps include Docker image creation, container deployment via Docker Compose, and service execution to integrate microservices such as `embedding`, `retriever`, `rerank`, and `llm`. We will publish the Docker images to Docker Hub soon, it will simplify the deployment process for this service.

## 🚀 Apply Xeon Server on AWS

To apply a Xeon server on AWS, start by creating an AWS account if you don't have one already. Then, head to the [EC2 Console](https://console.aws.amazon.com/ec2/v2/home) to begin the process. Within the EC2 service, select the Amazon EC2 M7i or M7i-flex instance type to leverage the power of 4th Generation Intel Xeon Scalable processors. These instances are optimized for high-performance computing and demanding workloads.

For detailed information about these instance types, you can refer to this [link](https://aws.amazon.com/ec2/instance-types/m7i/). Once you've chosen the appropriate instance type, proceed with configuring your instance settings, including network configurations, security groups, and storage options.

After launching your instance, you can connect to it using SSH (for Linux instances) or Remote Desktop Protocol (RDP) (for Windows instances). From there, you'll have full access to your Xeon server, allowing you to install, configure, and manage your applications as needed.

## 🚀 Build Docker Images

First of all, you need to build Docker Images locally and install the python package of it.

```bash
git clone https://github.com/opea-project/GenAIComps.git
cd GenAIComps
pip install -r requirements.txt
pip install .
```

### 1. Build Embedding Image

```bash
docker build -t opea/gen-ai-comps:embedding-tei-server --build-arg https_proxy=$https_proxy --build-arg http_proxy=$http_proxy -f comps/embeddings/docker/Dockerfile .
```

### 2. Build Retriever Image

```bash
docker build -t opea/gen-ai-comps:retriever-redis-server --build-arg https_proxy=$https_proxy --build-arg http_proxy=$http_proxy -f comps/retrievers/langchain/docker/Dockerfile .
```

### 3. Build Rerank Image

```bash
docker build -t opea/gen-ai-comps:reranking-tei-xeon-server --build-arg https_proxy=$https_proxy --build-arg http_proxy=$http_proxy -f comps/reranks/docker/Dockerfile .
```

### 4. Build LLM Image

```bash
docker build -t opea/gen-ai-comps:llm-tgi-server --build-arg https_proxy=$https_proxy --build-arg http_proxy=$http_proxy -f comps/llm/langchain/docker/Dockerfile .
```

### 5. Pull qna-rag-redis-server Image

```bash
docker pull intel/gen-ai-examples:qna-rag-redis-server
```

Then run the command `docker images`, you will have the following four Docker Images:

1. `opea/gen-ai-comps:embedding-tei-server`
2. `opea/gen-ai-comps:retriever-redis-server`
3. `opea/gen-ai-comps:reranking-tei-xeon-server`
4. `opea/gen-ai-comps:llm-tgi-server`
5. `intel/gen-ai-examples:qna-rag-redis-server`

## 🚀 Start Microservices

### Setup Environment Variables

Since the `docker_compose_xeon.yaml` will consume some environment variables, you need to setup them in advance as below.

```bash
export http_proxy=${your_http_proxy}
export https_proxy=${your_http_proxy}
export EMBEDDING_MODEL_ID="BAAI/bge-large-en-v1.5"
export RERANK_MODEL_ID="BAAI/bge-reranker-large"
export LLM_MODEL_ID="m-a-p/OpenCodeInterpreter-DS-6.7B"
export TEI_EMBEDDING_ENDPOINT="http://${your_ip}:8090"
export TEI_RERANKING_ENDPOINT="http://${your_ip}:6060"
export TGI_LLM_ENDPOINT="http://${your_ip}:8008"
export REDIS_URL="redis://${your_ip}:6379"
export INDEX_NAME=${your_index_name}
export HUGGINGFACEHUB_API_TOKEN=${your_hf_api_token}
```

### Start Microservice Docker Containers

```bash
docker compose -f docker_compose_xeon.yaml up -d
```

### Validate Microservices

1. TEI Embedding Service

```bash
curl ${your_ip}:8090/embed \
    -X POST \
    -d '{"inputs":"What is Deep Learning?"}' \
    -H 'Content-Type: application/json'
```

2. Embedding Microservice

```bash
curl http://${your_ip}:6000/v1/embeddings\
  -X POST \
  -d '{"text":"hello"}' \
  -H 'Content-Type: application/json'
```

3. Retriever Microservice

```bash
curl http://${your_ip}:7000/v1/retrieval\
  -X POST \
  -d '{"text":"test","embedding":[1,1,...1]}' \
  -H 'Content-Type: application/json'
```

4. TEI Reranking Service

```bash
curl http://${your_ip}:6060/rerank \
    -X POST \
    -d '{"query":"What is Deep Learning?", "texts": ["Deep Learning is not...", "Deep learning is..."]}' \
    -H 'Content-Type: application/json'
```

5. Reranking Microservice

```bash
curl http://${your_ip}:8000/v1/reranking\
  -X POST \
  -d '{"initial_query":"What is Deep Learning?", "retrieved_docs": [{"text":"Deep Learning is not..."}, {"text":"Deep learning is..."}]}' \
  -H 'Content-Type: application/json'
```

6. TGI Service

```bash
curl http://${your_ip}:8008/generate \
  -X POST \
  -d '{"inputs":"What is Deep Learning?","parameters":{"max_new_tokens":17, "do_sample": true}}' \
  -H 'Content-Type: application/json'
```

7. LLM Microservice

```bash
curl http://${your_ip}:9000/v1/chat/completions\
  -X POST \
  -d '{"text":"What is Deep Learning?"}' \
  -H 'Content-Type: application/json'
```

Following the validation of all aforementioned microservices, we are now prepared to construct a mega-service. However, before launching the mega-service, it's essential to ingest data into the vector store.

## 🚀 Ingest Data Into Vector Database

```bash
docker exec -it qna-rag-redis-server bash
cd /ws
python ingest.py
```

## 🚀 Construct Mega Service

Modify the `initial_inputs` of line 34 in `chatqna.py`, then you will get the ChatQnA result of this mega service.

All of the intermediate results will be printed for each microservices. Users can check the accuracy of the results to make targeted modifications.

```bash
python chatqna.py
```
