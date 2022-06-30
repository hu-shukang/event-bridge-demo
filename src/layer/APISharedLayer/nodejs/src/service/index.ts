import { ChatService } from './src/chat.service';
import { UserService } from './src/user.service';
import { FileService } from './src/file.service';
import { ScheduleService } from './src/schedule.service';

export const chatService = new ChatService();
export const userService = new UserService();
export const fileService = new FileService();
export const scheduleService = new ScheduleService();
