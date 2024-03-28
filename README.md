# Intel Generative AI Examples

## Introduction

This project provides a collective list of Generative AI (GenAI) examples such as chatbot with question and answering (ChatQnA), code generation, document summary, etc. The examples are developed by leveraging the ecosystem components such as LangChain with Intel optimizations, therefore delivering the high performance for your deployment on Intel platforms.

## GenAI Examples

All the examples are well-validated on Intel platforms. In addition, these examples are:

- <b>Easy to use</b>. Use ecosystem-compliant APIs to build the end-to-end GenAI examples

- <b>Easy to customize</b>. Customize the example using different framework, LLM, embedding, serving etc.

- <b>Easy to deploy</b>. Deploy the GenAI examples with performance on Intel platforms

> **Note**:
> The below support matrix gives the validated configurations. Feel free to customize per your needs.

### ChatQnA

[ChatQnA](./ChatQnA/README.md) is an example of chatbot for question and answering through retrieval argumented generation (RAG).

<table>
	<tbody>
		<tr>
			<td>Framework</td>
			<td>LLM</td>
			<td>Embedding</td>
			<td>Vector Database</td>
			<td>Serving</td>
			<td>HW</td>
			<td>Description</td>
		</tr>
		<tr>
			<td><a href="https://www.langchain.com">LangChain</a></td>
			<td><a href="https://huggingface.co/Intel/neural-chat-7b-v3-3">NeuralChat-7B</a></td>
			<td><a href="https://huggingface.co/BAAI/bge-base-en">BGE-Base</a></td>
			<td><a href="https://redis.io/">Redis</a></td>
			<td><a href="https://github.com/huggingface/tgi-gaudi">TGI-Habana</a></td>
			<td>Gaudi2</td>
			<td>Chatbot</td>
		</tr>
		<tr>
			<td><a href="https://www.langchain.com">LangChain</a></td>
			<td><a href="https://huggingface.co/Intel/neural-chat-7b-v3-3">NeuralChat-7B</a></td>
			<td><a href="https://huggingface.co/BAAI/bge-base-en">BGE-Base</a></td>
			<td><a href="https://www.trychroma.com/">Chroma</a></td>
			<td><a href="https://github.com/huggingface/tgi-gaudi">TGI-Habana</a></td>
			<td>Gaudi2</td>
			<td>Chatbot</td>
		</tr>
		<tr>
			<td><a href="https://www.langchain.com">LangChain</a></td>
			<td><a href="https://huggingface.co/mistralai/Mistral-7B-v0.1">Mistral-7B</a></td>
			<td><a href="https://huggingface.co/BAAI/bge-base-en">BGE-Base</a></td>
			<td><a href="https://redis.io/">Redis</a></td>
			<td><a href="https://github.com/huggingface/tgi-gaudi">TGI-Habana</a></td>
			<td>Gaudi2</td>
			<td>Chatbot</td>
		</tr>
	</tbody>
</table>

### CodeGen

[CodeGen](./CodeGen/README.md) is an example of copilot designed for code generation in Visual Studio Code.

<table>
	<tbody>
		<tr>
			<td>Framework</td>
			<td>LLM</td>
			<td>Serving</td>
			<td>HW</td>
			<td>Description</td>
		</tr>
		<tr>
			<td><a href="https://www.langchain.com">LangChain</a></td>
			<td><a href="https://huggingface.co/deepseek-ai/deepseek-coder-33b-instruct">Deepseek-Coder-33B</a></td>
			<td><a href="https://github.com/huggingface/tgi-gaudi">TGI-Habana</a></td>
			<td>Gaudi2</td>
			<td>Copilot</td>
		</tr>
	</tbody>
</table>

### DocSum

[DocSum](./DocSum/README.md) is an example of chatbot for summarizing the content of documents or reports.

<table>
	<tbody>
		<tr>
			<td>Framework</td>
			<td>LLM</td>
			<td>Serving</td>
			<td>HW</td>
			<td>Description</td>
		</tr>
		<tr>
			<td><a href="https://www.langchain.com">LangChain</a></td>
			<td><a href="https://huggingface.co/Intel/neural-chat-7b-v3-3">NeuralChat-7B</a></td>
			<td><a href="https://github.com/huggingface/tgi-gaudi">TGI-Habana</a></td>
			<td>Gaudi2</td>
			<td>Chatbot</td>
		</tr>
		<tr>
			<td><a href="https://www.langchain.com">LangChain</a></td>
			<td><a href="https://huggingface.co/mistralai/Mistral-7B-v0.1">Mistral-7B</a></td>
			<td><a href="https://github.com/huggingface/tgi-gaudi">TGI-Habana</a></td>
			<td>Gaudi2</td>
			<td>Chatbot</td>
		</tr>
	</tbody>
</table>

### VisualQnA

[VisualQnA](./VisualQnA/README.md) is an example of chatbot for question and answering based on the images.

<table>
	<tbody>
		<tr>
			<td>Framework</td>
			<td>LLM</td>
			<td>Serving</td>
			<td>HW</td>
			<td>Description</td>
		</tr>
		<tr>
			<td><a href="https://www.langchain.com">LangChain</a></td>
			<td><a href="https://huggingface.co/llava-hf/llava-1.5-7b-hf">LLaVA-1.5-7B</a></td>
			<td><a href="https://github.com/huggingface/tgi-gaudi">TGI-Habana</a></td>
			<td>Gaudi2</td>
			<td>Chatbot</td>
		</tr>
	</tbody>
</table>

## Additional Content

- [Contribution](/CONTRIBUTING.md)
- [Legal Information](/LEGAL_INFORMATION.md)
- [Security Policy](/SECURITY.md)
