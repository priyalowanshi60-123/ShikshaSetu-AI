const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
    path: path.resolve(
        __dirname,
        "../.env"
    )
});

const Course =
    require("./models/course");

const Lesson =
    require("./models/lesson");

const OLLAMA_URL =
    "http://127.0.0.1:11434/api/chat";

const MODEL =
    "llama3.2";

async function askOllama(prompt) {

    const response =
        await fetch(
            OLLAMA_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    model: MODEL,

                    stream: false,

                    format: "json",

                    messages: [
                        {
                            role: "system",
                            content:
                                "You are a professional educational translator. Translate educational content accurately. Return only valid JSON. Do not add markdown."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ]
                })
            }
        );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Ollama request failed"
        );
    }

    let text =
        data.message?.content?.trim();

    if (!text) {
        throw new Error(
            "Ollama returned empty content"
        );
    }

    text =
        text.replace(
            /^```json\s*/i,
            ""
        );

    text =
        text.replace(
            /```$/i,
            ""
        );

    const firstBrace =
        text.indexOf("{");

    const lastBrace =
        text.lastIndexOf("}");

    if (
        firstBrace === -1 ||
        lastBrace === -1
    ) {
        throw new Error(
            "Invalid JSON returned by Ollama"
        );
    }

    text =
        text.substring(
            firstBrace,
            lastBrace + 1
        );

    return JSON.parse(text);
}


// =====================================
// TRANSLATE COURSES
// =====================================

async function translateCourses() {

    const courses =
        await Course.find();

    console.log(
        `Found ${courses.length} course(s).`
    );

    for (
        const course of courses
    ) {

        console.log(
            "\nTranslating course:",
            course.title
        );

        const prompt = `
Translate this educational course into accurate English and Hindi.

Original title:
${course.title}

Original description:
${course.description}

Return exactly this JSON format:

{
  "titleEn": "...",
  "titleHi": "...",
  "descriptionEn": "...",
  "descriptionHi": "..."
}

English should be natural academic English.
Hindi should be clear student-friendly Hindi.
Do not change the meaning.
`;

        try {

            const result =
                await askOllama(
                    prompt
                );

            await Course.updateOne(
                {
                    _id: course._id
                },
                {
                    $set: {
                        titleEn:
                            result.titleEn ||
                            course.title,

                        titleHi:
                            result.titleHi ||
                            course.title,

                        descriptionEn:
                            result.descriptionEn ||
                            course.description,

                        descriptionHi:
                            result.descriptionHi ||
                            course.description
                    }
                }
            );

            console.log(
                "Course translated successfully."
            );

        } catch (error) {

            console.error(
                "Course translation error:",
                error.message
            );
        }
    }
}


// =====================================
// TRANSLATE LESSONS
// =====================================

async function translateLessons() {

    const lessons =
        await Lesson.find()
            .sort({
                order: 1,
                createdAt: 1
            });

    console.log(
        `\nFound ${lessons.length} lesson(s).`
    );

    let count = 0;

    for (
        const lesson of lessons
    ) {

        count++;

        console.log(
            `\n[${count}/${lessons.length}] Translating:`,
            lesson.title
        );

        const prompt = `
Translate this educational lesson into accurate English and Hindi.

Original lesson title:
${lesson.title}

Original lesson content:
${lesson.content}

Return exactly this JSON format:

{
  "titleEn": "...",
  "titleHi": "...",
  "contentEn": "...",
  "contentHi": "..."
}

English should be natural, simple academic English for college students.
Hindi should be clear, natural, student-friendly Hindi.
Keep programming keywords such as JavaScript, variable, string, integer, boolean, function, API, database, etc. in English when appropriate.
Do not change the technical meaning.
Do not shorten the lesson.
`;

        try {

            const result =
                await askOllama(
                    prompt
                );

            await Lesson.updateOne(
                {
                    _id: lesson._id
                },
                {
                    $set: {
                        titleEn:
                            result.titleEn ||
                            lesson.title,

                        titleHi:
                            result.titleHi ||
                            lesson.title,

                        contentEn:
                            result.contentEn ||
                            lesson.content,

                        contentHi:
                            result.contentHi ||
                            lesson.content
                    }
                }
            );

            console.log(
                "Lesson translated successfully."
            );

        } catch (error) {

            console.error(
                "Lesson translation error:",
                error.message
            );
        }
    }
}


// =====================================
// MAIN
// =====================================

async function main() {

    try {

        console.log(
            "Connecting to MongoDB..."
        );

        await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log(
            "MongoDB connected."
        );

        console.log(
            "\nStarting course translation..."
        );

        await translateCourses();

        console.log(
            "\nStarting lesson translation..."
        );

        await translateLessons();

        console.log(
            "\n================================"
        );

        console.log(
            "Translation completed successfully."
        );

        console.log(
            "================================"
        );

        await mongoose.disconnect();

    } catch (error) {

        console.error(
            "\nTRANSLATION ERROR:",
            error.message
        );

        await mongoose.disconnect();

        process.exit(1);
    }
}

main();