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
exports.AttemptService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attempt_entity_1 = require("../entities/attempt.entity");
const quiz_entity_1 = require("../entities/quiz.entity");
const question_entity_1 = require("../entities/question.entity");
const nanoid_1 = require("nanoid");
let AttemptService = class AttemptService {
    constructor(attemptRepo, quizRepo, questionRepo) {
        this.attemptRepo = attemptRepo;
        this.quizRepo = quizRepo;
        this.questionRepo = questionRepo;
    }
    async createAttempt(userId, dto) {
        const { quizId, answers } = dto;
        const existing = await this.attemptRepo.findOne({ where: { quiz: { id: quizId }, user: { id: userId } } });
        if (existing) {
            throw new common_1.ForbiddenException('Quiz already attempted');
        }
        const quiz = await this.quizRepo.findOne({ where: { id: quizId }, relations: ['questions'] });
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found');
        let score = 0;
        quiz.questions.forEach((q) => {
            if (answers[q.id] && answers[q.id] === q.answer) {
                score++;
            }
        });
        const attempt = this.attemptRepo.create({
            id: `atp-${(0, nanoid_1.nanoid)()}`,
            quiz,
            user: { id: userId },
            answers,
            score,
        });
        return await this.attemptRepo.save(attempt);
    }
    async getMyAttempts(userId) {
        const attempts = await this.attemptRepo.find({
            where: { user: { id: userId } },
            relations: ['quiz'],
        });
        console.log(attempts);
        return attempts;
    }
    async getAttemptByQuiz(userId, quizId) {
        const attempt = await this.attemptRepo.findOne({
            where: { quiz: { id: quizId }, user: { id: userId } },
            relations: ['quiz'],
        });
        if (!attempt)
            throw new common_1.NotFoundException('Attempt not found');
        const questions = await this.questionRepo.find({ where: { quiz: { id: quizId } } });
        return Object.assign(Object.assign({}, attempt), { questions });
    }
};
exports.AttemptService = AttemptService;
exports.AttemptService = AttemptService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attempt_entity_1.Attempt)),
    __param(1, (0, typeorm_1.InjectRepository)(quiz_entity_1.Quiz)),
    __param(2, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AttemptService);
//# sourceMappingURL=attempt.service.js.map