"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttemptModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const attempt_controller_1 = require("../controllers/attempt.controller");
const attempt_service_1 = require("../services/attempt.service");
const attempt_entity_1 = require("../entities/attempt.entity");
const quiz_entity_1 = require("../entities/quiz.entity");
const question_entity_1 = require("../entities/question.entity");
let AttemptModule = class AttemptModule {
};
exports.AttemptModule = AttemptModule;
exports.AttemptModule = AttemptModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([attempt_entity_1.Attempt, quiz_entity_1.Quiz, question_entity_1.Question])],
        controllers: [attempt_controller_1.AttemptController],
        providers: [attempt_service_1.AttemptService],
        exports: [attempt_service_1.AttemptService],
    })
], AttemptModule);
//# sourceMappingURL=attempt.module.js.map