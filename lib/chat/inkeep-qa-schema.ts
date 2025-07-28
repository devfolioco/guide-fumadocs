/*import { z } from 'zod';

const InkeepRecordTypes = z.enum([
  'documentation',
  'site',
  'discourse_post',
  'github_issue',
  'github_discussion',
  'stackoverflow_question',
  'discord_forum_post',
  'discord_message',
  'custom_question_answer',
]);

const LinkType = z.union([
  InkeepRecordTypes,
  z.string(), // catch-all
]);

const LinkSchema = z
  .object({
    title: z.string().nullish(),
    type: LinkType.nullish(),
    breadcrumbs: z.array(z.string()).nullish(),
  })
  .passthrough();

const KnownAnswerConfidence = z.enum(['high', 'medium', 'low']); // assuming this is defined somewhere

const AnswerConfidence = z.union([
  KnownAnswerConfidence,
  z.string(), // evolve type
]);

const AIAnnotationsToolSchema = z
  .object({
    answerConfidence: AnswerConfidence,
  })
  .passthrough();

export const ProvideAIAnnotationsToolSchema = z.object({
  aiAnnotations: AIAnnotationsToolSchema,
});
*/