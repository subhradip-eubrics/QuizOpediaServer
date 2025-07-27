"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quiz_entity_1 = require("../entities/quiz.entity");
const question_entity_1 = require("../entities/question.entity");
const attempt_entity_1 = require("../entities/attempt.entity");
const nanoid_1 = require("nanoid");
const ai_helper_1 = require("../ai/ai.helper");
let QuizService = class QuizService {
    constructor(quizRepo, questionRepo, attemptRepo) {
        this.quizRepo = quizRepo;
        this.questionRepo = questionRepo;
        this.attemptRepo = attemptRepo;
    }
    async createQuiz(data) {
        const { title, topic, tags, questions, timePerQuestion } = data;
        const quiz = this.quizRepo.create({
            id: `qz-${(0, nanoid_1.nanoid)()}`,
            title,
            topic,
            tags,
            timeLimit: timePerQuestion,
            questions: questions.map((q) => this.questionRepo.create({
                id: `qn-${(0, nanoid_1.nanoid)()}`,
                text: q.text,
                options: q.options,
                answer: q.answer,
            })),
        });
        console.log(quiz);
        console.log("Saved Quiz");
        const result = await this.quizRepo.save(quiz);
        console.log(result);
        return result;
    }
    async getAllQuizzes() {
        return this.quizRepo.find({ relations: ['questions'] });
    }
    async getQuizById(id) {
        const quiz = await this.quizRepo.findOne({
            where: { id },
            relations: ['questions'],
        });
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found');
        return quiz;
    }
    async deleteQuiz(id) {
        await this.questionRepo.delete({ quiz: { id } });
        await this.attemptRepo.delete({ quiz: { id } });
        return await this.quizRepo.delete(id);
    }
    async updateQuiz(id, data) {
        const { title, topic, tags, questions } = data;
        await this.questionRepo.delete({ quiz: { id } });
        const quiz = await this.quizRepo.findOneBy({ id });
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found');
        quiz.title = title;
        quiz.topic = topic;
        quiz.tags = tags;
        quiz.questions = questions.map((q) => this.questionRepo.create({
            id: `qn-${(0, nanoid_1.nanoid)()}`,
            text: q.text,
            options: q.options,
            answer: q.answer,
        }));
        return await this.quizRepo.save(quiz);
    }
    async aiGenerateQuiz(dto) {
        const result = await (0, ai_helper_1.generateQuizFromAI)(dto.topic, dto.numOfQn);
        console.log("Ai: ");
        console.log(result);
        return result;
    }
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_entity_1.Quiz)),
    __param(1, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(2, (0, typeorm_1.InjectRepository)(attempt_entity_1.Attempt)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QuizService);
//# sourceMappingURL=quiz.service.js.map