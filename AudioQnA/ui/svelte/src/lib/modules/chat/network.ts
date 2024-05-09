// Copyright (c) 2024 Intel Corporation
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { SSE } from "sse.js";
import { env } from "$env/dynamic/public";

// upload, tts
const TTS_URL = env.TTS_URL;
const CHAT_URL = env.CHAT_URL;
const ASR_URL = env.ASR_URL;
const UPLOAD_URL = env.UPLOAD_URL;

export async function fetchAudioText(file) {
	const url = `${ASR_URL}`;
	const formData = new FormData();
	formData.append("file", file);
	const init: RequestInit = {
		method: "POST",
		body: formData,
	};

	try {
		const response = await fetch(url, init);
		if (!response.ok) throw response.status;
		return await response.json();
	} catch (error) {
		console.error("network error: ", error);
		return undefined;
	}
}

export async function fetchAudioStream(text) {
	const url = `${TTS_URL}`;
	const bodyData = {
		text: text,
		text_language: "auto",
	};

	return new SSE(url, {
		headers: { "Content-Type": "application/json" },
		payload: JSON.stringify(bodyData),
	});
}

export async function fetchAudioEmbedding(file, text: string) {
	const url = `${UPLOAD_URL}`;
	const formData = new FormData();
	formData.append("default_refer_file", file);
	formData.append("default_refer_text", text);
	formData.append("default_refer_language", "en");
	const init: RequestInit = {
		method: "POST",
		body: formData,
	};

	try {
		const response = await fetch(url, init);
		if (!response.ok) throw response.status;
		return await response.json();
	} catch (error) {
		console.error("network error: ", error);
		return undefined;
	}
}

export async function fetchTextResponse(query) {
	const url = `${CHAT_URL}`;
	const bodyData = {
		query: query,
	};
	const init: RequestInit = {
		method: "POST",
		body: JSON.stringify(bodyData),
	};

	try {
		const response = await fetch(url, init);
		if (!response.ok) throw response.status;
		return await response.json();
	} catch (error) {
		console.error("network error: ", error);
		return undefined;
	}
}
