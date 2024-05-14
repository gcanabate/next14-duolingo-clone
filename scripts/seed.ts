import "dotenv/config";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.challengeOptions);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        id: 2,
        title: "French",
        imageSrc: "/fr.svg",
      },
      {
        id: 3,
        title: "Italian",
        imageSrc: "/it.svg",
      },
      {
        id: 4,
        title: "Japaneese",
        imageSrc: "/jp.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, //Spanish
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, //unit 1 (Learn the basics)
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1, //unit 1 (Learn the basics)
        order: 2,
        title: "Verbs",
      },
      {
        id: 3,
        unitId: 1, //unit 1 (Learn the basics)
        order: 3,
        title: "Names",
      },
      {
        id: 4,
        unitId: 1, //unit 1 (Learn the basics)
        order: 4,
        title: "Actions",
      },
      {
        id: 5,
        unitId: 1, //unit 1 (Learn the basics)
        order: 5,
        title: "Nature",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, //Nouns
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the boy"?',
      },
      {
        id: 2,
        lessonId: 1, //Nouns
        type: "ASSIST",
        order: 2,
        question: '"the boy"?',
      },
      {
        id: 3,
        lessonId: 1, //Nouns
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "the zombie"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1, //Which one of these is the "the boy"
        imageSrc: "/boy.svg",
        correct: true,
        text: "el chico",
        audioSrc: "/es_boy.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/girl.svg",
        correct: false,
        text: "la nina",
        audioSrc: "/es_girl.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/zombie.svg",
        correct: false,
        text: "el zombie",
        audioSrc: "/es_zombie.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2, // "the boy"
        correct: true,
        text: "el chico",
        audioSrc: "/es_boy.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "la nina",
        audioSrc: "/es_girl.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "el zombie",
        audioSrc: "/es_zombie.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3, //Which one of these is the "the zombie"
        imageSrc: "/boy.svg",
        correct: false,
        text: "el chico",
        audioSrc: "/es_boy.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/girl.svg",
        correct: false,
        text: "la nina",
        audioSrc: "/es_girl.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/zombie.svg",
        correct: true,
        text: "el zombie",
        audioSrc: "/es_zombie.mp3",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2, //Nouns
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the boy"?',
      },
      {
        id: 5,
        lessonId: 2, //Nouns
        type: "ASSIST",
        order: 2,
        question: '"the boy"?',
      },
      {
        id: 6,
        lessonId: 2, //Nouns
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "the zombie"?',
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
