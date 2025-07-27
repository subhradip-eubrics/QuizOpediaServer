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
exports.AttemptController = void 0;
const common_1 = require("@nestjs/common");
const attempt_service_1 = require("../services/attempt.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const attempt_dto_1 = require("../dtos/attempt.dto");
let AttemptController = class AttemptController {
    constructor(attemptService) {
        this.attemptService = attemptService;
    }
    async create(req, dto) {
        return this.attemptService.createAttempt(req.user.id, dto);
    }
    async getMy(req) {
        return this.attemptService.getMyAttempts(req.user.id);
    }
    async getOne(req, quizId) {
        return this.attemptService.getAttemptByQuiz(req.user.id, quizId);
    }
};
exports.AttemptController = AttemptController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, attempt_dto_1.CreateAttemptDto]),
    __metadata("design:returntype", Promise)
], AttemptController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttemptController.prototype, "getMy", null);
__decorate([
    (0, common_1.Get)('my/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AttemptController.prototype, "getOne", null);
exports.AttemptController = AttemptController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('attempt'),
    __metadata("design:paramtypes", [attempt_service_1.AttemptService])
], AttemptController);
//# sourceMappingURL=attempt.controller.js.map