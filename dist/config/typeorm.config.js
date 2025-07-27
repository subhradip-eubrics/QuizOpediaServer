"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmAsyncConfig = void 0;
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../entities/user.entity");
const quiz_entity_1 = require("../entities/quiz.entity");
const question_entity_1 = require("../entities/question.entity");
const attempt_entity_1 = require("../entities/attempt.entity");
exports.typeOrmAsyncConfig = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async (config) => ({
        type: 'postgres',
        url: config.get('DB_URL'),
        entities: [user_entity_1.User, quiz_entity_1.Quiz, question_entity_1.Question, attempt_entity_1.Attempt],
        synchronize: false,
        ssl: { rejectUnauthorized: false },
    }),
};
//# sourceMappingURL=typeorm.config.js.map